//追加表
define(function (require, exports, module){

	//var _tablelist = require('tablelist/tablelist');
	//var _newtablemod = require('tableview/newtable');

	var importDataMod = {

		ifinit:false,

		allTbres:{},

		init: function (username,dbname,dbid,tbid){
			var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}
			
			var self=this;
			this.username = username;
			this.dbname = dbname;
			this.dbid=dbid;
			//var allOpenDbs = _tablelist.allOpenDb;
			//var allOpenDbids = _tablelist.allOpenDbid;
			this.show();
			//var dblistid = 'rtvi_dblist';
			var tblistid = 'rtvi_name';

			//this.createdblist(dblistid,dbname,dbid);
			//var dbidsel = $('#rtvi_dblist').attr('data-dbid');
			this.createtblist(tblistid,dbid);
//添加现有表格
			//this.createdblist('rtvm_dblist', dbname ,dbid);
//这里需要优化，所有的表格都被请求过来了，自己的，分享的，公众分享的
			/*this.getAllTbs(username, function (msg){
				if(self.ifinit){
					return;
				}
				console.log(msg);
				var oResall = self.excutedata(msg);
				self.allTbres = oResall;
				self.ifinit=true;
				self.createExTbList('rtvm_name',oResall['me']);
			});*/

		},

		ifHasShow: function (){
			if($('.rtv-importtable').css('display') == 'block'){
				return true;
			}
			return false;
		},

		createtblist: function (tbselid,dbid){
			$('#'+tbselid).empty();
			var alltbinfo = this.getTbsArrByDbid(dbid);
			console.log(alltbinfo)
			var tbvals = alltbinfo.aTbrealname;
			var tbtexts = alltbinfo.aTbname;
			var sel = document.getElementById(tbselid);
			if(tbvals.length == 0){
				var option = document.createElement('option');
				option.value = '';
				option.innerHTML = '统计数据中无表格';
				sel.appendChild(option)
			}
			for(var i = 0, l = tbvals.length; i < l; i++){
				var option = document.createElement('option');
				option.value = tbvals[i];
				option.innerHTML = tbtexts[i];
				sel.appendChild(option);
			}
		},

		/*createdblist: function(selid,dbname,dbid){
			//$('#'+selid).empty();
			var input = document.getElementById(selid);
			input.value = dbname;
			input.setAttribute('data-dbid',dbid);
			input.setAttribute('disabled',true);
			// for(var i = 0, l = allOpenDbs.length; i < l; i++){
			// 	var option = document.createElement('option');
			// 	option.value = allOpenDbids[i];
			// 	option.innerHTML = allOpenDbs[i];
			// 	if(allOpenDbids[i] === dbid){
			// 		option.selected = true;
			// 	}
			// 	select.appendChild(option);
			// }

		},*/
		getTbsArrByDbid: function (dbid){
			var tbsnamearr = [];
			var tbsrealnamearr = [];
			var tbsidarr = [];
			/*$('.lft-dbdiv').first().filter(function (){
				if($(this).attr('data-ltid') === dbid){
					$(this).next().children('.lft-tbli').filter(function (){
						tbsidarr.push($(this).attr('data-ltid'));
						tbsnamearr.push($(this).find('.lft-tbnamediv').text());
						tbsrealnamearr.push($(this).attr('data-tbreal'));
					})
				}
			});*/
			$('.lft-dbul').children('.lft-tbli').filter(function (){
				tbsidarr.push($(this).attr('data-ltid'));
				tbsnamearr.push($(this).find('.lft-tbnamediv').text());
				tbsrealnamearr.push($(this).attr('data-tbreal'));
			})
			return {'aTbname':tbsnamearr, 'aTbrealname': tbsrealnamearr, 'tbsidarr':tbsidarr};
		},
		//追加数据提交
		submitData: function (fileid, tbreal){
			var self = this;
			var dbname = 'mapb';
			var file = document.getElementById(fileid).files[0];
			if(file){
				var reader = new FileReader();
				reader.readAsText(file,'GB2312');
				reader.onload = function(f){
					//console.log(f);
					var datatmp = this.result;
					var tmparr = datatmp.split(/\r\n/g);
					//console.log(tmparr);

					tmparr.pop();//提出最后一个空格
					if(tmparr.length < 2){
						alert('表中无数据！');
						return;
					}
					var datas=[],fields=[];

					fields = tmparr[0].split(',');
			        //console.log(fields);
					var len = tmparr.length;
			        for(var i = 1; i < len; i++){
			        	var dtatmp = tmparr[i].split(',');
			        	datas.push(dtatmp);
			        }
			        console.log(datas,fields);
			        //检查字段是否统一
			        var flag = zhtoolUtil.operateArray.isElementInarr('fid',fields);
			        if(flag){
			        	alert('上传的表格列不能为fid');
			        	return;
			        }
			   	 	self.addDataTodb(datas,fields,dbname,tbreal);
				}
			}else{
				alert('请选择你要导入的文件！');
				return;
			}
		},
		//获取要导入表的所有字段信息
		addDataTodb: function (datas,fields_tab,dbname,tbname){
			var self = this;
			var sqlservice = new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp,fields){

			//console.log(tmp,fields);
		    var fields_tmp   = [];
		    var fields_unit  = [];
		    var fields_alias = [];
		    var fields_type  = [];
			for(var i = 0, len = tmp.length; i < len; i++){
		        if(tmp[i]['FIELDREALNAME'] == 'null'){
		          tmp[i]['FIELDREALNAME'] = '';
		        }
		        if(tmp[i]['UNIT'] == 'null'){
		          tmp[i]['UNIT'] = '';
		        }
		        if(tmp[i]['FIELDTYPE'] == 'null'){
		          tmp[i]['FIELDTYPE'] = '';
		        }
		        if(tmp[i]['FIELD'] == 'null'){
		          tmp[i]['FIELD'] = '';
		        }
				fields_tmp.push(tmp[i]['FIELDREALNAME']);
				fields_unit.push(tmp[i]['UNIT']);
		        fields_type.push(tmp[i]['FIELDTYPE']);
				fields_alias.push(tmp[i]['FIELD']);
			}
		  	//console.log(fields_tmp,fields_unit,fields_alias,fields_tab);
		  	var flag = zhtoolUtil.isAbosoluteSame(fields_tmp,fields_tab);
		  	if(flag){
		  		self.lastsubmit(fields_alias,datas,dbname,tbname,function (tmp){
		  			if(parseInt(tmp.Msg) > 0){
		  				self.addCustomEvt._events.refresh();
				     	alert('导入成功！');
				     	self.hide();
				    }else{
				     	alert('导入失败，请重新导入！');
				    }
		  		});
		  	}else{
		  		alert('表格字段不匹配，请检查上传表格和系统表格中的字段是否一致！');
		  		return;
		  	}
			

		    },'processFailed':function (){alert('请求数据失败！');return false;}});
		  	
		    var qrysql = {'fields':"*","lyr":'g_fieldsdef','filter':"tabname ="+"'"+tbname+"'"};
		    sqlservice.processAscyn(gEcnu.ActType.SQLQUERY,dbname,qrysql);
		},
		//保存提交的数据
		lastsubmit: function (fields_alias,datas,dbname,tbname,callback){
			var self = this;
			//console.log(datas);
			if(datas.length > 100000){
				alert('数据量太大，请分批导入！')
				return;
			}
			var sqlservice =new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp){
		      //deleteSelectRecordsOrFields(tmp,dBaseName,tableName,delIds);
		      
		     //console.log(tmp);
		     callback(tmp);
		    /* if(parseInt(tmp.Msg) > 0){
		     	alert('导入成功！');
		     	self.hide();
		     }else{
		     	alert('导入失败，请重新导入！');
		     }*/
		     
		    },'processFailed':function (){alert('保存失败');return false;}});
		    var params = {'Fields':fields_alias,'Data':datas};
		   
		    sqlservice.processAscyn(gEcnu.ActType.ADD,dbname,tbname,params);
		},
		show: function (){
			$('.rtv-importtable').nextAll().css('display','none');
			$('.rtv-importtable').prevAll().css('display','none');
			$('.rtv-importtable').css('display','block');
		},
		hide: function (){
			$('.rtv-importtable').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		//导入现有表格
		/*getAllTbs: function (usrname,_callback){
			var path ="mapb.tablemgr.tbtool.getalltbs"
			var option = {
				"scriptname": path,
				"username": usrname,
				"restype": 'tb'
			}
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					_callback(msg);
				},	
				"processFailed":function (){alert("获取表信息失败！")}});
			sqlscript.processAscyn(option);
		},*/
		getAllMyTbs: function (usrname){

		},
		getMyGroupTbs: function (){

		},
		getAllpublicTbs: function (){

		},
		/*excutedata: function (msg){
			var tmp = {'me': [], 'group': [], 'public': []};
			var res = msg.queryResult;
			for(var i = 0, l = res.length; i < l; i++){
				if(res[i]['OWNER'] == '1'){
					tmp['me'].push(res[i]);
				}else if(res[i]['OWNER'] == '2'){
					tmp['group'].push(res[i]);
				}else if(res[i]['OWNER'] == '3'){
					tmp['public'].push(res[i]);
				}
			}
			console.log(tmp)
			return tmp;
		},*/
		/*createExTbList: function (selid,arr){
			console.log(arr)
			$('#'+selid).empty();
			var select = document.getElementById(selid);
			for(var i = 0, l = arr.length; i < l; i++){
				var option = document.createElement('option');
				option.value = arr[i]['TB_ID'];
				option.innerHTML = arr[i]['TB_ALIAS'];
				option.setAttribute('data-qx',arr[i]['SHARETYPE']);
				option.setAttribute('data-rname',arr[i]['TB_NAME']);
				select.appendChild(option);
			}
		},*/

		addtbToDb: function (tbid,dbid,_callback){
			var path ="mapb.tablemgr.tbtool.inserttb2db"
			var option = {
				"scriptname": path,
				"tbid": tbid,
				"dbid": dbid
			}
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					_callback(msg);
				},	
				"processFailed":function (){alert("插入表格失败！")}});
			sqlscript.processAscyn(option);
		},

		addCustomEvt:{
			_events:{},
			on: function (evttype,callback){
				switch(evttype){
					case 'addexisttb':
					//this._events.addexisttb = callback;
					break;

					case 'refresh':
					this._events.refresh = callback;
				}
			}
		}
	}
