//新建表
define(function (require, exports, module){
	//var _tablelist = require('tablelist/tablelist');
	var _importdata = require('tableview/importdata');

	var newtablemod = {
		init: function (username, dbid, dbname){
			var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}

			this.show();
			this.username = username;
			this.dbid = dbid;
			this.dbname = dbname;
			this.fieldArr = [];
			//var allOpenDbs = _tablelist.allOpenDb;
			//var allOpenDbids = _tablelist.allOpenDbid;
			//var dbinputTagId = 'rtv_dblist';
			//this.createdblist(dbinputTagId,dbname,dbid);
			$('#addfieldTbody').empty();
		},

		ifHasShow: function (){
			if($('.rtv-newtable').css('display') == 'block'){
				return true;
			}
			return false;
		},
		
		hide: function (){
			$('.rtv-newtable').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		show: function (){
			$('.rtv-newtable').nextAll().css('display','none');
			$('.rtv-newtable').prevAll().css('display','none');
			$('.rtv-newtable').css('display','block');
		},

		comfirmExec: function (dbid, tablename){
			var self = this;
			var flag = this.validate();
			if(!flag){
				return;
			}
			var fieldsarr = this.fieldArr;
			//var file = document.getElementById('rtv-filebtn').files[0];
			//if(file){
				this.insertTb2Db(dbid, tablename, function (tbrealname){
					//self.createcol(tbrealname,fieldsarr);
					self.createcols(tbrealname,fieldsarr);
				});
			//}else{
				//this.insertTb2Db(dbid, tablename);
			//}			
		},

		createcols:function (tbrealname,fieldsarr){
			var self =this;
			var params = {'Fields':[],'Data':[]};
				params.Fields = ['field','tabname','fieldRealname','fieldtype','unit'];
			//var fieldsV = [];
			for(var i = 0, l = fieldsarr.length;i < l; i++){
				var tmparr = [];
				var fld = "V" + (i + 1);
				var fldtype = fieldsarr[i]['fieldType'];
				var fldunit = fieldsarr[i]['fieldunit'];
				var fldreal = fieldsarr[i]['field'];
				tmparr.push(fld,tbrealname,fldreal,fldtype,fldunit);
				//tmparr.push(fld);
				//fieldsV.push(fld);
				//tmparr.push(tbrealname);
				//tmparr.push(afields[i]);
				//tmparr.push('string','');
				params.Data.push(tmparr);
			}

			var sqlservice =new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp){
		    	if(parseInt(tmp.Msg) > 0){
	    			self.hide();
			     	$('#rtv_name').val('我的表格');
					alert('新建表成功');//这个应该不用alert,
			     	
			    }else{
			     	alert('新建表失败，请检查导入的表格！');
			    }
		    	
		    },'processFailed':function (){alert('添加失败！');return false;}});
		    
		    sqlservice.processAscyn(gEcnu.ActType.ADD,'mapb','g_fieldsdef',params);

		},
//初始化数据库名
		createdblist: function(selid,dbname,dbid){
			var input = document.getElementById(selid);
			input.value = dbname;
			input.setAttribute('data-dbid',dbid);
			input.setAttribute('disabled',true);

		},
//把表插入数据库中
		insertTb2Db: function(dbid,tablename,callback){
			var self = this;
			var date = zhtoolUtil.getDateall();
			//var data = new Date().getTime();//这部分是生成随机的表格，以后可能会变
			var tbrealname = "t_" + this.username + date;
			var option  = {
				'scriptname':'mapb.tablemgr.tbtool.newtable',
				'username': this.username,
				'dbid': parseInt(dbid),
				'tablename': tablename,
				'tbrname': tbrealname
			};
			var sqlscript = new gEcnu.WebsqlScript({'processCompleted':function(tmp){
				console.log(tmp);
				var tbid = tmp.queryResult[0]['SQL_ADD_PARAM'].split('=')[1];
				self.add2tablelist(dbid,tablename,tbid,tbrealname);
				if(callback){
					callback(tbrealname);
				}else{
					self.hide();
					$('#rtv_name').val('');
					alert('新建表成功');//这个应该不用alert,应该是一个提示框1秒后消失的那种形式
				}
			},'processFailed':function (){alert('新建表格失败！');return false;}});
			sqlscript.processAscyn(option);
		},

