
//地图视图模块 （通过require加载的脚本，会在页面再入时先把所有通过require方法引进的脚本请求过来，但不解析，赋值后，再解析脚本）

	
	var mapviewMod = {
		init : function (param){  
			var param_map=param.map;
			var param_lyrs=param.lyrs;
			this.mapId = param_map.mapId;
			this.mapDetails = param.map;
			this.lyrDetails = param.lyrs;
			this.coord=param_map.coord;
			this.viewExtent=param_map.viewExtent;
			//this.mapdb = param_map.resowner;
			this.mapdb = 'mapb';
			this.resetMap();
			//this.createMapObj(mapname);
			this.initMap();
		},
		map:null,
		dynLayer:null,
		initMap: function (){
			var mapname = this.mapId;
			this.createMapObj(mapname);
			this.initMapCoord();

			var timestamp=+ new Date();
			var dynId='dyn_'+timestamp;
			var lyrstr = 'empty';
			for(var i=0,len=this.lyrDetails.length;i<len;i++){
				var lyrname=this.lyrDetails[i]['LYR_NAME'];
				lyrstr +=","+lyrname;
			} 
			this.zoomToView();
			var mapdb = this.mapdb;  
			var dyn=new gEcnu.Layer.Dyn(mapdb+"/"+mapname, dynId, lyrstr);
			this.dynLayer=dyn;
			this.map.addLayer(dyn);
			this.addScaleBar({left:50,bottom:8});

			//查询图层时 高亮显示层
			var qrystyle=new gEcnu.Style({ opacity:0.5,strokeColor:'red',lineWeight:2});
			var graphLayer = new gEcnu.Layer.Feature('querylyr',qrystyle,{'opacity': 1.0});
			this.map.addLayer(graphLayer);
			this.queryGraphLayer = graphLayer;
			

		},
		//实例化地图对象
		createMapObj : function (mapname){
			var mapid=this.getMapId();
			this.map=new gEcnu.Map(mapid); 		
		},
		initMapCoord:function (){
			var mapCoordsys = this.coord;
			var map = this.map;
			switch(mapCoordsys){
  			  case "WGS":
  			  map.setGeoCoordsFlag();
  			  break;
  			  case "NonEarth":
  			  map.setProjCoordsFlag();
  			  break;
  			}
		},
		
		addScaleBar:function (pos){
			var scale=new gEcnu.Control.Scale('scalectrlTool');
			scale.setScalePos(pos);  //{left:20,bottom:15}
			this.map.addControl(scale);
		},
		/**
		 * 添加标注
		 */
		addMarkers: function (markerArr){
			if(!(this.map)){
				return;
			}
			this.map.mLayer.addMarkers(markerArr);
		},
		/**
		 * 添加矢量要素层
		 * @param {string} id   图层id
		 * @param {Object} option 图层的参数设置 透明度等
		 * 
		 */
		addLayer: function (fealayer){
			if(!(this.map)){
				return;
			}
			if(fealayer!=undefined){
				this.map.addLayer(fealayer);
			}
		},

		/**
		 * 在动态图上添加图层
		 * @param {[type]} lyrArr 图层数组
		 */
		addDynLyrs : function (lyrstr){
			var dyn = this.dynLayer;
			dyn.addLyr(lyrstr);
		},
		removeDynLyrs: function (lyrstr){
			var dyn = this.dynLayer;
			dyn.removeLyr(lyrstr);
		},



		switchToolPane: function (){
			var toolpaneId = this.getToolPaneId();
			$('#'+toolpaneId).animate({height:'toggle'},'fast');
		},
		refresh: function (){
			var dyn = this.dynLayer;
			dyn.refresh();
		},
		/**
		 * 缩放至地图范围
		 */
		zoomToView: function (){
			var viewExtent= this.viewExtent; 
			var arr=viewExtent.split(','); 
  			var centerx=(parseFloat(arr[0])+parseFloat(arr[2]))/2;  
  			var centery=(parseFloat(arr[1])+parseFloat(arr[3]))/2;  
  			var zoom=(arr[2])-(arr[0]);  
  			this.map.zoomTo(centerx,centery,{'zoom':zoom});
		},
		resize:function (){
			if(this.map){
				this.map.resize();
			}
		},
		//重置：回到模块初始状态
		resetMap : function (){
			var mapid=this.getMapId();
			var mapDiv = document.getElementById(mapid);
			mapDiv.innerHTML = '';
			this.map = null;  //重置
			this.dynLayer = null;
		},
		getQueryLayer: function (){
			return this.queryGraphLayer;
		},
		//获取地图容器的id
		getMapId : function (){
			return 'mapView';
		},
		getToolPaneId: function (){
			return 'editToolPane';
		},
		getMap_Id:function(){
			return this.mapId;
		},
		getQryInfoId: function (){
			return 'qryinfoDiv';
		},
		getInfoContId: function (){
			return 'infoCont';
		},
		//获取地图对象
		getMap : function (){
			return this.map;
		},
		getDynLayer: function (){
			return this.dynLayer;
		},
		getViewExtent: function(){
			return this.viewExtent;
		},
		getMapCoord: function(){
			return this.coord;
		}
		
		

	};
