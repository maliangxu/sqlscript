define(function (require, exports, module){
	var delTableMod = {
		init: function (username, currentDbId, currentTbId, tbaliasname){
			if(confirm("确定将表格（"+tbaliasname+"）从地图空间中移除？")){
				this.delTbFromDb(username, currentDbId, currentTbId);
			}
			//confirmDiv("确定将改表格从地图空间中移除？",'名字','确定','取消',this.delTbFromDb,function(){});
		},
		//从数据库中删除表格，仅删除tb_relation的那条记录
		delTbFromDb: function (username, dbid, tbid){
			var self = this;
			var option = {
				'scriptname': 'mapb.tablemgr.tbtool.deletetb',
				'username': username,
				'dbid': dbid,
				'tbid': tbid
			}
			var sqlscript = new gEcnu.WebsqlScript({'processCompleted':function(tmp){
				self.addCustomEvt._events.tbdelete(dbid, tbid);
			},'processFailed':function (){alert('新建表格失败！');return false;}});
			sqlscript.processAscyn(option);
		},
		addCustomEvt: {
			_events:{},
			on: function (evtname,callback){
				switch (evtname){
					case 'tbDelSucc':
					this._events.tbdelete = callback;
					break;
				}

			}
		}

	}

	module.exports = delTableMod;
});