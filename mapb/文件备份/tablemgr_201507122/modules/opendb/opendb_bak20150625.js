define(function (require, exports, module){
	var opendbMod = {

		dbList:{},//{'me':[{},{}],'group':[{},{}],'public':[{},{}]}

		activeDbId: "",

		activeDbAlias: "",

		activeDbqx:'',

		activeDbown:'',

		init: function (username){
			this.opendiv();
			this._username = username;
			var restype = 'db';
			this.path = "mapb.tablemgr.opendb";
			var self = this;
			this.getDbNames(username, restype, function (msg){
				//console.log(msg);
				var olist = self._transform(msg.queryResult);
				self.dbList = olist;
				//console.log(olist);
				self.createDbList(olist['me']);
			});
		},

		getDbNames: function (username,restype,callback){
			var path = this.path + ".getAllDb";

			var _callback = arguments.length > 2? arguments[2] : function (){};
			var option = {
				"scriptname": path,
				"username": username,
				"restype": restype
			};
			console.log(username,restype)
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					console.log(msg)
					_callback(msg);
				},	
				"processFailed":function (){alert("获取表空间信息失败！")}});
			sqlscript.processAscyn(option);
		},
		//确定选择的表空间
		conformdb: function (){
			this.hidediv();
			var dbid = this.activeDbId;
			//var dbowner = this.activeDbown;
			var dbqx = this.activeDbqx;
			opendbMod.requestTbs(dbid, dbqx, this.succCallback);
		},

		hidediv: function (){
			$('#right-opendbmap').css('display','none');
		},

		opendiv: function (){
			$('#right-opendbmap').css('display','block');
			$('.rom-open').css('display','block').prevAll().css('display','none');
			$('.rom-open').nextAll().css('display','none');
		},

		_transform: function (tmp){
			var len = tmp.length;
			var mydbs = [];
			var groupdbs = [];
			var othersdbs = [];
			for(var i = 0; i < len; i++){
				if(tmp[i]['OWNER'] == 'me'){
					mydbs.push(tmp[i]);
				}else if(tmp[i]['OWNER'] == 'group'){
					groupdbs.push(tmp[i]);
				}else if(tmp[i]['OWNER'] == 'public'){
					othersdbs.push(tmp[i]);
				}
			}
			return {'me':mydbs, 'group':groupdbs, 'public':othersdbs};
		},
		//这里存在优化空间，当加载的数据库名太多时，可以使用延迟加载，滚动加载
		createDbList: function (arr){
			console.log(arr);
			$('#rom-dblist').empty();
			for(var i = 0, l = arr.length; i < l; i++){
				var dbname = arr[i]['DB_NAME'];
				var dbID = arr[i]['DB_ID'];
				var owner = arr[i]['OWNER'];
				var sharetype = arr[i]['SHARETYPE'];
				this.createTag(dbname, dbID, owner, sharetype);
			}
		},

		createTag: function (dbname, dbID, owner, sharetype){
			var ele = document.createElement('div');
			ele.className = "rom-dbtag";
			ele.innerHTML = dbname;
			$(ele).appendTo($('#rom-dblist'));
			var eleinfo = document.createElement('div');
			eleinfo.innerHTML = "详情";
			eleinfo.className = "rom-tbdetails";
			eleinfo.setAttribute('data-id',dbID);
			eleinfo.setAttribute('data-alias',dbname);
			eleinfo.setAttribute('data-own',owner);
			eleinfo.setAttribute('data-qx',sharetype);
			ele.appendChild(eleinfo)
		},

		requestTbs: function (dbid, dbqx, callback){
			var usrname = this._username;
			var path = this.path + ".requestTb";
			var option = {
				"scriptname": path,
				"dbid": dbid,
				"restype":'tb',
				'username':usrname
			};
			var self = this;
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					callback(msg);
				},	
				"processFailed":function (){alert("获取表空间信息失败！")}});
			sqlscript.processAscyn(option);
		},

		dbListDisplay: function (){
			$("#rom-dblist").css('display','block');
			$("#rom-tblist").css('display','none');
		},

		tbListDisplay: function (){
			$("#rom-dblist").css('display','none');
			$("#rom-tblist").css('display','block');
		},

		//改变按钮的样式，加底部橙色边框
		changeBtnStyle: function (eleid){
			$("#" + eleid).addClass('rom-clicked').siblings().removeClass('rom-clicked');
		},

		//在打开表空间里列出表空间所对应的表格
		listTbsInMap: function (aolist){
			console.log(aolist);
		},

		//列出表格在数据目录中
		// listTbsInleft: function (aolist){
		// 	console.log(aolist);
		// },

		addCustomEvt: function (evtname, succCallback){
			var self = this;
			switch (evtname){
				case 'confirm':
				this.succCallback = arguments.length > 1 ? arguments[1] : function (){};
			}
		}
	}

	$('#rom-ok').click(function (){
		opendbMod.conformdb();
	});

	$('#rom-cancel').click(function (){
		opendbMod.hidediv();
	});

	$('.rom-titlebtn').click(function (){
		var type = $(this).attr('id');
		var ot = opendbMod.dbList;
		//console.log(ot);
		switch (type){
			case "rom-mydb":
			opendbMod.changeBtnStyle('rom-mydb');
			opendbMod.createDbList(ot['me']);
			break;

			case "rom-mygroup":
			opendbMod.changeBtnStyle('rom-mygroup');
			opendbMod.createDbList(ot['group']);
			break;

			case "rom-others":
			opendbMod.changeBtnStyle("rom-others");
			opendbMod.createDbList(ot['public']);
			break;
		}
	});

	$('#rom-dblist').on('click','.rom-tbdetails',function (){
		var dbid = $(this).attr('data-id');
		var dbalias = $(this).attr('data-alias');
		console.log(dbid,dbalias);
		opendbMod.tbListDisplay();
		opendbMod.requestTbs(dbid, opendbMod.listTbsInMap);
	});

	$('#rom-dblist').on(
		{
			'dblclick':function() {
				var dbid = $(this).find('div').attr('data-id');
				var dbname = $(this).find('div').attr('data-alias');
				var dbowner = $(this).find('div').attr('data-own');
				var dbqx = $(this).find('div').attr('data-qx');
				opendbMod.activeDbId = dbid;
				opendbMod.activeDbAlias = dbname;
				opendbMod.activeDbqx = dbqx;
				opendbMod.activeDbown = dbowner;
				opendbMod.conformdb();
			},
			'click':function (){
				console.log($(this))
				$(this).addClass('rom-dbclick').siblings().removeClass('rom-dbclick');
				opendbMod.activeDbId = $(this).find('div').attr('data-id');
				opendbMod.activeDbAlias = $(this).find('div').attr('data-alias');
				opendbMod.activeDbqx = $(this).find('div').attr('data-qx');
				opendbMod.activeDbown = $(this).find('div').attr('data-own');
			}
		},'.rom-dbtag'
		
		//opendbMod.conformdb();
	);
/*
	$('#rom-dblist').delegate('.rom-dbtag','dbclick',function (){
		alert(11);
		opendbMod.conformdb();
	});*/
	

	module.exports = opendbMod;
});