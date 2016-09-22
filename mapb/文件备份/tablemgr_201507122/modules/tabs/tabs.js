$(document).ready(function (){
	//$("#tabs-tb").addClass('clicked');

	/*$(".tabs div").hover(function (){
		$(this).addClass('hover');
	},
	function (){
		$(this).removeClass('hover');
	}
	);*/

	$(".tabs div").click(function (){
		$(".tabs div").removeClass("tabs-clicked");
		$(this).addClass('tabs-clicked');

		var shtype = parseInt(currentDbqx);
		if(shtype == 4){
			shtype = -1;
		}

		var ttype = currentTbtype;
		if(ttype == 'ftset'){
			ttype = 'lyr';
		}
		var info = {'mapId':parseInt(currentDbId), 'shareType':shtype,'tbId':parseInt(currentTbId),'tbResType':ttype, 'mapName':currentDbName,'owner':mapOwner};

		var self = this;
		sessionStorage.setItem('mapMsg',JSON.stringify(info));
		setTimeout(function (){
			window.open("/mapb/" + $(self).attr("data-btn"),"_self");
		},80);
		
	});
});