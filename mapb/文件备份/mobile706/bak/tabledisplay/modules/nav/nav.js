$(document).ready(function(){
   $('#menu').click(function(){
     $("#menuDiv").fadeToggle("fast");
   });
   $('#homeMenu').click(function(){
     window.open("../home/index.html",'_self');
   });
   $('#mapMenu').click(function(){
      window.open("../mapmgr/index.html",'_self');
   });
   $('#dataMenu').click(function(){
      window.open("../tablemgr/index.html",'_self');
   });
   $('#myMenu').click(function(){

   });
   $('#mapType').attr('value',$('#mapType').val());

})