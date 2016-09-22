
var zhtoolUtil = {
	//去除数组中重复的元素
	uniqueArray:function(arr){
		arr = arr || [];
		var a = {};
		for(var i =0, len = arr.length; i < len; i++){
			var key = arr[i];
			if(typeof(a[key]) == 'undefined'){
				a[key] = 1;
			}
		}

		//一下可以分两种一个是直接改变原数组，另一种是不改变原数组
		//改变原数组
		/*arr.length = 0;
		for(var key1 in a){
			arr[arr.length] = key1;
		}
		return arr;*/

		//不改变原数组，返回新数组
		var arrtmp = [];
		var num = 0;
		for(var key1 in a){
			arrtmp[num] = key1;
			num++;
		}

		return arrtmp;
	},
	//判断两个数组是否相同两种，一种是严格意义的相同就是元素、顺序都相同，第二种是元素相同但顺序可以不同
	//严格意义的数组相同1
	isAbosoluteSame:function (arr1,arr2){
		var ifsame = true;
		if(arr1.length == arr2.length){
			for(var i =0,len = arr1.length; i < len; i++){
				if(arr1[i] != arr2[i]){
					ifsame = false;
					break;
				}
			}
		}else{
			ifsame = false;
		}
		return ifsame;
	},
	
	isAbosoluteSame2:function (arr1,arr2){
		var ifsame = false;
		if(arr1.toString() == arr2.toString()){
			ifsame = true;
		}
		return ifsame;
	},
	/*
	*不严格的数组相同
	*@param {array} arr1 arr2  比较是否相等的两个数组
	*/
	notAbosoluteSame:function (arr1,arr2){
		var ifsame = false;
		var len1 = arr1.length,len2 = arr2.length;
		if(len1 == len2){
			var tmp = [];
			for(var i = 0; i < len1; i++){
				for(var j = 0; j < len2; j++){
					if(arr1[i] == arr2[j]){
						tmp.push(1);
					}
				}
			}
			if(tmp.length == len1){
				ifsame = true;
			}else{
				ifsame = false;
			}
		}else{
			ifsame = false;
		}
		return ifsame;
	},
	/** 
	 * 根据类名获得元素 
	 * 参数说明: 
	 *      1、className 类名 
	 *      2、tag 元素名 默认所有元素 
	 *      3、elm 父元素 默认doucment 
	 */  
	getElementByclassname:function (classname,tag,elm){
		var testclass = new RegExp("(^|/s)" + classname + "(/s|$)");
		var tag = tag || "*";
		var elem = elem || document;

		var elements = (tag == "*" && elem.all) ? elem.all : elem.getElementsByTagName(tag);
		var returnelements = [];
		for(var i = 0, len = elements.length; i < len; i++){
			if(testclass.test(elements[i].className)){
				returnelements.push(elements[i]);
			}
		}
		return returnelements;
	},
	/*
	*根据div的id来拖动div
	*@param {string} objid       点击拖动div中元素的id
	*@param {string} dragdivid    整个移动div的id
	*/
	//不足：不能兼容IE浏览器
	dragElement:function (objid, dragdivid) {
		var dragpos = document.getElementById(objid);
		dragpos.style.cursor = "move";

		var dgdiv = document.getElementById(dragdivid);
		var dgdiv_width = dgdiv.currentStyle ? dgdiv.currentStyle.width : document.defaultView.getComputedStyle(dgdiv,null).width;
		var dgdiv_height = dgdiv.currentStyle ? dgdiv.currentStyle.height : document.defaultView.getComputedStyle(dgdiv,null).height;

		var dgdiv_border = dgdiv.currentStyle ? dgdiv.currentStyle.borderWidth : document.defaultView.getComputedStyle(dgdiv,null).borderWidth;

		var delpx_wd = dgdiv_width.substring(0, dgdiv_width.length - 2);
		var delpx_he = dgdiv_height.substring(0, dgdiv_height.length - 2);
		var delpx_border = dgdiv_border.substring(0, dgdiv_border.length - 2);
		dragpos.onmousedown = function (e){
			var inneroffsetx = e.clientX - dgdiv.offsetLeft;
			var inneroffsety = e.clientY - dgdiv.offsetTop;

			document.onmousemove = function (evt){
				var left = evt.clientX - inneroffsetx;
				var top = evt.clientY - inneroffsety;

				var clientwd = document.documentElement.clientWidth;
				var clienthe = document.documentElement.clientHeight;

				if(left < 0){
					left = 0;
				}else if(left > (clientwd - delpx_wd - delpx_border*2)){
					left = clientwd - delpx_wd - delpx_border*2;
				}

				if(top < 0){
					top = 0;
				}else if(top > (clienthe - delpx_he - delpx_border*2)){
					top = clienthe - delpx_he - delpx_border*2;
				}

				dgdiv.style.left = left + 'px';
				dgdiv.style.top = top + 'px';
			}
			document.onmouseup = function (e){
				document.onmousemove = null;
				document.onmouseup = null;
			}

		}		
	},
	operateArray:{
		//找出数组中的数值最大值
		//@param {array} arr
		getMaxInArr:function (arr){
			return Math.max.apply(null,arr);//apply的精辟利用
		},

		//把一个数组push到另一个数组,可以避免for循环
		arrPushToarr:function (arr1, arr2){
			Array.prototype.push.apply(arr1, arr2);
			return arr1;
		},
		
		//复制数组
		copyArray:function (arr){
			return arr.slice(0);
		},

		isElementInarr: function (ele,arr){
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i] === ele){
					return true;
				}
			}
			return false;
		}	
	},
	//判断一个是否为数组
	isArray:function (arr){
		return Object.prototype.toString.call(arr) === '[object Array]';
	},

	// 判断fn是否为一个函数，返回一个bool值
	isFunction:function (fn) {
		return Object.prototype.toString.call(fn) === '[object Function]';
	},
	//对象

	// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
	// 尝试使用一行简洁的正则表达式完成该题目,所用正则表达式出自jquery源码
	trim:function (str) {
	    // your implement
	   return str.replace(/(^[\s\xA0]+)|([\s\xA0]+$)/g, "");
	},

	//删除左边的空格
	ltrim:function (str){ 
	　 return str.replace(/^[\s\xA0]+/g,"");
	},

	//删除右边的空格
	rtrim:function (str){ 
	　　return str.replace(/[\s\xA0]+$/g,"");
	},
	//给DOM元素添加事件
	/**
	*参数说明
	*   1、evtType事件类型
	*	2、ele绑定事件的dom元素	
	*	3、事件函数
	*/
	addHandle:function(evtType,ele,handle){
		if(ele.addEventListener){

			ele.addEventListener(evtType, handle, false);

		}else if(ele.attachEvent){

			ele.attachEvent("on" + evtType, handle);

		}else{

			ele["on" + evtType] = handle;
		}
	},

	//移除DOM上绑定的元素
	/*
	*参数说明
	*	1、evtType事件类型
	*	2、ele绑定事件的dom元素
	*	3、事件函数
	*/
	removeHandle:function (evtType,ele,handle){
		if(ele.removeEventListener){
			ele.removeEventListener(evtType, handle, false);
		}else if(ele.detachEvent){
			ele.detachEvent('on' + evtType, handle);
		}else{
			ele["on" + evtType] = null;
		}
	},

	//对象深拷贝
	cloneObj:function (obj){
		if(typeof obj != "object"){
			return obj;
		}
		var s = {};
		if(obj.constructor == Array){
			s = [];
		}
		for(var i in obj){
			s[i] = toolUtil.cloneObj(obj[i]);
		}
		return s;
	},

	//对象拷贝
	cloneobj2: function (obj){
		var tmp = JSON.stringify(obj);
		var obj = JSON.parse(tmp);
		return obj;
	},

	//函数:判断键盘是否按下Ctrl按键
	ifctrl:function (e){ 
     var nav4 = window.Event ? true : false; //初始化变量
     if(nav4) { //对于Netscape浏览器
       //判断是否按下Ctrl按键
       if((typeof e.ctrlKey != 'undefined') ? e.ctrlKey : e.modifiers & Event.CONTROL_MASK > 0) { 
         return true;
       } else {
          return false;
       }
     } else {
       //对于IE浏览器，判断是否按下Ctrl按键
       if(window.event.ctrlKey) {
           return true;
       } else {
           return false;
       }
     }
     return false;
   },

   //函数:判断键盘是否按下shift按键
   ifshift:function(e){ //函数:判断键盘Shift按键
     var nav4 = window.Event ? true : false; //初始化变量
     if(nav4) { //对于Netscape浏览器
       //判断是否按下Ctrl按键
       if((typeof e.shiftKey != 'undefined') ? e.shiftKey : e.modifiers & Event.SHIFT_MASK > 0) { 
         return true;
       } else {
          return false;
       }
     } else {
       //对于IE浏览器，判断是否按下Ctrl按键
       if(window.event.shiftKey) {
           return true;
       } else {
           return false;
       }
     }
     return false;
   },
   //延迟加载脚本
   /*
   * 参数说明
   * 1、加载脚本的url
   * 2、加载完成后的回调函数（可选）
   * 该函数只有在没有同名脚本被加载时才加载上新脚本
   **/
   loadScript:function (url,callback){
	   	var sts = document.getElementsByTagName('script');
	   	for(var i = 0, l = sts.length; i < l; i++){
	   		if(sts[i].src == url){
	   			alert("已有同名的脚本！");
	   			return;
	   		}
	   	}
	   	var st = document.createElement('scirpt');
	   	st.type = "text/javascript";
	   	if(st.readyState){
	   		if(st.readyState == "loaded" || st.readyState == "complete"){
	   			st.onreadystatechange = null;
	   			if(callback){
		   			callback();
		   		}else{
		   			return;
		   		}
	   		}
	   	}else{
	   		st.onload = function (){
		   		if(callback){
		   			callback();
		   		}else{
		   			return;
		   		}
	   		};
	   	}
	   	st.src = url;
	   	document.body.appendChild(st);
   },

   /*
   *设置cookie
   *  参数说明
   *
   *
   ***/
   setCookie:function (name,value,days){
   	toolUtil.delCookie(name);
   	if(days){
   		days = days
   	}else{
   		days = 10;
   	}
   	var date = new Date();
   	date.setTime(date.getTime() + days*24*3600*1000);
   	document.cookie = name + "=" + escape(value) + ";expires=" + date.toGMTString();
   },
   /*
   *删除cookie
   * 参数说明
   * 1、cookie的key名
   *
   *********/
   delCookie:function (name){
   	var date = new Date();
   	date.setTime(date.getTime() - 10);
   	var val =  toolUtil.getCookie(name);
   	if(val == ""){
   		return;
   	}else{	
   		document.cookie = name + "=" +val + ";expires=" + date.toGMTString();
   	}
   },
   /*
   *获取单个cookie的值
   *  1、cookie的键值
   *
   ***/
   getCookie:function (name){
	   	var tmp = document.cookie.split(";");
	   	for(var i = 0, l = tmp.length; i < l; i++){
	   		var arr = tmp[i].split("=");
	   		if(arr[0] == name){
	   			if(arr.length>1)
	   			return unescape(arr[1]);
	   		}else{
	   			return ""
	   		}
	   	}
	   	return "";
   },

   getDateall: function (){
   	var mydate = new Date();

   	var year = mydate.getFullYear();//年
   	var month = mydate.getMonth()+1;//月
   	if(month<10){
   		month = "0"+month;
   	}
   	var day = mydate.getDate();
   	if(day<10){
   		day = "0"+day;
   	}
   	var xingqiji = mydate.getDay()+1;
   	if(xingqiji<10){
   		xingqiji = "0"+xingqiji;
   	}
   	var hour = mydate.getHours();
   	if(hour<10){
   		hour = "0"+hour;
   	}
   	var minite = mydate.getMinutes();
   	if(minite<10){
   		minite = "0"+minite;
   	}
   	var secondes = mydate.getSeconds();
   	if(secondes<10){
   		secondes = "0"+secondes;
   	}
   	var milliseconds   = mydate.getMilliseconds();
   	if(milliseconds<10){
   		milliseconds = "0"+milliseconds;
   	}

   	var wholetime = ""+year+month+day+hour+minite+secondes+milliseconds;

   	return wholetime;
   }
}






















