$(document).ready(function(){
   
    seajs.config({
    'base':'./modules/'
    });

	define(function(require){
		require('nav/nav');
	});

	$('#mapMdlUl li').click(function(){
      var thisDivId = $(this).attr("id");
      sessionStorage.setItem("mdlCenter", thisDivId);
      window.open("../mapmgr/index.html",'_self');
    });

	$('#tableMdlUl li').click(function(){
      var thisDivId = $(this).attr("id");
      sessionStorage.setItem("mdlCenter", thisDivId);
      window.open("../tablemgr/index.html",'_self');
    });	


})