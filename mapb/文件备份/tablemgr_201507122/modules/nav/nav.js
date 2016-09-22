define(function (require, exports, module){
  var navMod = {
    init: function (){

    },
    changeTile: function (dbname, tbname){
      if(tbname !== undefined){
        $('#head-db').text(dbname);
        $('#head-tbname').text(tbname);
        if(dbname == "" && tbname==""){
          $('#head-line').text("");
        }else if(tbname == ''){
          $('#head-line').text("");
        }else{
          $('#head-line').text("—");
        }
      }else{
        $('#head-db').text(dbname);
        $('#head-line').text("");
        $('#head-tbname').text('');
      } 
    },
    setUser: function (username){
      $('#head-user').text(username);
    },
    clearAllTitle: function (){
      $('#head-db').text('');
      $('#head-line').text("");
      $('#head-tbname').text("");
    },
    clearTbTitle: function (){
      $('#head-line').text("");
      $('#head-tbname').text("");
    }
  }
  //顶部导航hover、click事件
  $("#head-menuItem li[liclass=datamgr]").addClass('nav-clicked');
  $('#head-menuItem li').hover (function() { 
               $(this).addClass('nav-hover'); 
             }, 
    function(){ 
      $(this).removeClass('nav-hover'); 
  }); 
 $('#head-menuItem li').click (function() { 
      $('#head-menuItem li.nav-clicked').removeClass('nav-clicked'); 
      $(this).addClass('nav-clicked'); 
      window.open("/mapb/" + $(this).attr("liclass") + "/index.html",'_self');
 });

/* var usrID = sessionStorage.getItem("usrName");
 $("#user").children("span").html(usrID);*/

$('#head-loginout').click(function (){
  window.open("/mapb/logreg/login/login.html","_self");
  sessionStorage.removeItem('usrID');
  sessionStorage.removeItem('usrName');
  sessionStorage.removeItem('webUrl');
});

$('.head-title').click(function (){
  window.open("/mapb/main.html","_self");
});

module.exports = navMod;

});
