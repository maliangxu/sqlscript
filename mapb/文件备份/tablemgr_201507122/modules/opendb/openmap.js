
//打开地图:
//传入参数：用户id
//输出参数：选中的地图的信息：mapinfo
define(function (require, exports, module){ 
	var openmapMod={
	//存储地图信息,形如 {map：{mapName:,viewExtent:,coord:}，lyrs:[{},{}], mapSource:{sharetype:,owner:}}
	mapinfo:{},  
	//初始化打开地图上的下拉框状态（可访问的地图列表）
	init : function (userid,restype){
		var self=this;
		this.userId=userid;
		this.restype=restype;
		this.maplist = [];
		this.path = 'mapb.tablemgr.openmap';
		this.fileserverImg = gEcnu.config.geoserver+"fileserver?fn=upload/";
		var mapAccess = [];
		
		this.opendiv();
		this.getAccessedRes(userid,restype,function (data){ console.log('所有可访问资源',data);
			var resInfo=data.queryResult;
			self.maplist=resInfo;
			self._formatRes(resInfo);
			self._fillOwnMapList();
			self._fillOtherMapList();
			// var ownres = self._formatOwnMap(resInfo);
			// var otherres = self._formatOtherMap(resInfo);		
			// self.fillSelect_my(selId_own,ownres,true);
			// self.fillSelect_others(selId_other,otherres,true);
		});
	},
	//获取用户可访问的地图资源列表: res、res_control表
	getAccessedRes: function (userid,restype,callback){
		var self=this;
		var path = this.path;
		var _callback=arguments.length>2 ? arguments[2] : function (){}; 
		var option={
			"scriptname":path+".getAccessRes",
			"userid":userid,
			"restype":restype
		}; 
		var sqlScript=new gEcnu.WebsqlScript({'processCompleted':function (msg){ 
				callback(msg);
			},'processFailed':function (){ alert('获取用户可访问资源有异常');}});
		sqlScript.processAscyn(option);
	},
	_formatRes: function (allRes){
		var otherRes = [];
		var ownRes = [];
		for(var i=0,len=allRes.length;i<len;i++){
			var rec = allRes[i];
			if(rec['RESOWNER']!=this.userId){
				var mapid = rec['MAP.MAP_ID'];
	    		var map_name = rec['MAP_NAME'];
	    		var resowner = rec['RESOWNER'];
	    		var shareType = rec['SHARETYPE'];
	    		var imgurl = this.fileserverImg + rec['IMGURL'];  //+"?t="+Math.random();
	    		var obj = {'mapId':mapid,'mapName':map_name,'resowner':resowner,'sharetype':shareType,'imgurl':imgurl};
	    		otherRes.push(obj);
			}else{
				var mapid = rec['MAP_ID'];
	    		var map_name = rec['MAP_NAME'];
	    		var resowner = rec['RESOWNER'];
	    		var imgurl = this.fileserverImg+rec['IMGURL'];  //+"?t="+Math.random();
	    		var obj = {'mapId':mapid,'mapName':map_name,'resowner':resowner,'imgurl':imgurl};
	    		ownRes.push(obj);
			}	
		}
		this.ownRes = ownRes;
		this.otherRes = otherRes;
	},
	showOwnMap: function (){

		var ownId = this.getBtnId_Own();
		var otherId = this.getBtnId_Other();
		var ownBtn = document.getElementById(ownId);
		var otherBtn = document.getElementById(otherId);
		var ownDiv = document.getElementById(this.getId_own());
		var otherDiv = document.getElementById(this.getId_other());
		ownBtn.style.borderBottom = '4px solid #F09932';
		otherBtn.style.borderBottom = '0px';
		ownDiv.style.display = 'block';
		otherDiv.style.display = 'none';
	},
	showOtherMap:function (){
		var ownId = this.getBtnId_Own();
		var otherId = this.getBtnId_Other();
		var ownBtn = document.getElementById(ownId);
		var otherBtn = document.getElementById(otherId);
		var ownDiv = document.getElementById(this.getId_own());
		var otherDiv = document.getElementById(this.getId_other());
		ownBtn.style.borderBottom = '0px';
		otherBtn.style.borderBottom = '4px solid #F09932';
		ownDiv.style.display = 'none';
		otherDiv.style.display = 'block';
	},
	_fillOwnMapList: function (){ 
		var ownres = this.ownRes;
		var ownDivId = this.getId_own();
		var odiv = document.getElementById(ownDivId);
		
		var ofrag = document.createDocumentFragment();
		var oul = document.createElement('ul');
		var oli = document.createElement('li'); 
		var oimg = document.createElement('img');
		var ospan = document.createElement('span');
		odiv.innerHTML = '';
		for(var i=0,len=ownres.length;i<len;i++){
			var resid = ownres[i]['mapId'];
			var mapalias = ownres[i]['mapName'];
			var resowner = ownres[i]['resowner'];
			var imgurl = ownres[i]['imgurl'];
			var li = oli.cloneNode(true);
			var img = oimg.cloneNode(true);
			var span = ospan.cloneNode(true);
			img.src = imgurl;   //+"?t="+Math.random();
			img.id = resid; 
			img.setAttribute('sharetype','4');
			img.className = 'ownresImg';
			img.setAttribute('resowner',resowner);
			span.innerHTML = mapalias;
			li.appendChild(img);
			li.appendChild(span);
			oul.appendChild(li);	
		}
		ofrag.appendChild(oul);
		odiv.appendChild(ofrag);
	},
	_fillOtherMapList:function (){
		var otherRes = this.otherRes;
		var otherDivId = this.getId_other(); 
		var odiv = document.getElementById(otherDivId);
		var ofrag = document.createDocumentFragment();
		var oul = document.createElement('ul');
		var oli = document.createElement('li'); 
		var oimg = document.createElement('img');
		var ospan = document.createElement('span');
		odiv.innerHTML = '';
		for(var i=0,len=otherRes.length;i<len;i++){
			var resid = otherRes[i]['mapId'];
			var mapalias = otherRes[i]['mapName'];
			var resowner = otherRes[i]['resowner'];
			var imgurl = otherRes[i]['imgurl'];
			var sharetype = otherRes[i]['sharetype'];
			var li = oli.cloneNode(true);
			var img = oimg.cloneNode(true);
			var span = ospan.cloneNode(true);
			img.src = imgurl;
			img.id = resid;
			img.className = 'otherresImg';
			img.setAttribute('sharetype',sharetype);
			img.setAttribute('resowner',resowner);
			span.innerHTML = mapalias+"<br>分享者："+resowner+" <br>分享类型："+this.sharetype2ch(sharetype);
			li.appendChild(img);
			li.appendChild(span);
			oul.appendChild(li);
		}
		ofrag.appendChild(oul);
		odiv.appendChild(ofrag);
	},
	sharetype2ch: function (sharetype){
		var ch = 'null';
		switch(sharetype){
			case 1:
			ch = '只读分享';
			break;
			case 2:
			ch = '可复制';
			break;
			case 3:
			ch = '协同工作';
			break;
		}
		return ch;
	},
	
	/**
	 * 选择地图时 单击相应事件
	 * @param  {[type]} evt [description]
	 */
	_selMapHandler: function (clickImg){
		this.selectedRes = {};
		var resid = clickImg.id;
		var resowner = clickImg.getAttribute('resowner');
		var sharetype = parseInt(clickImg.getAttribute('sharetype')) || -1;
		var selRes = {resid:resid,resowner:resowner,sharetype:sharetype};
		this.selectedRes = selRes; console.log('当前选中的地图',selRes);		
	},

	reqMyMap:function (resid,userid,succ){
		this.mapShare = -1;
		var self = this;
		var _callback=succ ||function (){}; 
		var path = 'mapb.tablemgr.openmap'; 
		var param={
			"scriptname":path+".getOwnMap",
			"resid":resid,
			"userid":userid
			}; console.log(param);
		this._executeSql(param,function (res){ 
			var queryResult = res.queryResult;
			var result = self._processOwnMap(queryResult);console.log('open mymap',result);
			_callback(result);
		});


	},
	reqShareMap: function (resid,sharetype,succ){
		var self = this;
		var _callback=succ ||function (){}; 
		var path = 'mapb.datamgr.openmap'; 
		this.mapShare = parseInt(sharetype);
		switch(parseInt(sharetype)){ 
			case 1:  //read
			case 2:  //copy
			var param={
			"scriptname":path+".getOtherMap",
			"resid":resid
			};
			this._executeSql(param,function (msg){ 
			    var queryResult = msg.queryResult;
				var result = self._processMapinfo(queryResult); console.log('read',result);
				_callback(result);
			});
			break;
			case 3:  //write
			var param={
			"scriptname":path+".getWriteMap",
			"resid":resid,
			"userid":this.userId
			};
			this._executeSql(param,function (msg){
				var queryResult = msg.queryResult;
				var result = self._processMapinfo(queryResult);console.log('write',result);
				_callback(result);
			});
			break;
			default:
		}
		
		/*switch(parseInt(sharetype)){ 
			case 1:  //read
			var param={
			"scriptname":path+".getOtherMap",
			"resid":resid
			};
			this._executeSql(param,function (msg){
				var queryResult = msg.queryResult;
				var result = self._processMapinfo(queryResult); console.log('readonly',result);
				_callback(result);
			});
			break;
			case 2:  //copy
			var param={
			"scriptname":path+".getOtherMap",
			"resid":resid
			};
			this._executeSql(param,function (msg){ 
			    var queryResult = msg.queryResult;
				var result = self._processMapinfo(queryResult); console.log('copy',result);
				_callback(result);
			});
			break;
			case 3:  //write
			var param={
			"scriptname":path+".getOtherMap",
			"resid":resid
			};
			this._executeSql(param,function (msg){
				var queryResult = msg.queryResult;
				var result = self._processMapinfo(queryResult);console.log('write',result);
				_callback(result);
			});
			break;
			default:
		}*/
		 
		
	},
	_executeSql: function (param,succ){
		var self = this;
		var sqlScript=new gEcnu.WebsqlScript({'processCompleted':function (msg){ 
			if(succ) {
				succ(msg);
			}
		},'processFailed':function (){ alert('获取用户可访问资源有异常');}});
		sqlScript.processAscyn(param);
	},
	/**
	 * 处理自己的地图（里面含有他人的图层）
	 * @return {[type]} [description]
	 */
	_processOwnMap:function (data){
		this.mapinfo={};
		var map = {};
		var lyrs = [];
		 //存储地图空间信息
		 var resid = data[0]['MAP_ID'];
		if(resid!=undefined){
			var mapname = data[0]['MAP_NAME'];
			//var alias = data[0]['MAP_ALIAS'];
			var coord = data[0]['COORDSYS'];
			var viewExtent = data[0]['VIEWEXTENT'];
			var extent = data[0]['EXTENT'];
			var mapShare = this.mapShare;
			map = {'mapName':mapname,'coord':coord,'viewExtent':viewExtent,'extent':extent,'mapId':resid,'shareType':mapShare};
			//图层信息
		data.splice(0,1);
		}
		lyrs = data;
		//针对图层数据，含有其他人分享的图层
		var filterLyrs = this._filterShareAgain(lyrs);
		var result = {'map':map,'lyrs':filterLyrs};
		this.mapinfo = result;
		return result;

	},
	/**
	 * 过滤：一个图层针对该用户分享多次的，以最高权限为主（1,2,3）
	 * @param  {[type]} lyrs [description]
	 */
	_filterShareAgain:function (lyrs){
		var result = [];
		var obj = {};
		for(var i=0,len=lyrs.length;i<len;i++){
			var lyr = lyrs[i];
			var lyrname = lyr.LYR_NAME;
			var sharetype = lyr.SHARETYPE ? parseInt(lyr.SHARETYPE):-1;
			if(obj[lyrname]){
				var existShare = parseInt(obj[lyrname].SHARETYPE);
				if(existShare<sharetype){
					obj[lyrname].SHARETYPE = sharetype;
				}
			}else{
				obj[lyrname] = lyr;
			}
		}
		for(var key in obj){
			result.push(obj[key]);
		}
		return result;	
	},
	_processMapinfo: function(data){
		var map = {};
		var lyrs = [];
		 //存储地图空间信息
		 var resid = data[0]['MAP_ID'];
		if(resid!=undefined){
			var mapname = data[0]['MAP_NAME'];
			//var alias = data[0]['MAP_ALIAS'];
			var coord = data[0]['COORDSYS'];
			var viewExtent = data[0]['VIEWEXTENT'];
			var extent = data[0]['EXTENT'];
			var mapShare = this.mapShare;
			map = {'mapName':mapname,'coord':coord,'viewExtent':viewExtent,'extent':extent,'mapId':resid,'shareType':mapShare};
			//图层信息
		data.splice(0,1);
		}
		lyrs = data;
		var result = {'map':map,'lyrs':lyrs};
		this.mapinfo = result;
		return result;
	},
	//确定 --添加地图
	/*confirmExec : function (){
		var succ=this.succCallback;
		if(!this.selectedRes || !this.selectedRes.resid){ return;}
		var resowner = this.selectedRes.resowner;
		var resid = this.selectedRes.resid;
		var userid = this.userId; 
		var sharetype = this.selectedRes.sharetype;
		this.openMap(userid,resid,resowner,sharetype,succ);
		// if(resowner==userid){
		// 	this.reqMyMap(resid,userid,succ);
		// }else{
		// 	var sharetype = this.selectedRes.sharetype;
		// 	this.reqShareMap(resid,sharetype,succ);
		// }
		this.hide();
	},*/

	confirmExec : function (){
		var succ=this.succCallback;
		if(!this.selectedRes || !this.selectedRes.resid){ return;}
		var resowner = this.selectedRes.resowner;
		var resid = this.selectedRes.resid;
		var userid = this.userId; 
		var sharetype = this.selectedRes.sharetype;
		var resrlname = this.resrealname;
		//this.openMap(userid,resid,resowner,sharetype,succ);
		// if(resowner==userid){
		// 	this.reqMyMap(resid,userid,succ);
		// }else{
		// 	var sharetype = this.selectedRes.sharetype;
		// 	this.reqShareMap(resid,sharetype,succ);
		// }
		this.requestTbs(resid, sharetype, this.succCallback);
		this.hidediv();
	},

	requestTbs: function (dbid, dbqx, callback){
		var usrname = this.userId;
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

	openMap: function (userid,resid,resowner,sharetype,succ){
		if(resowner==userid){
			this.reqMyMap(resid,userid,succ);
		}else{
			this.reqShareMap(resid,sharetype,succ);
		}
	},
	//'取消命令'
	cancelExec : function (){
		this.hide();
	},

	hidediv: function (){
		$('#right-opendbmap').css('display','none');
	},

	opendiv: function (){
		$('#right-opendbmap').css('display','block');
		$('#opemmap_pop').css('display','block').prevAll().css('display','none');
		$('#opemmap_pop').nextAll().css('display','none');
	},
	/*show: function (){
		var mapid=this.getModId();
		var popwins = document.getElementById(mapid).parentNode.childNodes;
		for(var i=0,len=popwins.length;i<len;i++){ 
			if(popwins[i].nodeType==1){
			popwins[i].style.display='none';
			}
		}
		document.getElementById(mapid).style.display='block';
		document.getElementById(mapid).parentNode.style.display='block';
	},
	hide: function (){  //弹窗层在最上方，会遮盖地图，不用时要隐藏弹窗层
		var mapid=this.getModId();
		document.getElementById(mapid).style.display='none';
		document.getElementById(mapid).parentNode.style.display='none';
	},*/
	//获取选中的地图工作空间信息 ，包括地图信息和图层信息{map:{mapname:,coord:},lyrs:[]}
	getMapInfo: function (){ 
		return this.mapinfo;
	},
	getModId : function (){
		return "opemmap_pop";
	},
	getBtnId_Own:function (){
		return "own_accessMapBtn";
	},
	getBtnId_Other:function (){
		return "other_accessMapBtn";
	},
	getId_own: function (){
		return 'ownmap_div';
	},
	getId_other: function (){
		return 'othermap_div';
	},

/*	getOwnSelId: function (){
		return "ownmap_select";
	},
	getOtherSelId: function (){
		return "accessmap_select";
	},*/
    //添加自定义事件
	addCustomEvt:function (evtName,succCallback){
		var self=this;
		switch(evtName){
			case "confirm":
			 self.succCallback=arguments.length>1 ? arguments[1] : function (){};
			break;
		}
	}
	};

	//内部事件处理
	//确定 取消
	$('#openmap_confrm').on('click',function (){ 
		openmapMod.confirmExec();
	});
	$('#openmap_cancel').on('click',function (){ 
	   openmapMod.hidediv();
	});
	//切换显示
	$('#own_accessMapBtn').on('click',function(){
		openmapMod.showOwnMap();
	});
	$('#other_accessMapBtn').on('click',function(){
		openmapMod.showOtherMap();
	});
	//选择地图
/*	$('#accessMapList img').hover (function(evt) { console.log('hover');
            $(this).addClass('hoverImg'); 
        }, function(evt){ 
            $(this).removeClass('hoverImg'); 
        }); 
	$('#accessMapList').click(function(evt) {
		   var clickImg = evt.target || evt.srcElement; 
		   if(clickImg.tagName!='IMG'){  return;  }
            $('#accessMapList img.clickedImg').removeClass('clickedImg'); 
            $(clickImg).addClass('clickedImg'); 
            openmapMod._selMapHandler(clickImg);      
    });*/
	$('#accessMapList').on('click','img',function (evt){
		var clickImg = evt.target || evt.srcElement;
		openmapMod.resrealname = $(this).next().text();
		if(clickImg.tagName=='IMG'){
			$('#accessMapList img').each(function (){ 
				if(this!=clickImg){
					this.style.border='1px solid #EBEBEB';
				}else{ 
					this.style.border='2px solid #F09932';	
				}
			});
			openmapMod._selMapHandler(clickImg);
		}
	})


	module.exports = openmapMod;

});



