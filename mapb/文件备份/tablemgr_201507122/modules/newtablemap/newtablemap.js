define(function (require, exports, module){
	var _tablelistmod = require('tablelist/tablelist');
	var newtableMod = {

		path: "mapb.tablemgr.insertnewdb",

		username: '', 

		init: function (username){
			this.username = username;
			this.show();
		},
		show: function (){
			$('#right-opendbmap').css('display','block');
			$('.rnm-new').nextAll().css('display','none');
			$('.rnm-new').css('display','block').prevAll().css('display','none');
		},
		hide: function (){
			$('#right-opendbmap').css('display','none');
		},
		getDbname: function (){
			return $('#rnm_name').val();
		},
		addName2db: function (dbname){
			var self = this;
			var option = {
				'scriptname':this.path + ".insertdb",
				'db_name': dbname,
				'db_desc': "",
				'username':this.username,
				'respath':'',
				'imgurl':'',
				'keywords':'',
			}
			console.log(option)
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					console.log(msg);
					var dbid = msg.queryResult[0]['SQL_ADD_PARAM'].split('=')[1];
					_tablelistmod.createTbList(dbname,dbid);
			},	
			"processFailed":function (){alert("新建表空间失败！")}});
			sqlscript.processAscyn(option);
		}

	}

	$('#rnm-cancel').click(function (){
		newtableMod.hide();
	});

	$('#rnm-ok').click(function (){
		var dbname = newtableMod.getDbname();
		newtableMod.addName2db(dbname);
		newtableMod.hide();
	});
	module.exports = newtableMod;
});