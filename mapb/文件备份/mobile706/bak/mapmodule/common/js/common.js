$(document).ready(function(){
   
  seajs.config({
  'base':'./modules/'
  });

	define(function(require){
		require('nav/nav');
	});

  initPage();

  function initPage(){
    var mapMsg=sessionStorage.getItem('mapMsg');  //{mapId:4,shareType:'read',owner:'licui'};
    console.log('session',mapMsg);
    
    var jsonparse=JSON.parse(mapMsg);
    if(!mapMsg || !jsonparse.mapId){  
      gotoDefaultMap();
      return;
      } 
    var resid=parseInt(jsonparse.mapId);
    var sharetype=parseInt(jsonparse.shareType);
    var resowner=jsonparse.owner;
    openTheMap(USERID,resid,resowner,sharetype);
  }
  //打开指定地图
  function openTheMap(userid,resid,resowner,sharetype){
    openmapMod.openMap(userid,resid,resowner,sharetype,function (mapinfo){
      console.log(mapinfo);
      mapviewMod.init(mapinfo);
      var lyrs=mapinfo.lyrs; 
      var mapname = mapinfo.map.mapName;
      var sharetype_map = mapinfo.map.shareType;

      currentMap = mapname;
      curMapId = resid;
      curShareType = sharetype_map;
      


     // document.getElementById('resname').innerHTML = mapname;

    });
  }
  /**
   * 打开默认地图
   * @return {[type]} [description]
   */
  function gotoDefaultMap(){ console.log('open default map');
    openTheMap(USERID,5,'admin',1);
  }



















	$('#local').click(function(){
      $('#cameraTrail').css('display','block');
  });
  $('#cameraTrail').click(function(){
      $('#cameraTrail').css('display','none');
  });
})