//导入excel表格
	/*$('#rtvi_dblist').change(function (){
		var dbid = $(this).val();
		importDataMod.createtblist('rtvi_name',dbid)
	});*/
//在已有表格中追加数据点击确定
	$('#rtv-ok1').click(function (){
		var fileid = 'rtvi-filebtn';
		var tbreal = $('#rtvi_name').val();
		importDataMod.submitData(fileid, tbreal);
	});

	$('#rtv-cancel1').click(function (){
		importDataMod.hide();
	});
//切换导入表格的标头
	$('.rtv-titlebtn').click(function (){
		var btnid = $(this).attr('id');
		$(this).css('border-bottom','5px solid #F09932');
		switch (btnid){
			case 'rtv-improtdata':
			$(this).next().css('border-bottom','0px solid #F09932');
			$('#rtvimportmid').css('display','block');
			$('#rtv-addtbmid').css('display','none');
			break;

			case 'rtv-addtb2db':
			$(this).prev().css('border-bottom','0px solid #F09932');
			$('#rtvimportmid').css('display','none');
			$('#rtv-addtbmid').css('display','block');

			importDataMod
			break;
		}
	});

//添加现有表格
	$('#rtvm-tbfrom').change(function (){
		var tclass = $(this).val();
		var selid = 'rtvm_name';
		var tmparr = [];
		switch (tclass){
			case 'me':
			tmparr = importDataMod.allTbres['me'];
			break;

			case 'group':
			tmparr = importDataMod.allTbres['group'];
			break;

			case 'public':
			tmparr = importDataMod.allTbres['public'];
			break;
		}
		importDataMod.createExTbList(selid, tmparr);
	});
