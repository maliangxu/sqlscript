define(function (require, exports, module){
	var tbtoolmod = {
		init: function(){

		},

		editshow: function (){
			$('.rtb_edittool').css('display','inline-block');
		},	

		edithide: function (){
			$('.rtb_edittool').css('display','none');
		},

		addCustomEvt: {
			_events:{},
			on: function (evttype,callback){
				switch (evttype){
					case 'toolclick':
					this._events.toolclick = callback;
					break;

					case 'canceledit':
					this._events.canceledit = callback;
					break;

					case 'edittool':
					this._events.edittool = callback;
					break;
				}
			}
		}
	}
	$('.rtb_ul li').click(function (){
		var tooltype = $(this).attr('id');
		tbtoolmod.addCustomEvt._events.toolclick(tooltype);
	});

	$('.rtbet-com').click(function (){
		var tooltype = $(this).attr('id');
		tbtoolmod.addCustomEvt._events.edittool(tooltype);
	});

	$('#rtbet-shut').click(function (){
		tbtoolmod.addCustomEvt._events.canceledit();
	});

	module.exports = tbtoolmod;
});

	

