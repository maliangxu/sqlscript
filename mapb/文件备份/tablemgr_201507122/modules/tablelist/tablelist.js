//初始化表格目录树
define(function (require,exports,module) {
	var tableListMod={

		currentTbName: "",

		currentDbName: "",

		currentTbRealName: "",

		currentTbId: "",

		currentDbId: "",

		currentTbqx: "",

		currentDbqx: '',

		currentFilter:'',

		//allOpenDb:[],//存储所有表空间的名称

		//allOpenDbid:[],//存储所有表空间的id

		ftsinfo:{ftsId:'',ftsName:'',ftsalias:'',ftsqx:''},

		curTabType:"",

		allTbs:[],
		allTbsid:[],

		allfts:[],
		allftsid:[],
		allftsreal:[],

		init:function (){
			
		},
		createTbList: function (dbname, dbid, dbqx, dbowner, aoTblist){
			//当新建表格时不会传入aoTblist
			console.log(aoTblist)
			if(this.currentDbId != "" && this.currentDbId == dbid){
				//alert('该表空间已打开！');
				return;
			}

			this.allTbs = [];
			this.allfts = [];
			this.allTbsid = [];
			this.allftsid = [];
			this.allftsreal = [];

			this.clearDisplayData();

			$('#ltbl-list').empty();
			if(aoTblist !== undefined){
				var result = aoTblist['queryResult'];
				var strlis = "";

				var strlisftset = "";

				for(var i = 0, l = result.length; i < l; i++){
					var editclass = "lft-edit edit" + result[i]['SHARETYPE'];
					var relaclass = "lft-relative relate" + result[i]['SHARETYPE'];
					if(result[i]['TABTYPE'] == 'tb'){

						this.allTbs.push(result[i]['TB_ALIAS']);
						this.allTbsid.push(result[i]['TB_ID']);

						strlis = strlis + "<li class='lft-tbli' data-ltid="+ result[i]['TB_ID'] +" data-tbreal="+ result[i]['TB_NAME'] +" data-qx="+result[i]['SHARETYPE']+" data-filter=''><div class='lft-tbicon'></div><div class='lft-tbnamediv' title="+"'"+result[i]['TB_ALIAS']+"'"+">" + result[i]['TB_ALIAS'] + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div><div class="+"'"+relaclass+"'"+" title='关联地图'></div></li>";
					}else{
						//strlisftset = strlisftset + "<li class='lft-ftsli' data-ftid="+ result[i]['TB_ID'] +" data-ftsreal="+ ("f_"+result[i]['TB_NAME']) +" data-qx="+result[i]['SHARETYPE']+"><div class='lft-ftsicon'></div><div class='lft-ftsnamediv' title="+result[i]['TB_ALIAS']+">" + result[i]['TB_ALIAS'] + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div><div class="+"'"+relaclass+"'"+" title='关联地图'></div><li>";
						this.allfts.push(result[i]['TB_ALIAS']);
						this.allftsid.push(result[i]['TB_ID']);
						this.allftsreal.push(result[i]['TB_NAME']);

						var tbreal='';
						var filters = '';
						var tmpfilter = result[i]['FILTER'];

						if(tmpfilter.indexOf('?') > 0){
							var index = tmpfilter.indexOf('?');
							filters = tmpfilter.substring(index+1,tmpfilter.length);
							tbreal = tmpfilter.substring(0,index);
						}else{
							tbreal = tmpfilter;
							filters = '';
						}
						/*if(result[i]['FILTER'].indexOf('?') >= 0){

						}*/


						strlisftset = strlisftset + "<li class='lft-ftsli' data-ftid="+ result[i]['TB_ID'] +" data-ftsreal="+ ("f_"+tbreal) +" data-qx="+result[i]['SHARETYPE']+" data-filter="+"'"+filters+"'"+"><div class='lft-ftsicon'></div><div class='lft-ftsnamediv' title="+"'"+result[i]['TB_ALIAS']+"'"+">" + result[i]['TB_ALIAS'] + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div></div></li>";
					}
					
				}
			}
			var strdiv = "<div class='lft-dbdiv' data-ltid="+dbid+" data-own="+dbowner+" data-qx="+dbqx+" data-dbname="+dbname+"><div class='lft-arrow' data-open='no'></div><div class='lft-dbicon'></div><div class='lft-dbnamediv'>统计数据</div></div>";

			var strdivfts = "<div class='lft-dbdiv' data-ltid="+dbid+" data-own="+dbowner+" data-qx="+dbqx+" data-dbname="+dbname+"><div class='lft-arrow' data-open='yes'></div><div class='lft-dbicon'></div><div class='lft-dbnamediv1'>"+'属性数据'+"</div></div>"
			//console.log(aoTblist['queryResult'].length);
			var ul = document.getElementById('ltbl-list');

			var li2 = document.createElement('li');
			li2.className = "lft-twoli";
			var ul3 = document.createElement("ul");
			ul3.className = "lft-ftsul";
			ul3.style.display = "block";
			if(aoTblist !== undefined){
				$(strlisftset).appendTo(ul3);
			}
			$(strdivfts).appendTo(li2);
			$(ul3).appendTo(li2);
			$(li2).appendTo(ul);

			var li = document.createElement('li');
			li.className = "lft-oneli";
			//li.className = 
			var ul2 = document.createElement("ul");
			ul2.className = "lft-dbul";
			ul2.style.display = "none";
			if(aoTblist !== undefined){
				$(strlis).appendTo(ul2);
			}
			$(strdiv).appendTo(li);
			$(ul2).appendTo(li);
			/*ul.appendChild(li);*/
			$(li).appendTo(ul);

			this.currentDbId = $('.lft-dbdiv').attr('data-ltid');
			this.currentDbqx = $('.lft-dbdiv').attr('data-qx');
			this.currentDbName = dbname;
			this.dbClick(dbname,this.currentDbId);

			//默认打开第一个属性表
			var inittbIdnode = $('.lft-ftsul').find('.lft-ftsli');
			if(inittbIdnode.length > 0){
				var inittbId = inittbIdnode.attr('data-ftid');
				var inittbResType = 'ftset';
				this.setSelTbinfo(inittbId,inittbResType);
				this.tbDblClick(inittbResType);
				this.tbClick(inittbResType);
			}
			this.openattrTbdiv();

			$('#ltbl-listdiv').perfectScrollbar('update');
		},

		tbClick: function (stype){
			//ftsinfo:{ftsId:'',ftsName:'',ftsalias:'',ftsqx:''},

			/*this.currentDbName = dbname;

			this.currentTbName = tbname;*/
			var params = {'dbname':this.currentDbName, 'dbid':this.currentDbId, 'tbname': this.currentTbName, 'tbrealname': this.currentTbRealName, 'tbid': this.currentTbId, 'tbqx': this.currentTbqx,'tbtype':this.curTabType,'dbqx':this.currentDbqx,'tbfilter':this.currentFilter};
			if(stype == 'ftset'){
				params.tbname = this.ftsinfo.ftsalias;
				params.tbrealname = this.ftsinfo.ftsName;
				params.tbid = this.ftsinfo.ftsId;
				params.tbqx = this.ftsinfo.ftsqx;
			}
			console.log(params)
			this.addCustomEvt._events.tbclick('tbclick',params,stype);
		},

		tbDblClick: function (type){
			
			var tbid,tbrealname,tbqx;
			if(type == 'ftset'){
				tbid = this.ftsinfo.ftsId;
				tbrealname = this.ftsinfo.ftsName;
				tbqx = this.ftsinfo.ftsqx;
			}else{
				tbid = this.currentTbId;
				tbrealname = this.currentTbRealName;
				tbqx = this.currentTbqx;
			}
			this.addCustomEvt._events.dblclick(tbid, tbrealname, tbqx);
		},

		dbClick: function (dbname,dbid){
			this.currentDbName = dbname;
			this.currentDbId = dbid;
			var params = {'dbname':dbname, 'dbid': dbid, 'dbqx':this.currentDbqx};
			this.addCustomEvt._events.dbclick('dbclick', params);
		},

		removeTb: function (dbid, tbid){
			$('.lft-dbdiv').filter(function (){
				if($(this).attr('data-ltid') === dbid){
					$(this).next().children('li').filter(function (){
						if($(this).attr('data-ltid') == tbid){
							$(this).remove();
						}
					});
				}
			});
			var aTmptbids = this.allTbsid;
			var index = -1;
			for(var i = 0, len = aTmptbids.length; i < len; i++){
				if(aTmptbids[i] == tbid){
					index = i;
				}
			}
			this.allTbsid.splice(index,1);
			this.allTbs.splice(index,1);
		},

		removeDb: function (dbid,dbname){
			$('.lft-dbdiv').filter(function (){
				if($(this).attr('data-ltid') === dbid){
					$(this).parent().remove();
				}
			});
			/*var flag = this.getArrIndex(this.allOpenDbid, dbid);
			this.allOpenDb.splice(flag,1);
			this.allOpenDbid.splice(flag,1);*/
			//this.datareset();

			this.addCustomEvt._events.removedb(dbid, dbname);

			this.datareset();
			//this.tbClick('clearall');
			this.tbClick('tb');
		},

		addtb: function (dbid,tbname,tbid,tbrealname,sharetype,tbtype){
			if(tbtype === 'tb'){
				var editclass = "lft-edit edit"+sharetype;
				var relateclass = "lft-relative relate"+sharetype;
				var str = "<li class='lft-tbli' data-ltid="+ tbid +" data-tbreal="+ tbrealname +" data-qx="+sharetype+" data-filter=''><div class='lft-tbicon'></div><div class='lft-tbnamediv' title="+"'"+tbname+"'"+">" + tbname + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div><div class="+"'"+relateclass+"'"+" title='关联地图'></div><li>";
				$(str).appendTo($('.lft-dbul'));

				this.allTbsid.push(tbid);
				this.allTbs.push(tbname);
			}else{
				var editclass = "lft-edit edit"+sharetype;
				var relateclass = "lft-relative relate"+sharetype;
				var str = "<li class='lft-ftsli' data-ftid="+ tbid +" data-ftsreal=f_"+ tbrealname +" data-qx="+sharetype+" data-filter=''><div class='lft-ftsicon'></div><div class='lft-ftsnamediv' title="+"'"+tbname+"'"+">" + tbname + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div><li>";
				$(str).appendTo($('.lft-ftsul'));

				this.allftsid.push(tbid);
				this.allfts.push(tbname);
				this.allftsreal.push('f_'+tbrealname);
			}
		},

		addtbs: function (dbid,tbidarr,tbrealarr,tbaliasarr,tbsharearr){
			var strlis= '';
			for(var i = 0, len = tbidarr.length; i < len; i++){
				this.allTbs.push(tbaliasarr[i]);
				this.allTbsid.push(tbidarr[i]);

				var editclass = "lft-edit edit" + tbsharearr[i];
				var relaclass = "lft-relative relate" + tbsharearr[i];
				strlis = strlis + "<li class='lft-tbli' data-ltid="+ tbidarr[i] +" data-tbreal="+ tbrealarr[i] +" data-qx="+tbsharearr[i]+" data-filter=''><div class='lft-tbicon'></div><div class='lft-tbnamediv' title="+tbaliasarr[i]+">" + tbaliasarr[i] + "</div><div class="+"'"+editclass+"'"+" title='编辑'></div><div class="+"'"+relaclass+"'"+" title='关联地图'></div><li>";
			}
			$(strlis).appendTo($('.lft-dbul'));
		},

		getArrIndex: function (arr,dbname){
			for(var i = 0, l = arr.length; i < l; i++){
				if(arr[i] === dbname){
					return i;
				}
			}
			return -1;
		},

		datareset:function (){
			this.currentTbName = "";

			this.currentDbName = "";

			this.currentTbRealName = "";

			this.currentTbId = "";

			this.currentDbId = "";

			this.curTabType = "";

			this.currentTbqx = "";

			this.currentDbqx = '';

			ftsinfo = {ftsId:'',ftsName:'',ftsalias:'',ftsqx:''};
		},

		operatetbdiv: function (jqele){
			if(jqele.attr('data-open') === 'no'){
				jqele.css('background',"center url(modules/tablelist/imgs/zhankai.png) no-repeat");
				jqele.parent().next().css('display','block');
				jqele.attr('data-open','yes');
			}else{
				jqele.css('background',"center url(modules/tablelist/imgs/shouqi.png) no-repeat");
				jqele.parent().next().css('display','none');
				jqele.attr('data-open','no');
			}

			$('#ltbl-listdiv').perfectScrollbar('update');
		},

		setSelTbinfo: function (tbid,tbrestype){
			var self = this;

			$('.lft-ftsnamediv').css('background','#fff').css('color','#000');
			$('.lft-tbnamediv').css('background','#fff').css('color','#000');
		
			if(tbrestype == 'ftset'){
				this.curTabType = 'ftset';
				$('.lft-ftsli').each(function (){
					if($(this).attr('data-ftid') == tbid){
						self.ftsinfo.ftsId = tbid;
						self.ftsinfo.ftsName = $(this).attr('data-ftsreal');
						self.ftsinfo.ftsalias = $(this).find('.lft-ftsnamediv').text();
						self.ftsinfo.ftsqx = $(this).attr('data-qx');
						self.currentFilter = $(this).attr('data-filter');
						if( typeof self.currentFilter=='undefined'){
							self.currentFilter = '';
						}
						$(this).find('.lft-ftsnamediv').css('background','rgb(68, 142, 216)').css('color','#fff');
						$(this).css('border-left','5px solid #F09932');
					}
				})
			}else if(tbrestype == 'tb'){
				this.curTabType = 'tb';
				$('.lft-tbli').each(function (){
					if($(this).attr('data-ltid') == tbid){
						self.currentTbId = tbid;
						self.currentTbName = $(this).find('.lft-tbnamediv').text();
						self.currentTbRealName = $(this).attr('data-tbreal');
						self.currentTbqx = $(this).attr('data-qx');
						self.currentFilter = $(this).attr('data-filter');
						if( typeof self.currentFilter=='undefined'){
							self.currentFilter = '';
						}
						$(this).find('.lft-tbnamediv').css('background','rgb(68, 142, 216)').css('color','#fff');
						$(this).css('border-left','5px solid #F09932');
					}
				});
			}
		},

		openStaticTbdiv: function (){
			$('.lft-ftsul').css('display','none');
			$('.lft-dbul').css('display','block');
			var tmp = $('.lft-dbul').prev().find('.lft-arrow');
			console.log(tmp)
			tmp.attr('data-open','yes');
			tmp.css('background',"center url(modules/tablelist/imgs/zhankai.png) no-repeat");
			$('.lft-ftsul').prev().find('.lft-arrow').attr('data-open','no');
		},

		openattrTbdiv: function (){
			$('.lft-dbul').css('display','none');
			$('.lft-ftsul').css('display','block');

			var tmp = $('.lft-ftsul').prev().find('.lft-arrow');
			tmp.attr('data-open','yes');
			tmp.css('background',"center url(modules/tablelist/imgs/zhankai.png) no-repeat");
			$('.lft-dbul').prev().find('.lft-arrow').attr('data-open','no');
		},
		/*hideEditLogo: function (){
			$('.lft-edit').css('background','-4px -222px url(/mapb/tablemgr/common/imgs/mapb_table.png) no-repeat')
		},*/

		cancelAllEditingLogo: function (){
			$('.lft-edit').each(function (){
				if($(this).hasClass('edit1')){
					return;
				}else{
					$(this).css('background','-4px -222px url(/mapb/tablemgr/common/imgs/mapb_table.png) no-repeat');
				}
			});
			$('.lft-edit').filter(function (){
				if($(this).hasClass('tbediting')){
					$(this).removeClass('tbediting');
				}
			});
		},

		addCustomEvt: {
			_events:{},
			on: function (evtname,callback){
				switch (evtname){
					case 'tbclick':
					this._events.tbclick = callback;
					break;

					case 'dbclick':
					this._events.dbclick = callback;

					case 'dblclick':
					this._events.dblclick = callback;

					case 'removedb':
					this._events.removedb = callback;

					case 'destorytb':
					this._events.destorytb = callback;

					case 'relate':
					this._events.relate = callback;

					case 'edit':
					this._events.edit = callback;

					case 'listTopTool':
					this._events.listTopTool = callback;
					break;

					case 'canceledit':
					this._events.canceledit = callback;
					break;
				}

			}
		},

		clearDisplayData: function (){
			this.addCustomEvt._events.destorytb();
		},	
	};
//点击表空间名打开关闭的小图标
	/*$('#ltbl-list').on('click','.lft-arrow',function (){
		if($(this).attr('data-open') === 'no'){
			$(this).css('background',"center url(modules/tablelist/imgs/zhankai.png) no-repeat");
			$(this).parent().next().css('display','block');
			$(this).attr('data-open','yes');
		}else{
			$(this).css('background',"center url(modules/tablelist/imgs/shouqi.png) no-repeat");
			$(this).parent().next().css('display','none');
			$(this).attr('data-open','no');
		}

		
		var that = $(this);
		tableListMod.operatetbdiv(that);
		//$('#ltb-list').perfectScrollbar('update');
	});*/
//单击表格标签
	$('#ltbl-list').on('click','.lft-tbnamediv,.lft-tbicon',function (){

		//$(this).css('background','blue');
		$('.lft-ftsnamediv').css('background','#fff').css('color','#000');

		$('.lft-tbnamediv').css('background','#fff').css('color','#000');

		if($(this).hasClass('lft-tbnamediv')){
			$(this).css('background','rgb(68, 142, 216)').css('color','#fff');
		}else{
			$(this).next().css('background','rgb(68, 142, 216)').css('color','#fff');
		}

		//$(this).parent('.lft-tbli').css('border-right','5px solid #F09932');

		//$('.lft-ftsli').css('border-right','5px solid #FFF');

		var tbname = $(this).text();

		if(tbname == '' || tbname == undefined){

			tbname= $(this).next().text();

		}

		//var dbname = $('.lft-dbdiv').first().attr('data-dbname');

		//var dbname = $(this).
		var t = $(this).parent('.lft-tbli');

		if(t.attr('data-ltid') == tableListMod.currentTbId && tableListMod.curTabType == 'tb'){
			return;
		}

		tableListMod.currentTbId = t.attr('data-ltid');

		tableListMod.currentTbRealName = t.attr('data-tbreal');

		tableListMod.currentTbqx = t.attr('data-qx');

		//tableListMod.currentDbId = $(this).parent().parent().prev().attr('data-ltid');

		//tableListMod.currentDbName = dbname;
		var tmpfilter = t.attr('data-filter');

		if(typeof tmpfilter == 'undefined'){
			tmpfilter = '';
		}

		tableListMod.currentFilter = tmpfilter;

		tableListMod.currentTbName = tbname;

		tableListMod.curTabType = 'tb';

		//console.log(tableListMod.currentTbId,tableListMod.currentDbId);
		tableListMod.tbClick('tb');
	});

	$('#ltbl-list').on('click','.lft-ftsnamediv,.lft-ftsicon',function (){

		$('.lft-ftsnamediv').css('background','#fff').css('color','#000');

		$('.lft-tbnamediv').css('background','#fff').css('color','#000');

		if($(this).hasClass('lft-ftsnamediv')){
			$(this).css('background','rgb(68, 142, 216)').css('color','#fff');
		}else{
			$(this).next().css('background','rgb(68, 142, 216)').css('color','#fff');
		}

		//$('.lft-ftsli').css('border-right','5px solid #fff');

		//$(this).parent('.lft-ftsli').css('border-right','5px solid #F09932');

		//$('.lft-tbli').css('border-right','5px solid #FFF');

		var ftsname = $(this).text();

		if(ftsname == '' || ftsname == undefined){

			ftsname= $(this).next().text();

		}

		//var dbname = $('.lft-dbdiv').first().attr('data-dbname');

		//var dbname = $(this).
		var t = $(this).parent('.lft-ftsli');

		if(tableListMod.ftsinfo.ftsId == t.attr('data-ftid') && tableListMod.curTabType == 'ftset'){
			return;
		}
		//ftsinfo:{ftsId:'',ftsName:'',ftsalias:'',ftsqx:''}
		tableListMod.ftsinfo.ftsId = t.attr('data-ftid');

		tableListMod.ftsinfo.ftsName = t.attr('data-ftsreal');

		tableListMod.ftsinfo.ftsqx = t.attr('data-qx');

		var tmpfilter = t.attr('data-filter');

		if(typeof tmpfilter == 'undefined'){
			tmpfilter = '';
		}
		console.log(tmpfilter)
		tableListMod.currentFilter = tmpfilter;

		tableListMod.ftsinfo.ftsalias = ftsname;

		//tableListMod.currentDbId = $('.lft-dbdiv').attr('data-ltid');

		//tableListMod.currentDbName = dbname;

		tableListMod.curTabType = 'ftset';

		//console.log(tableListMod.currentTbId,tableListMod.currentDbId);
		tableListMod.tbClick('ftset');
	});
//双击表格标签
	$('#ltbl-list').on('dblclick','.lft-tbnamediv,.lft-tbicon',function (){
		$('.lft-ftsli').css('border-left','5px solid #fff');

		$('.lft-tbli').css('border-left','5px solid #fff');

		$(this).parent('.lft-tbli').css('border-left','5px solid #F09932');

		if($(this).hasClass('lft-tbnamediv')){
			$(this).css('background','rgb(68, 142, 216)').css('color','#fff');
		}else{
			$(this).next().css('background','rgb(68, 142, 216)').css('color','#fff');
		}

		var tbname = $(this).text();

		if(tbname == '' || tbname == undefined){

			tbname= $(this).next().text();

		}

		//var dbname = $('.lft-dbdiv').first().attr('data-dbname');

		//var dbname = $(this).
		var t = $(this).parent('.lft-tbli');

		tableListMod.curTabType = 'tb';

		var tbid = tableListMod.currentTbId = t.attr('data-ltid');

		var tbrealname = tableListMod.currentTbRealName = t.attr('data-tbreal');

		var tbqxtmp = tableListMod.currentTbqx = t.attr('data-qx');

		var tmpfilter = t.attr('data-filter');

		if(typeof tmpfilter == 'undefined'){
			tmpfilter = '';
		}

		tableListMod.currentFilter = tmpfilter;

		//tableListMod.currentDbId = $(this).parent().parent().prev().attr('data-ltid');

		//tableListMod.currentDbName = dbname;

		tableListMod.currentTbName = tbname;

		//console.log(tableListMod.currentTbId,tableListMod.currentDbId);
		tableListMod.tbClick('tb');

		tableListMod.tbDblClick('tb');
	});


	$('#ltbl-list').on('dblclick','.lft-ftsnamediv,.lft-ftsicon',function (){

		$('.lft-tbli').css('border-left','5px solid #fff');

		$('.lft-ftsli').css('border-left','5px solid #fff');

		$(this).parent('.lft-ftsli').css('border-left','5px solid #F09932');

		if($(this).hasClass('lft-ftsnamediv')){
			$(this).css('background','rgb(68, 142, 216)').css('color','#fff');
		}else{
			$(this).next().css('background','rgb(68, 142, 216)').css('color','#fff');
		}

		var tbname = $(this).text();

		if(tbname == '' || tbname == undefined){

			tbname= $(this).next().text();

		}

		//var dbname = $('.lft-dbdiv').first().attr('data-dbname');

		//var dbname = $(this).

		var t = $(this).parent('.lft-ftsli');
		//ftsinfo:{ftsId:'',ftsName:'',ftsalias:'',ftsqx:''}
		tableListMod.ftsinfo.ftsId = t.attr('data-ftid');

		tableListMod.ftsinfo.ftsName = t.attr('data-ftsreal');

		tableListMod.ftsinfo.ftsqx = t.attr('data-qx');

		tableListMod.ftsinfo.ftsalias = tbname;

		var tmpfilter = t.attr('data-filter');

		if(typeof tmpfilter == 'undefined'){
			tmpfilter = '';
		}

		tableListMod.currentFilter = tmpfilter;
		//tableListMod.currentDbId = $('.lft-dbdiv').attr('data-ltid');

		//tableListMod.currentDbName = dbname;

		tableListMod.curTabType = 'ftset';

		/*var t = $(this).parent('.lft-tbli');

		var tbid = tableListMod.currentTbId = t.attr('data-ltid');

		var tbrealname = tableListMod.currentTbRealName = t.attr('data-tbreal');

		var tbqxtmp = tableListMod.currentTbqx = t.attr('data-qx');

		tableListMod.currentDbId = $(this).parent().parent().prev().attr('data-ltid');*/

		//console.log(tableListMod.currentTbId,tableListMod.currentDbId);
		tableListMod.tbClick('ftset');

		tableListMod.tbDblClick('ftset');
	});
//点击表空间名
	$('#ltbl-list').on('click','.lft-dbdiv',function (){

		var DbId = $(this).attr('data-ltid');

		var dbname  = $('.lft-dbdiv').first().attr('data-dbname');

		tableListMod.dbClick(dbname,DbId);

		var that = $(this).find('.lft-arrow');

		tableListMod.operatetbdiv(that);
	});

	//关联数据
	$('#ltbl-list').on('click','.relate2,.relate3,.relate4',function (){
		var linode = $(this).parent('li');

		var tbid = linode.attr('data-ltid');

		var tbrlname = linode.attr('data-tbreal');

		var tbqx = linode.attr('data-qx');

		var dbdivnode = linode.parent('ul').prev('.lft-dbdiv');

		var dbid = dbdivnode.attr('data-ltid');

		var tbname = $(this).prev().prev().text();



		var tmpallfts = tableListMod.allfts;
		var tmpallftsid = tableListMod.allftsid;
		var tmpallftsreal = tableListMod.allftsreal;

		tableListMod.addCustomEvt._events.relate(dbid,tbid,tbname,tbrlname,tmpallfts,tmpallftsid,tmpallftsreal);
	});
//点击编辑按钮
	$('#ltbl-list').click(function (evt){
		var e=event || window.event;
  		var obj=e.target || e.srcElement;
  		if($(obj).hasClass('tbediting')){
  			tableListMod.addCustomEvt._events.canceledit();
  		}else{

			if($(obj).hasClass('edit2') || $(obj).hasClass('edit3') || $(obj).hasClass('edit4')){
				var linode = $(obj).parent('li');

				//var tbid = linode.attr('data-ltid');

				//var tbrlname = linode.attr('data-tbreal');

				//var tbqx = linode.attr('data-qx');

				var dbdivnode = linode.parent('ul').prev('.lft-dbdiv');

				//var dbid = dbdivnode.attr('data-ltid');

				var tbname = $(obj).prev().text();

				if(linode.hasClass('lft-ftsli')){
					if(linode.attr('data-ftid') !== currentTbId){
						
						tableListMod.ftsinfo.ftsId = linode.attr('data-ftid');;

						tableListMod.ftsinfo.ftsName = linode.attr('data-ftsreal');

						tableListMod.ftsinfo.ftsqx = linode.attr('data-qx');

						tableListMod.ftsinfo.ftsalias = tbname;

						var tmpfilter = linode.attr('data-filter');

						if(typeof tmpfilter == 'undefined'){
							tmpfilter = '';
						}
						tableListMod.currentFilter = tmpfilter;
						//tableListMod.currentDbId = dbid;

						//tableListMod.currentDbName = ;

						tableListMod.curTabType = 'ftset';

						tableListMod.tbClick('ftset');

						//tableListMod.tbDblClick('ftset');
					}
				}else{
					if(linode.attr('data-ltid') !== currentTbId){
						tableListMod.curTabType = 'tb';

						tableListMod.currentTbId = linode.attr('data-ltid');

						tableListMod.currentTbRealName = linode.attr('data-tbreal');

						tableListMod.currentTbqx = linode.attr('data-qx');

						var tmpfilter = linode.attr('data-filter');

						if(typeof tmpfilter == 'undefined'){
							tmpfilter = '';
						}
						tableListMod.currentFilter = tmpfilter;
						//tableListMod.currentDbId = dbid;

						//tableListMod.currentDbName = ;
						tableListMod.currentTbName = tbname;

						//console.log(tableListMod.currentTbId,tableListMod.currentDbId);
						tableListMod.tbClick('tb');

						//tableListMod.tbDblClick('tb');
					}
				}

				/*$('.lft-edit').css('background','-4px -222px url(/mapb/tablemgr/common/imgs/mapb_table.png) no-repeat')
				$('.lft-edit').filter(function (){
					if($(this).hasClass('tbediting')){
						$(this).removeClass('tbediting');
					}
				});*/
				tableListMod.cancelAllEditingLogo();
				$(obj).css('background','-4px -198px url(/mapb/tablemgr/common/imgs/mapb_table.png) no-repeat');

				$(obj).addClass('tbediting');

				$('.lft-tbnamediv').css('background','#fff').css('color','#000');
				$('.lft-ftsnamediv').css('background','#fff').css('color','#000');
				$(obj).prev().css('background','rgb(68, 142, 216)').css('color','#fff');

				//obj.style.background = '-4px -198px url(/mapb/tablemgr/common/imgs/mapb_table.png) no-repeat;'
				tableListMod.addCustomEvt._events.edit();
			}
		}
	});

	//上方工具栏
	$('.lyrctrl_toolImg').click(function (){
		var type = $(this).children('span').attr('id');
		tableListMod.addCustomEvt._events.listTopTool(type);
	})

	$('#ltbl-listdiv').perfectScrollbar();


	module.exports = tableListMod;
})