//取消导入现有表格
	$('#rtv-cancel2').click(function (){
		importDataMod.hide();
	});
//添加现有表格到表空间
	/*$('#rtv-ok2').click(function (){
		var dbid = $('#rtvm_dblist').val();
		if(dbid == ''){
			alert('请选择要插入的表空间！');
			return;
		}
		var tbname = $('#rtvm_name').children('option:selected').text();
		var tbid = $('#rtvm_name').children('option:selected').val();
		if(tbid == ''){
			alert('没有表格可以插入！');
			return;
		}
		var tbrealname = $('#rtvm_name').children('option:selected').attr('data-rname');
		var sharetype = $('#rtvm_name').children('option:selected').attr('data-qx');
		importDataMod.addtbToDb(tbid, dbid, function (msg){
			console.log(msg);
			var resultflag = msg.queryResult[0] ? msg.queryResult[0]['SQL_RESULT'] : 1;//判断该表空间是否已经有该表格，1为没有，-1为没有
			if(parseInt(resultflag) === -1){
				alert('该表已存在！');
				return;
			}else{
				importDataMod.addCustomEvt._events.addexisttb(dbid, tbname, tbid, tbrealname, sharetype);

				importDataMod.hide();

				alert('添加成功！');
			}
		})
	});*/

	module.exports = importDataMod;
});