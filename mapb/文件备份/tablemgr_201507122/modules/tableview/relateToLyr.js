define(function (require, exports, module){

	var relateLyrMod = {


		init: function (dbid,tbid,tbname,tbrlname,tmpallfts,tmpallftsid,tmpallftsreal){
			this.show();
			var tbnameinpt = 'rtvmt-tninpt';
			var tbzdsel    = 'rtvmt-zdinpt';
			var attrsel  = 'rtvmt-lyrattrna';
			var attrzdsel = 'rtvmt-zdlyrattr';

			this.createTbNmInpt(tbnameinpt,tbname,tbid);

			this.createLyrTbNm(attrsel,tmpallfts,tmpallftsid,tmpallftsreal);

			this.getAllzds(tbrlname,tmpallftsreal);
		},

		show:function (){
			$('.rtv-mtrelate').prevAll().css('display','none');
			$('.rtv-mtrelate').nextAll().css('display','none');
			$('.rtv-mtrelate').css('display','block');
		},

		hide: function (){
			$('.rtv-mtrelate').css('display','none');
		},

		createTbNmInpt: function (inputid,tbname,tbid){
			$('#'+inputid).val(tbname).prop('disabled',true).attr('data-tbid',tbid);
		},

		createTbZdList: function (tzdsel){

		},

		createLyrTbNm: function (lyrsel,tmpallfts,tmpallftsid,tmpallftsreal){
			$('#'+lyrsel).empty();
			var sel = document.getElementById(lyrsel);
			for(var i =0, len = tmpallftsreal.length; i < len; i++){
				var option = document.createElement('option');
				option.innerHTML = tmpallfts[i];
				option.value = tmpallftsreal[i];
				option.setAttribute('data-ftsid',tmpallftsid [i]);
				sel.appendChild(option);
			}
		},

		getAllzds: function (tbrealnm,ftreslanmes){	
			var alltbs = ftreslanmes.concat(tbrealnm);

			var filter = "";
			for(var i = 0, len = alltbs.length; i < len; i++){
				filter += "tab_name="+"'"+alltbs[i]+"' or";
			}
			filter = filter.substring(0,filter.length-3);
			alert(filter);

			var option = {
				'scriptname':'mapb.tablemgr.tbtool.relate_allzd',
				'filter':filter
			}

		}

	}

	$('#rtv-cancelrelate').click(function (){
		relateLyrMod.hide();
	});

	$('#rtv-okrelate').click(function (){
		
	});
	module.exports = relateLyrMod;
})