//表格数据另存
define(function (require, exports, module){
	var _sqlsearchmod = require('sqlsearchmod/sqlsearchmod');

	var _opentablemod = require('tableview/opentable');

	var _upnewfilemod = require('tableview/upNewFileAstb');

	var saveasmod = {
		init: function (username,dbid,curtbtype,tbreal){
			var showflag = this._ifHasShow();
			if(showflag){
				this.hide();
				return;
			}
			this.show();
			this.username = username;
			this.dbid = dbid;
			this.tabtype = curtbtype;
			this.tbreal = tbreal;

			this.fields = _sqlsearchmod.fieldSearch;
			this.fldalias = _sqlsearchmod.queryfields;
			this.typefields = _sqlsearchmod.fldTypeSearch;
			this.unitfields = _sqlsearchmod.fldUnitSearch;
			this.alldata = _sqlsearchmod.tballdatas;
			this.allsqlresfids = _sqlsearchmod.allfids;
			this.allfidstr = this._getFidstr(this.allsqlresfids);

			if(!this.fields || this.fields.length < 1){
				this.fields = _opentablemod.fields_tmp;
				this.fldalias = _opentablemod.fields_alias;
				this.typefields = _opentablemod.fields_type;
				this.unitfields = _opentablemod.fields_unit;
				this.alldata = _opentablemod.currentpagedata;

				this.allfidstr = this._getFidstr(this.alldata);
			}

			// console.log(this.fields)
			// console.log(this.alldata)
			// console.log(this.allfidstr)
		},

		_getFidstr: function (arrfids){
			var outputfids = [];
			for(var i = 0, l = arrfids.length; i < l; i++){
				outputfids.push(arrfids[i][0]);
			}

			return '('+outputfids.join(',')+')';
		},

		_ifHasShow: function (){
			if($('.rtv-saveas').css('display') == 'block'){
				return true;
			}
			return false;
		},

		saveasConfirm: function (){
			var self = this;
			if(this.fields.length == 0){
				alert('无数据！');
				return;
			}
			var curtabtype= this.tabtype;
			var tmpalldata = this.alldata;
			var tmpfields = this.fields;
			var tmpfieldunit = this.unitfields;
			var tmpfieldsalias = this.fldalias;

			if(tmpfields && tmpfields.length > 0){
				if(tmpfields[0] == 'fid'){
					tmpfields.splice(0,1);
					tmpfieldunit.splice(0,1);

					for(var i = 0, len = tmpalldata.length; i < len; i++){
						tmpalldata[i].splice(0,1);
					}
				}
			}

			var oTmp = {'datas':this.alldata,"fields":this.fields,"fieldsunit":this.unitfields};

			var tablename = $('#rtvsave-tbnamept').val();
			this.hide();
			var usrname = this.username;
			var dbid = this.dbid;
			
			if(curtabtype == 'tb'){
				_upnewfilemod.insertTb2Db(dbid, tablename, usrname, function (tbrealname){
					_upnewfilemod.createcolIndefs(tbrealname,oTmp);
				});
			}else{
				var oFldinfo = {"fields":tmpfields,"fieldsunit":tmpfieldunit,"fieldsalias":tmpfieldsalias};
				this.createFtsetTb(dbid,tablename,usrname,function (tbrealname){

					self.createcolIndefs(tbrealname,oFldinfo);
				});
			}	
		},

		createcolIndefs: function (tbrealname,oFldinfo){
			var self = this;
			var tbrealname = 'f_'+tbrealname
			var afields = oFldinfo['fields'];
			var unitarr = oFldinfo['fieldsunit'];
			var realzdarr = oFldinfo['fieldsalias'];
			var params = {'Fields':[],'Data':[]};
				params.Fields = ['field','tabname','fieldRealname','fieldtype','unit'];
			var fieldsV = [];
			for(var i = 0, l = afields.length;i < l; i++){
				var tmparr = [];
				//var fld = "V" + (i + 1);
				tmparr.push(realzdarr[i],tbrealname,afields[i],'string',unitarr[i]);
				//tmparr.push(fld);
				fieldsV.push(realzdarr[i]);
				//tmparr.push(tbrealname);
				//tmparr.push(afields[i]);
				//tmparr.push('string','');
				params.Data.push(tmparr);
			}
			var sqlservice =new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp){
				console.log(tmp)
				alert('新建表成功');
				/*if(oTmp['datas'].length == 0){
					alert('新建表成功');
					return;
				}*/
		    	/*_importdata.lastsubmit(fieldsV,oTmp['datas'],'mapb',tbrealname,function (tmp){
		    		if(parseInt(tmp.Msg) > 0){
		    			self.hide();
				     	$('#rtvnew-tbnamept').val('');
				     	$('#rtv-filebtn').val('');
				     	$('#rtv-filepath').val('');
						alert('新建表成功');//这个应该不用alert,
				     	
				    }else{
				     	alert('新建表失败');
				    }
		    	});*/
		    	
		    },'processFailed':function (){alert('添加失败！');return false;}});
		    
		    sqlservice.processAscyn(gEcnu.ActType.ADD,'mapb','g_fieldsdef',params);
		},

		createFtsetTb: function (dbid,tablename,usrname,callback){
			console.log(this.fldalias);
			var allfids = this.allfidstr;
			var date = zhtoolUtil.getDateall();
			var copytbreal = this.tbreal.substring(2,this.tbreal.length);
			var searchalias = zhtoolUtil.cloneobj2(this.fldalias);
			var tmpflag = false;
			for(var i = 0, l = searchalias.length; i < l; i++){
				if(searchalias[i] == 'fid'){
					tmpflag = true;
				}
				searchalias[i] = '['+searchalias[i]+']';
			}
			if(!tmpflag){
				searchalias.unshift('[fid]');
			}
			searchalias.splice(1,0,'[shpType]','[xmin]','[ymin]','[xmax]','[ymax]','[shpLen]','[shpArea]','[shpData]');
			var searchaliastr = searchalias.join(',')
			//var data = new Date().getTime();//这部分是生成随机的表格，以后可能会变
			var tbrealname = usrname + date;
			var tmpdate = new Date();
			var formatetime = '' + tmpdate.getFullYear() +'年'+ (tmpdate.getMonth() + 1) +'月'+ tmpdate.getDate()+'日';
			var option  = {
				'scriptname':'mapb.tablemgr.tbtool.copyqryresult',
				'userid': usrname,
				'dbid': parseInt(dbid),
				'copyFtset': copytbreal,//要复制的表,不带f_
				'ftsetname':tbrealname,//复制生成新表的名字，不带f_
				'description':'',
				'timer':formatetime,
				'fids':allfids,
				'tbalias':tablename,
				'flds':searchaliastr,
			};
			var sqlscript = new gEcnu.WebsqlScript({'processCompleted':function(tmp){
				console.log(tmp);
				var tbid = tmp.queryResult[2]['SQL_ADD_PARAM'].split('=')[1];

				_upnewfilemod.add2tablelist(dbid,tablename,tbid,tbrealname,'ftset');

				callback(tbrealname);

			},'processFailed':function (){alert('新建表格失败！');return false;}});
			sqlscript.processAscyn(option);
		},

		show: function (){
			$('.rtv-saveas').nextAll().css('display','none');
			$('.rtv-saveas').prevAll().css('display','none');
			$('.rtv-saveas').css('display','block');
		},

		hide: function (){
			$('.rtv-saveas').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		}
	}

	$('#rtv-oksaveas').click(function (){
		saveasmod.saveasConfirm();
	});

	$('#rtv-cancelsaveas').click(function (){
		saveasmod.hide();
	});

	module.exports = saveasmod;
});