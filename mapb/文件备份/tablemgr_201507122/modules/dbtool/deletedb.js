define(function (require, exports, module){

	var _tablelist = require('tablelist/tablelist');

	var delDbMod = {

		path: "mapb.tablemgr.deldb",

		init: function (username,dbid,dbname){
			this.username = username;
			this.restype = restype;
			this.dbid = dbid;
			this.dbname = dbname;
			alert('暂时不允许删除！');
			return;
			this.delDb(username);
		},
		delDb: function (username){
			var dbid = this.dbid;
			var dbname = this.dbname;
			var option = {
				'scriptname':this.path + ".deldb",
				'db_id': dbid,
				'username':this.username
			}
			console.log(dbid)
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					//console.log(msg);
					//这里应该有判断是否删除成功的信息，类库中现在还没有所以要添加
					_tablelist.removeDb(dbid,dbname)
					alert('删除成功！');	
			},	
			"processFailed":function (){alert("删除表空间失败！")}});
			sqlscript.processAscyn(option);
		}
	}

	module.exports = delDbMod;
});