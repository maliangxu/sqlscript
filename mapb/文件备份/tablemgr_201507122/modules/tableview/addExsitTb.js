//添加现有表格到当前表空间中
define(function (require, exports, module){

	var _tblistmod = require('tablelist/tablelist');

	var addexisttbmod = {

		addtbtype:'my',//两个值'my' || 'share'

		getAllres:[],

		init: function (username,dbid){
			var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}

			var self = this;

			this.show();

			this.mytbs=[];

			this.pubtbs=[];

			this.username = username;

			this.dbid = dbid;

			this.alltbsIndb = _tblistmod.allTbsid;

			this.getAllmytbs(username,function (msg){
				console.log(msg);
				var results = msg.queryResult;
				self.getAllres = results;
				for(var i = 0, len = results.length; i < len; i++){
					if(results[i]['SHARETYPE'] == '4'){
						self.mytbs.push(results[i]);
					}else{
						self.pubtbs.push(results[i]);
					}
				}
				self.initMySel();
			});
		},

		ifHasShow: function (){
			if($('.rtv-addexsittb').css('display') == 'block'){
				return true;
			}
			return false;
		},

		show: function (){
			$('.rtv-addexsittb').nextAll().css('display','none');
			$('.rtv-addexsittb').prevAll().css('display','none');
			$('.rtv-addexsittb').css('display','block');
		},

		hide:function (){
			$('.rtv-addexsittb').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		initMySel:function (){
			$('#rtvadd-mytbssel').empty();
			$('#rtvadd-myseledtb').empty();
			var myres = this.mytbs;
			var mytbssel = document.getElementById('rtvadd-mytbssel');
			for(var i = 0, len =myres.length; i < len; i++){
				var option = document.createElement('option');
				option.innerHTML = myres[i]['TB_ALIAS'];
				option.value = myres[i]['TB_ID'];
				option.setAttribute('data-qx',myres[i]['SHARETYPE']);
				option.setAttribute('data-tbreal',myres[i]['TB_NAME']);
				mytbssel.appendChild(option);
			}
		},

		initShareSel: function (){
			$('#rtvadd-mytbssel').empty();
			$('#rtvadd-myseledtb').empty();
			var othertbs = this.pubtbs;
			var mytbssel = document.getElementById('rtvadd-mytbssel');
			for(var i = 0, len =othertbs.length; i < len; i++){
				var option = document.createElement('option');
				option.innerHTML = othertbs[i]['TB_ALIAS'];
				option.value = othertbs[i]['TB_ID'];
				option.setAttribute('data-qx',othertbs[i]['SHARETYPE']);
				option.setAttribute('data-tbreal',myres[i]['TB_NAME']);
				mytbssel.appendChild(option);
			}
		},
		addItems:function (){
			var nodes=$('#rtvadd-mytbssel').find('option:selected');
  			nodes.prop('selected',false);
  			$('#rtvadd-myseledtb').append(nodes);
		},

		delItems: function (){
			var nodes=$('#rtvadd-myseledtb').find('option:selected');
  			nodes.prop('selected',false);
  			$('#rtvadd-mytbssel').append(nodes);
		},

		save: function (){
			var flag = this.validate();
			if(!flag){return;}
			if(this.addtbtype == 'my'){
				this.savemydata();
			}else{
				//this.savepubdata();
				this.savemydata();
			}
		},

		validate:function (){
			if(this.dbid == ''){
				alert('请打开地图空间！');
				return false;
			}
			return true;
		},

		savemydata: function (){
			var allexisttbsid = this.alltbsIndb;

			var tbidarr = [];
			var tbsharearr = [];
			var tbrealarr = [];
			var tbaliasarr = [];

			var exitstbid = [];
			//var elearr = [];
			$('#rtvadd-myseledtb').find('option').each(function (){
				var tmptbid = $(this).val();
				var tmptbshare = $(this).attr('data-qx');
				var tmptbreal = $(this).attr('data-tbreal');
				var tmpalias = $(this).text();

				var ifexist = false;
				for(var i = 0, len = allexisttbsid.length; i < len; i++){
					if(tmptbid == allexisttbsid[i]){
						exitstbid.push(tmpalias);
						$(this).prop('selected',true);
						ifexist = true;
					}
				}
				if(!ifexist){
					tbidarr.push(tmptbid);
					tbsharearr.push(tmptbshare);
					tbrealarr.push(tmptbreal);
					tbaliasarr.push(tmpalias);
				}
			});

			if(exitstbid.length > 0){
				var str = exitstbid.join(',');
				alert("以下表格已在工作空间中："+str+"。不能重复加入！");
				return;
			}else{
				if(tbidarr.length == 0){
					alert('请选择要添加的表格！');
					return;
				}
				this.importInrel(tbidarr,tbrealarr,tbaliasarr,tbsharearr);
			}				
		},

		importInrel: function (tbidarr,tbrealarr,tbaliasarr,tbsharearr){
			var self = this;
			var dbid = parseInt(this.dbid);
			var fields = ['map_id','tb_id'];
			var datas = [];
			for(var i = 0, len = tbidarr.length; i < len; i++){
				var tmp = [dbid,parseInt(tbidarr[i])];
				datas.push(tmp);
			}

			 var sqlservice = new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp,fields){
			 		if(parseInt(tmp.Msg) > 0){
				     	_tblistmod.addtbs(dbid,tbidarr,tbrealarr,tbaliasarr,tbsharearr)
				     	alert('添加成功！');
				     	self.hide();
				    }else{
				     	alert('添加失败！');
				    }

			 	},'processFailed':function (){alert('保存失败');return false;}});
		    var params = {'Fields':fields,'Data':datas};
		    sqlservice.processAscyn(gEcnu.ActType.ADD,'mapb','g_tab_rel',params);
		},

		savepubdata:function (){

		},

		getAllmytbs: function (usrname,_callback){
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
		}

	}

	$('#rtv-canceladdmy').click(function (){
		addexisttbmod.hide();
	});

	$('#rtv-okaddmy').click(function (){
		addexisttbmod.save();
	});

	$('#rtvadd-mytb').click(function (){
		$(this).css('border-bottom','5px solid #F09932');
		$(this).next().css('border-bottom','5px solid #FFF');

		addexisttbmod.addtbtype = 'my';

		addexisttbmod.initMySel();
	});

	$('#rtvadd-sharetb').click(function (){
		$(this).css('border-bottom','5px solid #F09932');
		$(this).prev().css('border-bottom','5px solid #FFF');

		addexisttbmod.addtbtype = 'share';

		addexisttbmod.initShareSel();
	});

	$('#rtvadd-right').click(function (){
		addexisttbmod.addItems();
	});

	$('#rtvadd-left').click(function (){
		addexisttbmod.delItems();
	});

	module.exports = addexisttbmod;
})