//在左侧列表中加入新建白表
		add2tablelist: function(dbid,tablename,tbid,tbrealname){
			this.addCustomEvt._events.confirm(dbid,tablename,tbid,tbrealname);
		},

		createcol: function (tbrealname,fieldsarr){
			var self = this;
			var reader = new FileReader();
			reader.readAsText(file,'UTF-8');
			reader.onload = function(f){
				var datatmp = this.result;
				var tmparr = datatmp.split(/\r\n/g);

				tmparr.pop();//提出最后一个空格
				if(tmparr.length < 2){
					alert('表中无数据！');
					return;
				}
				var datas=[],fieldszd=[],fieldsunit=[];

				fields = tmparr[0].split(',');
				for(var i = 0, leng = fields.length; i < leng; i++){
					if(fields[i].indexOf('+') >= 0){
						var fandUnit = fields[i].split('+');
						if(fandUnit[0]){
							fieldszd.push(fandUnit[0])
						}else{
							fieldszd.push('');
						}
						if(fandUnit[1]){
							fieldsunit.push(fandUnit[1]);
						}else{
							fieldsunit.push('');
						}
					}else{
						fieldszd.push(fields[i]);
						fieldsunit.push('');
					}
				}
		        //console.log(fields);
				var len = tmparr.length;
		        for(var i = 1; i < len; i++){
		        	var dtatmp = tmparr[i].split(',');
		        	datas.push(dtatmp);
		        }
		        var oTmp = {'datas':datas,"fields":fieldszd,"fieldsunit":fieldsunit};
		        self.createcolIndefs(tbrealname,oTmp);
		    }
		},
		createcolIndefs: function (tbrealname,oTmp){
			var self = this;
			var afields =  oTmp['fields'];
			var unitarr = oTmp['fieldsunit'];
			var params = {'Fields':[],'Data':[]};
				params.Fields = ['field','tabname','fieldRealname','fieldtype','unit'];
			var fieldsV = [];
			for(var i = 0, l = afields.length;i < l; i++){
				var tmparr = [];
				var fld = "V" + (i + 1);
				tmparr.push(fld,tbrealname,afields[i],'string',unitarr[i]);
				//tmparr.push(fld);
				fieldsV.push(fld);
				//tmparr.push(tbrealname);
				//tmparr.push(afields[i]);
				//tmparr.push('string','');
				params.Data.push(tmparr);
			}
			var sqlservice =new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp){
		    	_importdata.lastsubmit(fieldsV,oTmp['datas'],'mapb',tbrealname,function (tmp){
		    		if(parseInt(tmp.Msg) > 0){
		    			self.hide();
				     	$('#rtv_name').val('');
						alert('新建表成功');//这个应该不用alert,
				     	
				    }else{
				     	alert('新建表失败，请检查导入的表格！');
				    }
		    	});
		    	
		    },'processFailed':function (){alert('添加失败！');return false;}});
		    
		    sqlservice.processAscyn(gEcnu.ActType.ADD,'mapb','g_fieldsdef',params);
		},

		//该操作前的验证
		validate: function (){
			if($('#rtv_name').val() == ''){
				alert('表格名不能为空！');
				return false;
			}
			if(this.fieldArr.length == 0){
				alert('表格字段为空！');
				return false;
			}
			return true;
		},

		addFld: function (){
			var tab=document.getElementById(this.getFldTabId());
  			var fieldObj=document.getElementById(this.getFldnameId());
  			var typeObj=document.getElementById(this.getFldTypeId());
  			var unitobj=document.getElementById('ftset_fldunit');
  			var fieldname=fieldObj.value;
  			var fieldtype=typeObj.value;
  			var fieldunit=unitobj.value;
  			/*var msgId = this.getFldMsgId();
  			document.getElementById(msgId).innerHTML ="";*/
  			if(fieldname!=''){
      		var tmpobj={'field':fieldname,"fieldType":fieldtype,"fieldunit":fieldunit};
      		this.fieldArr.push(tmpobj);
      		var otr=document.createElement("tr");
      		var otd1=document.createElement("td");
      		var ospan1=document.createElement("span");
      		var img3=document.createElement("img");
      		otd2=otd1.cloneNode();
      		otd3=otd1.cloneNode();
      		otd21=otd1.cloneNode();
      		ospan2=ospan1.cloneNode();
      		ospan21=ospan1.cloneNode();
      		ospan1.innerHTML=fieldname;
      		ospan2.innerHTML=fieldtype;
      		ospan21.innerHTML=fieldunit;
      		img3.src="modules/tableview/imgs/deletefld.png";
      		img3.id=fieldname;
      		img3.className="editFieldclass";
      		otd1.appendChild(ospan1);
      		otd2.appendChild(ospan2);
      		otd21.appendChild(ospan21);
      		otd3.appendChild(img3);
      		otr.appendChild(otd1);
      		otr.appendChild(otd2);
      		otr.appendChild(otd21);
      		otr.appendChild(otd3);
      		tab.appendChild(otr);
      		fieldObj.value="";
      		unitobj.value="";
  			}/*else{
  				document.getElementById(msgId).innerHTML ="字段名不能为空";
  			}*/
		},

		delField:function (clickobj){  
  			var tab=document.getElementById(this.getFldTabId());
  			var field_delete=clickobj.id;
  			var len=this.fieldArr.length;
  			for(var i=0;i<len;i++){ 
  				if(field_delete==this.fieldArr[i].field){ 
  				this.fieldArr.splice(i,1);  //删除一个元素
  				var tr = clickobj.parentNode.parentNode; 
  				tab.removeChild(tr);   //从表中删除该条记录
  				return;
  				}
  			}    
		},

		// getFldMsgId:function (){
		// 	return "addfld_msg";
		// },

		getFldTabId: function (){
			return "addfieldTbody";
		},

		getFldnameId: function (){
			return "ftset_fldname";
		},

		getFldTypeId: function (){
			return 'ftset_fldtype';
		},

		addCustomEvt: {
			_events: {},
			on: function (evttype,callback){
				switch (evttype){
					case 'confirm':
					this._events.confirm = callback;
					break;
				}
			}
		}
	}

	$('#rtv-cancel').click(function (){
		newtablemod.hide();
	});
//新建表确定按钮
	$('#rtv-ok').click(function (){
		/*var dbid = $('#rtv_dblist').attr('data-dbid');*/
		var dbid = newtablemod.dbid;
		var tablename = $('#rtv_name').val();
		newtablemod.comfirmExec(dbid,tablename);
	});

	$('#rtv-xjzid').click(function (){
		$('#addFlds_pop').animate({height:'toggle'},'fast');
	});
//添加字段确定
	$('#addFlds_confrm').click(function (){
		//newtablemod.confrmAddFld();
		$('#addFlds_pop').animate({height:'toggle'},'fast');
	});
//取消当前的字段
	$('#addfieldTbody').click(function (evt){
		var e=event || window.event;
  		var obj=e.target || e.srcElement;
		if(obj.className=='editFieldclass'){
			newtablemod.delField(obj);
		}
	});

	$('#addFlds_cancel').click(function (){
		$('#addFlds_pop').animate({height:'toggle'},'fast');
	});
//添加字段按钮
	$('#ftset_addFldBtn').click(function (){
		newtablemod.addFld();
	});

	//新建表格确定
	/*$('#createFtset_confrm').click(function(){
		ftsetMod.confrmExec();
		ftsetMod.hide();
	});*/

	module.exports = newtablemod;
});