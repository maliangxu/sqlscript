//上传excel作为新表格

define(function (require, exports, module){

	var _importdata = require('tableview/importdata');

	var upnewtbmod = {
		init: function (username,dbid){
			var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}

			this.show();
			this.dbid = dbid;
			this.username= username;
		},

		ifHasShow: function (){
			if($('.rtv-upnewtab').css('display') == 'block'){
				return true;
			}
			return false;
		},

		show: function (){
			$('.rtv-upnewtab').nextAll().css('display','none');
			$('.rtv-upnewtab').prevAll().css('display','none');
			$('.rtv-upnewtab').css('display','block');
		},

		hide: function (){
			$('.rtv-upnewtab').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		comfirmExec: function (dbid,tablename){
			var self = this;
			var usrname = this.username;
			var flag = this.validate();
			if(!flag){
				return;
			}
			var file = document.getElementById('rtv-filebtn').files[0];

			this.insertTb2Db(dbid, tablename, usrname, function (tbrealname){
				self.createcol(file,tbrealname);
			});
		},
		
		//把表插入数据库中
		insertTb2Db: function(dbid,tablename,usrname,callback){
			var self = this;
			var date = zhtoolUtil.getDateall();
			//var data = new Date().getTime();//这部分是生成随机的表格，以后可能会变
			var tbrealname = "t_" + usrname + date;
			var option  = {
				'scriptname':'mapb.tablemgr.tbtool.newtable',
				'username': usrname,
				'dbid': parseInt(dbid),
				'tablename': tablename,
				'tbrname': tbrealname
			};
			var sqlscript = new gEcnu.WebsqlScript({'processCompleted':function(tmp){
				console.log(tmp);
				var tbid = tmp.queryResult[0]['SQL_ADD_PARAM'].split('=')[1];

				self.add2tablelist(dbid,tablename,tbid,tbrealname,'tb');

				callback(tbrealname);

			},'processFailed':function (){alert('新建表格失败！');return false;}});
			sqlscript.processAscyn(option);
		},
		//在左侧列表中加入新建白表
		add2tablelist: function(dbid,tablename,tbid,tbrealname,tbtype){
			this.addCustomEvt._events.confirm(dbid,tablename,tbid,tbrealname,tbtype);
		},
		createcol: function (file,tbrealname){
			var self = this;
			var reader = new FileReader();
			reader.readAsText(file,'gb2312');
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
				for(var ii = 0, leng = fields.length; ii < leng; ii++){
					if(fields[ii].indexOf('+') >= 0){
						var fandUnit = fields[ii].split('+');
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
						fieldszd.push(fields[ii]);
						fieldsunit.push('');
					}
				}
		        
				var len = tmparr.length;
		        for(var i = 1; i < len; i++){
		        	var dtatmp = tmparr[i].split(',');
		        	datas.push(dtatmp);
		        }
		        console.log(fields,datas);
		        var oTmp = {'datas':datas,"fields":fieldszd,"fieldsunit":fieldsunit};
		        self.createcolIndefs(tbrealname,oTmp);
		    }
		},
		createcolIndefs: function (tbrealname,oTmp){
			var self = this;
			var afields = oTmp['fields'];
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
				if(oTmp['datas'].length == 0){
					alert('新建表成功');
					return;
				}
		    	_importdata.lastsubmit(fieldsV,oTmp['datas'],'mapb',tbrealname,function (tmp){
		    		if(parseInt(tmp.Msg) > 0){
		    			self.hide();
				     	$('#rtvnew-tbnamept').val('');
				     	$('#rtv-filebtn').val('');
				     	$('#rtv-filepath').val('');
						alert('新建表成功');//这个应该不用alert,
				     	
				    }else{
				     	alert('新建表失败');
				    }
		    	});
		    	
		    },'processFailed':function (){alert('添加失败！');return false;}});
		    
		    sqlservice.processAscyn(gEcnu.ActType.ADD,'mapb','g_fieldsdef',params);
		},
		//该操作前的验证
		validate: function (){
			if($('#rtvnew-tbnamept').val() == ''){
				alert('表格名不能为空！');
				return false;
			}
			var file = document.getElementById('rtv-filebtn').files[0];
			if(!file){
				alert('请选择要导入的csv文件！');
				return false;
			}
			return true;
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

	$('#rtv-cancelup').click(function (){
		upnewtbmod.hide();
	});

	$('#rtv-okup').click(function (){
		var dbid = upnewtbmod.dbid;
		var tablename = $('#rtvnew-tbnamept').val();
		upnewtbmod.comfirmExec(dbid,tablename);
	});

	$('#rtv-filebtn').change(function (){
		var filepath = $(this).val();
		$('#rtv-filepath').val(filepath);

		if(filepath !== '' && filepath.indexOf('\\') >= 0){
			var newarr = filepath.split('\\');
			var filenameall = newarr[newarr.length-1];
			var filename = filenameall.split('.')[0];
			$('#rtvnew-tbnamept').val(filename);
		}else{
			$('#rtvnew-tbnamept').val('我的表格');
		}
		
	});
	module.exports = upnewtbmod;
})