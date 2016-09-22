define(function (require, exports, module){

	var opentablemod = require('tableview/opentable');

	//var chartmod = require('tableview/chart');

	var sqlSearchMod = {

		sql_focus_Input:'rosm-displayfields',//获取焦点文本框的id

		dtable: null,

		tballdatas:[],

		init: function (username,tbrealname){
			this.sql_focus_Input = 'rosm-displayfields',
			this.username = username;
			this.show();
			this.dtable = opentablemod.dtable;
			this.tbrealname = tbrealname;
			this.fieldstmp = opentablemod.fields_tmp;
			this.fieldtype = opentablemod.fields_type;
			this.fieldalias = opentablemod.fields_alias;
			this.fieldunit = opentablemod.fields_unit;
			this.sql_displayFields(this.fieldstmp, this.fieldtype, this.fieldalias);
		},

		hide: function (){
			$('#right-opendbmap').css('display','none');	
		},
		show: function (){
			$('#right-opendbmap').css('display','block');
			$('#opemmap_pop').css('display','none');
			$('.ros-search').css('display','block');
			
		},
		//初始化生成sql查询的字段下拉框
		sql_displayFields: function (fields,fieldsT,fieldsV){
		  var self = this;
		  var fieldslen=fields.length;
		  var doc=document;
		  var tbody=doc.getElementById('fields_sql');
		  tbody.innerHTML="";
		  for(var i=0;i<fieldslen;i++){
		    var tmpField=fields[i];
		    var tmpFieldT=fieldsT[i];
		    var tmpFieldV=fieldsV[i];
		    if(i==0){
		       var trtmp=doc.createElement('tr');
		       trtmp.className="sql_tr_field";
		       trtmp.setAttribute('Field','*');
		       trtmp.setAttribute('FieldT','all');
		       trtmp.setAttribute('FieldV','all');
		       var tdtmp=doc.createElement('td');
		       tdtmp.innerHTML='*';
		       tdtmp.style.borderBottom="1px solid #e3e6ed";
		       tdtmp.style.textAlign = 'center';
		       tdtmp.style.width = '50%';
		       var tdtmp1=tdtmp.cloneNode(false);
		       tdtmp1.innerHTML='All';
		       tdtmp1.style.textAlign = 'center';
		       tdtmp1.style.width = '50%';
		       tdtmp1.style.borderBottom="1px solid #e3e6ed";
		       trtmp.appendChild(tdtmp);
		       trtmp.appendChild(tdtmp1);
		       tbody.appendChild(trtmp);
		    }
		    var tr=doc.createElement('tr');
		    tr.className="sql_tr_field";
		    tr.setAttribute('Field',tmpField);
		    tr.setAttribute('FieldT',tmpFieldT);
		    tr.setAttribute('FieldV',tmpFieldV);
		    var td=doc.createElement('td');
		    td.innerHTML=tmpField;
		    td.style.textAlign = 'center';
		    td.style.width = '50%';
		    td.style.borderBottom="1px solid #e3e6ed";
		    var td1=td.cloneNode(false);
		    td1.innerHTML=tmpFieldT;
		    td1.style.textAlign = 'center';
		    td1.style.width = '50%';
		    td1.style.borderBottom="1px solid #e3e6ed";
		    tr.appendChild(td);
		    tr.appendChild(td1);
		    tbody.appendChild(tr);
		  }
		  //使用事件委托为每一行绑定事件
		  tbody.ondblclick=function(event){
		     event=event?event:window.event;
		     var target=event.target||event.srcElement;
		     var parnode=target.parentNode;
		     if(parnode.tagName!="TR") return;
		     var fieldname=parnode.getAttribute('Field');
		     var inputele=document.getElementById(self.sql_focus_Input);
		     var curvalue=inputele.value;
		     if(curvalue==""){
		       inputele.value=fieldname;
		     }else{
		       inputele.value=curvalue+"，"+fieldname;
		     }
		     inputele.focus();
		     //setCursorPos(inputele);
		  }
		},
		//选择好查询字段，及查询条件后的查询
		/*
		*qryfields 字段输入框的输入字段  string
		*qrywhere  查询条件              string
		*tmpfields 中文字段名数组        []
		*tmpalias  别名数组              []
		*tmpunit   三维数组				 []
		*/
		operateSql: function (qryfields, qrywhere, tmpfields, tmpalias, tmpunit){
			console.log(qryfields,qrywhere)
			var qry_confields = [];
			var qry_conrealfield = [];
			var qry_conunit = [];
			if(qryfields.indexOf('*') >= 0 || qryfields == ""){
			    qry_confields = tmpalias;
			    qry_conrealfield = tmpfields;
			    qry_conunit = tmpunit;
			}else{
			    if(qryfields.indexOf('，') >= 0){
			        qry_confields = qryfields.split('，');
			    }else{
			        qry_confields.push(qryfields);
			    }

			    var qryfields_len = qry_confields.length;
			    for(var i = 0; i < qryfields_len; i++){
			        var tmpqryfield = qry_confields[i];
			        var fields_len = tmpfields.length;
			        for(var j=0; j < fields_len; j++){
			          if(tmpfields[j] == tmpqryfield){
			            qry_confields.splice(i, 1, tmpalias[j]);
			            qry_conrealfield.push(tmpfields[j]);
						qry_conunit.push(tmpunit[j]);

			          }
			        }
			     }
			}

			if(qry_confields[0]!="fid"){
			    qry_confields.unshift('fid');
			    qry_conrealfield.unshift('fid');
			    qry_conunit.unshift('');
			}

			var tableName = this.tbrealname;
			var dBaseName = 'mapb';
			var fields = qry_confields;
			var filters = "";
			var aQryfilters = [];
			if(qrywhere.indexOf('，')>=0){
			    aQryfilters = qrywhere.split('，');
			}else if(qrywhere != ""){
			    aQryfilters.push(qrywhere);
			}
			var filter_len=aQryfilters.length;
			for(var k=0; k < filter_len; k++){
			    var tmpfilter = aQryfilters[k];
			    if(tmpfilter.indexOf('>') >= 0 || tmpfilter.indexOf('=') >= 0 || tmpfilter.indexOf('<') >= 0){
			        var f_len = tmpfields.length;
			        for(var kk=0; kk<f_len; kk++){
			          	var tmpf = tmpfields[kk];
			          	if(tmpfilter.indexOf(tmpf) >= 0){
			             	var newtmpfilter = tmpfilter.replace(tmpf,tmpalias[kk]);
			             	filters = filters + " " + newtmpfilter + " and";
			             	break;
			          	}
			        }
			    }
			}
			if(filters != ""){
			    filters = filters.substr(0, filters.length-3);
			}
			console.log(filters)
			console.log(fields)
			console.log(fields)
			opentablemod.tableHeadDisplay('rtvt-tbhead',qry_conrealfield,qry_conunit);
			 //opentablemod.getTableData(tableName, fields, filters, this.succ, this.fails);
			this.getTableAllData(tableName, fields, filters);
			$('.rtv-tbdata').perfectScrollbar('update');
		},
		succ: function (){
			sqlSearchMod.hide();
			$('#rosm-sqldiv textarea').val('');
		},
		fails: function (){
			alert('查询条件有误，请检查！');
			opentablemod.refresh();
		},

		getTableAllData: function (tableName, fields, filters){
			var self = this;
			var flds = fields.join(',');
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
			var url = gEcnu.config.geoserver+"/websqlscript";

			$.ajax({
				url:url,
				data:params,
				type:'POST',
				async:false,
				success: function (msg){
					self.hide();
					opentablemod.show();
					//console.log(msg)
					var jmsg = JSON.parse(msg);
					var datas = jmsg.Query_2.data;
					self.tballdatas=[];
					self.tballdatas = datas;
					console.log(datas)
					//var fieldszw = self.fieldstmp;
					//console.log(typeof datas);
					//var tbheadarr = self.oprateDate(fieldszw);

					self.createTable(datas);
					//opentablemod.reWriteData('rtvt-data');

					//chartmod.init(datas);
					//self.chartmod.chartshow();

					self.goback();
				},
				error: function (){
					alert('请求数据失败！');
				}	
			});
		},

		createTable: function (datas){
			for(var i = 0, len = datas.length; i < len; i++){
				for(var j = 0, len2 = datas[i].length; j < len2; j++){
					if(datas[i][j] == "null"){
						datas[i][j] = "";
					}
				}
			}
			
			if($.fn.DataTable.fnIsDataTable( this.dtable )){
	    		this.dtable.fnClearTable(false);
	        	this.dtable.fnDestroy();
	        	//this.dtable=null;
	    	}
	    	console.log(datas);
			this.dtable=$('#rtvt-data').DataTable({
			  	"bDestory":true,
			  	'retrieve': true,
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
      				opentablemod.reWriteData('rtvt-data');
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
			var _gobak = doc.getElementById('rtvt-data_wrapper');
			if(_gobak){
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
				var tmpdiv = document.getElementById('rtvt-data_wrapper');
				var _d = document.getElementById('tb-fanhui');
				_d.onclick = function (){
					console.log(tmpfields);
					//return;
					//opentablemod.tableHeadDisplay('rtvt-tbhead',tmpfields,tmpunit);
					//
					_d.innerHTML = '';
					tmpdiv.removeChild(_d);
					//tmpdiv.remove("#tb-fanhui");
					//_d = null;
					//self.operateSql('*','',tmpfields,tmpalias,tmpunit);
					opentablemod.tableHeadDisplay('rtvt-tbhead',tmpfields,tmpunit);
//console.log(self.fields_alias)
					opentablemod.getTableData(realname, tmpalias);
				}
			},100)
		},

	}
//确定查询button
	$('#ros-ok').click(function (){
		var tmpfields = zhtoolUtil.cloneobj2(sqlSearchMod.fieldstmp);
		var tmpalias = zhtoolUtil.cloneobj2(sqlSearchMod.fieldalias);
		var tmpunit = zhtoolUtil.cloneobj2(sqlSearchMod.fieldunit);
		var fields = $('#rosm-displayfields').val();
		var condition = $('#rosm-condition').val();
		sqlSearchMod.operateSql(fields, condition, tmpfields, tmpalias, tmpunit);
	});
//取消查询button
	$('#ros-cancel').click(function (){
		sqlSearchMod.hide();
	});

	$('#rosm-sqldiv textarea').focus(function (){
		sqlSearchMod.sql_focus_Input = $(this).attr('id');
	});

	$('.rosm-op').click(function (){
		var ele = $('#rosm-condition');
		var nowval = ele.val();
		ele.val( nowval + $(this).val() );
		ele.focus();
	});
//清空button
	$('#ros-clear').click(function (){
		$('#rosm-sqldiv textarea').val('');
		$('#rosm-displayfields').focus();
	});

	module.exports = sqlSearchMod;
})