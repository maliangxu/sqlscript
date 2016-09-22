define(function (require, exports, module){
	var printTbmod = {
		init: function (){
			$('.rtv-tbdata').css("overflow","");
			$('.rtv-tbdata').jqprint();
		}
	}
	module.exports = printTbmod;
});