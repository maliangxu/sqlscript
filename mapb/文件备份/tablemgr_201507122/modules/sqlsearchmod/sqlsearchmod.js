define(function (require, exports, module){

	var _opentablemod = require('tableview/opentable');

	var sqlsearchmod2 = {
		allfids: [],
		init: function (username,tbrealname){
			var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}

			this.show();
			this.username = username;
			//this.sqldtable = null;
			this.tbrealname = tbrealname;
			this.fieldstmp = _opentablemod.fields_tmp;
			this.fieldtype = _opentablemod.fields_type;
			this.fieldalias = _opentablemod.fields_alias;
			this.fieldunit = _opentablemod.fields_unit;
			this.tbinitfilter = _opentablemod.tbinitfilter;
			this.tballdatas = [];
			

			this.queryfields = this.fieldalias;
			this.querywhere = '';
			this.fieldSearch = this.fieldstmp;
			this.fldUnitSearch = this.fieldunit;
			this.fldTypeSearch = this.fieldtype;

			this.initcreateZdlist('ros-selzd');
			this.createChoseZd('ros-allfields');

			this.selectedTrs = [];
		},

		datareset: function (){
			this.queryfields = [];
			this.querywhere = '';
			this.fieldSearch = [];
			this.fldUnitSearch = [];
			this.fldTypeSearch = [];
		},

		ifHasShow: function (){
			if($('.ros-search').css('display') == 'block'){
				return true;
			}
			return false;
		},

		initcreateZdlist: function (selclass){
			var self = this;
			$('.'+selclass).empty();
			$('#ros-filterbody tr').filter(function (){
				if($(this).attr('id') !== 'ros-onlyone'){
					$(this).remove(); 
				}
			});
			$('.'+selclass).each(function (){
				var zwfields = self.fieldstmp;
				var ywfields = self.fieldalias;
				$('<option value="">请选择字段</option>').appendTo($('.'+selclass))
				for(var i = 0, len = zwfields.length; i < len; i++){
					var option = document.createElement('option');
					option.innerHTML = zwfields[i];
					option.value = ywfields[i];
					$(option).appendTo($('.'+selclass));
				}
			});
		},

		createZdlist: function (selclass){
			var self = this;
			$('.'+selclass).each(function (){
				if($(this).children('option').length<1){
					var zwfields = self.fieldstmp;
					var ywfields = self.fieldalias;
					$('<option value="">请选择字段</option>').appendTo($(this))
					for(var i = 0, len = zwfields.length; i < len; i++){
						var option = document.createElement('option');
						option.innerHTML = zwfields[i];
						option.value = ywfields[i];
						$(option).appendTo($(this));
					}
				}
			});
			//$('.'+selclass).empty();
		},

		createChoseZd: function (ulid){
			$('#'+ulid).empty();
			var zwfields = this.fieldstmp;
			var ywfields = this.fieldalias;
			var unitfield = this.fieldunit;
			var typefield = this.fieldtype;

			var doc = document;
			var sel = doc.getElementById(ulid);
			for(var i= 0, l = zwfields.length; i < l; i++){
				var li = doc.createElement('li');
				li.className = 'ros-zli';
				var check = doc.createElement('input');
				check.type = 'checkbox';
				check.name = 'ros-zdcheck';
				check.className = 'ros-zdptclas';
				check.id = 'ros-zdcheck'+i;
				check.checked = true;
				check.setAttribute('data-realzd',ywfields[i]);
				check.setAttribute('data-unit',unitfield[i]);
				check.setAttribute('data-type',typefield[i]);
				var label = doc.createElement('label');
				label.setAttribute('for','ros-zdcheck'+i);
				label.innerHTML = zwfields[i];
				label.title = zwfields[i];
				li.appendChild(check);
				li.appendChild(label);
				sel.appendChild(li);
			}
			var li1 = doc.createElement('li');
			li1.className = 'ros-zli1';
			//li1.setAttribute('data-realzd',ywfields[i]);
			var check1 = doc.createElement('input');
			check1.type = 'checkbox';
			check1.name = 'ros-zdcheck';
			check1.className = 'ros-zdptclas2';
			check1.id = 'ros-zdcheckall';
			check1.checked = true;
			var label1 = doc.createElement('label');
			label1.setAttribute('for','ros-zdcheckall');
			label1.innerHTML = '全选';
			label1.style.fontWeight = 'bold';
			li1.appendChild(check1);
			li1.appendChild(label1);
			sel.appendChild(li1);
		},

		addrow: function (ele){
			$('<tr><td><select class="ros-selzd"></select></td><td><select name="" class="ros-zf"><option value="">运算符</option><option value=">">&gt;</option><option value=">=">&ge;</option><option value="<">&lt;</option><option value="<=">&le;</option><option value="=">=</option><option value="<>">&ne;</option></select></td><td><input type="text" class="ros-zhi" placeholder="请输入值"></td><td class="roshqf"><select class="ros-tjian"><option value="and">并且</option><option value="or">或者</option></select></td><td class="ros-minus">删除</td></tr>').insertBefore($(ele).parent());

			this.createZdlist('ros-selzd');
		},

		delrow: function (ele){
			if($(ele).parent().attr('id')=='ros-onlyone'){
              return;
          	}
          	$(ele).parent().remove();
		},

		storecheckedval: function (){
			this.fieldSearch = [];

			this.fldUnitSearch = [];

			this.fldTypeSearch = [];

			this.queryfields = this.getFieldstr();	
		},

		queryBycon: function (){
			this.querywhere = '';

			var tmpfields = this.fieldstmp;

			var tmpalias = this.fieldalias;

			var tmpunit = this.fieldunit;

			var tableName = this.tbrealname;

			var sQrywhere = this.querywhere = this.getfilter();

			var qry_conrealfield = this.fieldSearch;

			var qry_conunit = this.fldUnitSearch;

			var aqryfld = this.queryfields;
			if(qry_conrealfield.length == 0){
				alert('查询字段不能为空！');
				return;
			}
//console.log(sQrywhere)
			//this.operateSql(qryfld, sQrywhere, tmpfields, tmpalias, tmpunit);
			_opentablemod.tableHeadDisplay('rtvt-sqltbhead',qry_conrealfield,qry_conunit);
			this.getTableAllData(tableName, aqryfld, sQrywhere);
		},

		getTableAllData: function (tableName, fields, filters){
			var self = this;
			var copyfields = zhtoolUtil.cloneobj2(fields);
			for(var kk = 0, leng2 = copyfields.length; kk < leng2; kk++){
				copyfields[kk] = '[' + copyfields[kk] + ']';
			}
			var flds = copyfields.join(',');
			var usrname = this.username;
			var path = 'mapb.tablemgr.getalldata';
			var options = {
				"username": usrname,
				"field": flds,
				"tablename":tableName
			};
			if(filters !== ''){
				options.scriptname = path + ".getalldata";
				options.filter = filters;
			}else{
				options.scriptname = path + ".nofilterdata";
			}
			var params = {req: JSON.stringify(options)};
			var url = gEcnu.config.geoserver+"websqlscript";

			$.ajax({
				url:url,
				data:params,
				type:'POST',
				async:false,
				success: function (msg){
					
					self.hide();
					self.tableshow();
					//console.log(msg)
					var jmsg = JSON.parse(msg);
					var datas = jmsg.Query_2.data;
					self.allfids = jmsg.Query_3.data;
					self.tballdatas=[];
					self.tballdatas = datas;
					//console.log(datas);

					self.createTable(datas,self);
					
					self.goback();
					$('#rtvt-sqldata_wrapper').css('width',$('#rtvt-sqldata').css('width'));
					$('.rtv-sqltbdata').perfectScrollbar();
				},
				error: function (){
					alert('请求数据失败！');
				}	
			});
		},

		destroySqlTb: function (){
			if($.fn.dataTable.isDataTable('#rtvt-sqldata')){
				that.sqldtable.destroy();
    			//that.sqldtable.fnClearTable(false);
	        	//that.sqldtable.fnDestroy();
	        	$('#rtvt-sqldata tbody').empty();
			}
			$('#rtvt-sqltbhead').empty();
		},

		createTable: function (datas,that){
			var self = this;
			for(var i = 0, len = datas.length; i < len; i++){
				for(var j = 0, len2 = datas[i].length; j < len2; j++){
					if(datas[i][j] == "null"){
						datas[i][j] = "";
					}
				}
			}
			if($.fn.dataTable.isDataTable('#rtvt-sqldata')){
				that.sqldtable.destroy();
    			//that.sqldtable.fnClearTable(false);
	        	//that.sqldtable.fnDestroy();
	        	$('#rtvt-sqldata tbody').empty();
			}

	    	console.log(datas);
	    	console.log(that.fieldSearch);
			that.sqldtable=$('#rtvt-sqldata').DataTable({
			  	//"bDestroy":true,
			  	"iDisplayLength":15,
			  	"bPaginate": true, //翻页功能
				"bLengthChange": true, //改变每页显示数据数量
				"bFilter": false, //过滤功能
				"bSort": false, //排序功能
				"bInfo": true,//页脚信息
				"bAutoWidth": true,//自动宽度,false后就可以根据具体的列设定宽度

				"sPaginationType": "full_numbers",//显示所有的翻页信息
				"oLanguage": {
				"sLengthMenu": "每页显示 _MENU_条",
				"sZeroRecords": "没有找到符合条件的数据",
				"sProcessing": "&lt;img src=’./loading.gif’ /&gt;",
				"sInfo": "当前第 _START_ - _END_ 条　共计 _TOTAL_ 条",
				"sInfoEmpty": "没有记录",
				"sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
				"sSearch": "搜索：",
				"oPaginate": {
					"sFirst": "首页",
					"sPrevious": "前一页",
					"sNext": "后一页",
					"sLast": "尾页"
					}
				},
			    'data':datas,
				"sDom": 'l<"clear">tTirp',
				"fnDrawCallback": function( oSettings ) {
					//console.log(oSettings)
      				_opentablemod.reWriteData('rtvt-sqldata');

      				var setrs = self.selectedTrs;
      				self.bindchooseClickEvt('rtvt-sqldata',setrs);

      				$('#rtvt-sqldata tbody tr').filter(function (){
						var seltrs2 = self.selectedTrs;
						for(var q = 0, leng = seltrs2.length; q < leng; q++){
							if($(this).attr('fieldid') == seltrs2[q].attr('fieldid')){
								$(this).css('background','#93D7FB');
								$(this).addClass('row_selected');
							}
						}
					});
    			}
			});
		},

		bindchooseClickEvt: function(tableID,selTrs){
			var self = this;
	      //var selTrs = this.selectedTrs;
		  $("#"+tableID+" td:first-child").unbind('click');
		  $("#"+tableID+" td:first-child").click( function(e) {
		    if ( $(this).parent().hasClass('row_selected') ) {

		      if(zhtoolUtil.ifctrl(e)){ 
		        var selectRows_len = selTrs.length;
		        var tmprow_out=$(this).parent().attr('TrID');
		        for(var i=0;i<selectRows_len;i++){
		                var tmprow=$(selTrs[i]).attr('TrID');
		                if(tmprow_out == tmprow){
		                  selTrs.splice(i,1);
		                  break;
		                }
		        }

		        $(this).parent().removeClass('row_selected');

		      }else{
		      	
		        $("#"+tableID + ' tr').removeClass('row_selected');
		        selTrs=[];//选中数据行
		        self.selectedTrs = selTrs;
		      }
		    }else {
			    if(zhtoolUtil.ifctrl(e)){
		            $(this).parent().addClass('row_selected');
		            var trEle=$(this).parent();
		            selTrs.push(trEle);
		            self.selectedTrs = selTrs;

			    }else{
		            $("#"+tableID+' tr').removeClass('row_selected');
		            selTrs=[];//选中数据行
		            $(this).parent().addClass('row_selected');
		            var trEle=$(this).parent();
		            selTrs.push(trEle);
		            console.log(trEle)
		            var len = self.selectedTrs;
		            self.selectedTrs = selTrs;

			    }
		    }
		  });
		},

		goback: function (){
			var tmpfields = this.fieldstmp;
			var tmpalias = this.fieldalias;
			var tmpunit = this.fieldunit;
			var realname = this.tbrealname;
			var self = this;
			var doc = document;
			var _gobak = doc.getElementById('rtvt-sqldata_wrapper');
			//var _spand = doc.getElementById('tb-fanhui');
			if($('#tb-fanhui').length < 1 && _gobak){
				var span = doc.createElement('span');
				span.innerHTML = '返回';
				span.id = 'tb-fanhui';
				span.style.cursor = 'pointer';
				span.style.textDecoration = 'underline';
				span.style.position = 'absolute';
				span.style.right = "10px"
				span.style.top = "0px";
				_gobak.appendChild(span);
			}
			
			setTimeout(function (){
				var tmpdiv = document.getElementById('rtvt-sqldata_wrapper');
				var _d = document.getElementById('tb-fanhui');
				_d.onclick = function (){
					_d.innerHTML = '';
					tmpdiv.removeChild(_d);

					self.tablehide();
					self.datareset();
				}
			},100)
		},

		getFieldstr: function (){
			//this.queryfields = [];
			var fieldarr = [];
			var tmpfld = [];
			var tmpfldunit = [];
			var tmpfldtype = [];
			$('.ros-zdptclas').filter(function (){
				if($(this).prop('checked')){
					fieldarr.push($(this).attr('data-realzd'));
					tmpfld.push($(this).next().text());
					tmpfldunit.push($(this).attr('data-unit'));
					tmpfldtype.push($(this).attr('data-type'));
				}
			});
			this.fieldSearch = tmpfld;
			this.fldUnitSearch = tmpfldunit;
			this.fldTypeSearch = tmpfldtype;
			console.log(tmpfld,tmpfldunit)
			//this.queryfields = fieldarr;
			return fieldarr;
		},

		getfilter: function (){
			var self = this;
			if($('#ros-selzid').val() === '' || $('#ros-selfhao').val() == '' || $('#ros-val').val() == ''){
				return '';
			}
			var ifnull = false;
			$('.ros-zhi').filter(function (){
				if(ifnull){return;}
				if($(this).val() == ''){
					alert('查询条件不能有空!');
					$(this).focus();
					ifnull = true;
					return;
				}
			});
			if(ifnull){return;}
			var filter = '';
			var firstfilter = '';
			$('#ros-filterbody tr').each(function (){
				if($(this).attr('id') !== 'ros-onlyone'){
					var freal = $(this).find('.ros-selzd').val();
					var opt = $(this).find('.ros-zf').val();
					var val = $(this).find('.ros-zhi').val();
					var con = $(this).find('.ros-tjian').val();
					//var tmpconcat = freal + opt + "'" + val + "',";
					if(isNaN(parseInt(val))){
						var tmpconcat = " " + con + " " +freal + opt + "'" + val + "'";
					}else{
						var tmpconcat = " " + con + " " +freal + opt + val;
					}
					if(self.tbinitfilter !== ''){
						filter += tmpconcat+ 'and '+this.tbinitfilter;
					}else{
						filter += tmpconcat;
					}
				}else{
					var freal = $(this).find('.ros-selzd').val();
					var opt = $(this).find('.ros-zf').val();
					var val = $(this).find('.ros-zhi').val();
					if(isNaN(parseInt(val))){
						if(self.tbinitfilter !== ''){
							firstfilter = freal + opt + "'" + val + "' and "+this.tbinitfilter;
						}else{
							firstfilter = freal + opt + "'" + val + "'";
						}
						
					}else{
						if(self.tbinitfilter !== ''){
							firstfilter = freal + opt + val+ " and " + this.tbinitfilter;
						}else{
							firstfilter = freal + opt + val;
						}
					}	
				}	
			});
			var allfilter = firstfilter + filter;
			//filter = filter.substring(0, filter.length - 1);
			console.log(allfilter);
			return allfilter;
		},

		clearchoose: function (){
			$('#ros-filterbody tr').each(function (){
				if($(this).attr('id') != 'ros-onlyone'){
					$(this).remove();
				}
			});

			$('.ros-zhi').val('');
		},

		tableshow: function (){
			//$('#right-tbview').css('display','block');
			$('.rtv-sqltbdataout').nextAll().css('display','none');
			$('.rtv-sqltbdataout').prevAll().css('display','none');
			$('.rtv-sqltbdataout').css('display','block');
		},

		tablehide: function (){
			$('.rtv-sqltbdataout').css('display','none');
			_opentablemod.show();
		},

		hide: function (){
			//$('#right-opendbmap').css('display','none');
			$('.ros-search').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		show: function (){
			//$('#right-opendbmap').css('display','block');
			//$('#opemmap_pop').css('display','none');
			$('.ros-search').prevAll().css('display','none');
			$('.ros-search').nextAll().css('display','none');
			$('.ros-search').css('display','block');
		},
	}
//添加
	$('#ros-filterbody').click(function (evt){
		var e = event || window.event;
		var obj = e.target || e.srcElement;
		if(obj.className == 'ros-minus'){
			sqlsearchmod2.delrow(obj);
		}else if(obj.className == 'ros-add'){
			sqlsearchmod2.addrow(obj);
		}
	});
//选着字段弹出
	/*$('#ros-choosedzd').click(function (){
		$('#ros-fadiv').animate({height:'toggle'},'fast');
	});*/
	//////////
	$('#ros-chzdtit').click(function (){
		$('.ros-filter').css('display','none');
		$('#ros-fadiv').css('display','block');
		$(this).css('border-bottom','5px solid #F09932');
		$(this).prev().css('border-bottom','5px solid #fff');
		$('.ros-footbtn').css('display','none');
		$('.ros-footbtn2').css('display','block');
		//sqlsearchmod2.storecheckedval();
	});
	
	$('#ros-title').click(function (){
		$('#ros-fadiv').css('display','none');
		$('.ros-filter').css('display','block');
		$(this).css('border-bottom','5px solid #F09932');
		$(this).next().css('border-bottom','5px solid #fff');
		$('.ros-footbtn').css('display','block');
		$('.ros-footbtn2').css('display','none');
	});
//
	$('#ros-okzd').click(function(){
		/*$('#ros-fadiv').animate({height:'toggle'},'fast');*/
		/*$('#ros-fadiv').css('display','none');
		$('.ros-filter').css('display','block');
		$('#ros-title').css('border-bottom','5px solid #F09932');
		$('#ros-title').next().css('border-bottom','5px solid #fff');
		$('.ros-footbtn').css('display','block');
		$('.ros-footbtn2').css('display','none');*/
		sqlsearchmod2.storecheckedval();
		sqlsearchmod2.queryBycon();
	});
//全选全部选
	$('#ros-allfields').on('click','.ros-zdptclas2',function (){
		if($(this).prop('checked')){
			$('.ros-zdptclas').prop('checked',true);
		}else{
			$('.ros-zdptclas').prop('checked',false);
		}
		
	});

	//确定
	$('#ros-ok').click(function (){
		sqlsearchmod2.storecheckedval();
		sqlsearchmod2.queryBycon();
	});
	//取消
	$('#ros-cancel').click(function (){
		sqlsearchmod2.hide();
	});

	$('#ros-clear').click(function (){
		sqlsearchmod2.clearchoose();
	});

	$('#rtvt-sqldata').on('keydown','input',function (){
		if(event.which == 9 || event.keyCode == 9){
			$('.rtv-sqltbdata').perfectScrollbar('update');
		}
	});

	//$('.rtv-sqltbdata').perfectScrollbar();
	module.exports = sqlsearchmod2;
})