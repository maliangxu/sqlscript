$(document).ready(function(){
   
  	seajs.config({
  	'base':'./modules/'
  	});

	  define(function(require){
	  	require('nav/nav');
      var mapHotFun = require('map_hot/map_hot');
      
      mapHotFun.resultMap(function(){ 
        $(".myData_caption").each(function(){
            $(this).css('cursor','pointer'); 
        });
        $(".myData_caption").click(function (){
            var Ind = $(this).parent().index();
            mapHotFun.Link2Datamgr(Ind);
        });
      });

      


	  });

    $("#navList li:first").addClass("checkedLi");  
    
    $("#navList li").click(function() { 
        $("#navList li.checkedLi").removeClass('checkedLi'); 
        $(this).addClass('checkedLi'); 

        var thisDivId = $(this).attr("liId");
        $("#" + thisDivId).css({"display":"block"});
        $("#mapArea").children("div").not("#" + thisDivId).css({"display":"none"});
    });
	
	  var mdlType = sessionStorage.getItem("mdlCenter");
    $("#navList li[liId="+mdlType+"]").not(".checkedLi").trigger("click"); 

})