  function show(obj){
       var iTop = obj.offsetTop;
       while(obj = obj.offsetParent){
           iTop += obj.offsetTop
       }
       return iTop;
  	}
  function get_scrollTop_of_body(){ 
      var scrollTop; 
      if(typeof window.pageYOffset != 'undefined'){//pageYOffset指的是滚动条顶部到网页顶部的距离
          scrollTop = window.pageYOffset; 
      }else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat')        { 
          scrollTop = document.documentElement.scrollTop; 
      }else if(typeof document.body != 'undefined'){ 
          scrollTop = document.body.scrollTop; 
      } 
      return scrollTop; 
  	}
  function loadimg(){
  	var bodyHeight=document.body.clientHeight;
  	var bodyscrollTop=get_scrollTop_of_body();
  	var lazyimgs=document.getElementsByTagName("IMG");
  	var len=lazyimgs.length;
  	for(var i=0;i<len;i++){
          var _this = lazyimgs[i];
          if(_this.getAttribute("class")!="delayloadimg"){
             continue;
          }
          var img_Top=show(lazyimgs[i])-bodyscrollTop;
          if((img_Top>=0)&&(img_Top<=bodyHeight)){
             if(_this.src.indexOf("blank")!=(-1)){
                var nresrc=_this.getAttribute("xsrc");
                _this.setAttribute("src",nresrc);
             }
         }
  	}
  }
  $(window).load(function() {
      var iever=getIEversion();
  	  if(iever!=0){
  		alert("对不起，您的IE内核浏览器版本过低，请更新浏览器！");
  	  }

  	  $('.flexslider').flexslider({
           animation: "slide"
         });
  	  window.setTimeout(loadimg,500);
  		//requestGuestNum();
  });
  /*
  $(window).scroll(function() {
      window.setTimeout(loadimg,600);
  });
  */
  function getIEversion(){
     var userAgent = window.navigator.userAgent.toLowerCase();
     //if(/msie 10\.0/i.test(userAgent)) return 10;
     //if(/msie 9\.0/i.test(userAgent)) return 9;
     //if(/msie 8\.0/i.test(userAgent)) return 8;
     if(/msie 7\.0/i.test(userAgent)) return 7;
     if(/msie 6\.0/i.test(userAgent)) return 6;
     return 0;
  }