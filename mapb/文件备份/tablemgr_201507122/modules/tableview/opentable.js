define(function (require, exports, module){

	//var _tablistmod = require('tablelist/tablelist')

	var openTableMod = {
		//存储表格所有的字段
		fields_tmp: [],

		//存储表格所有字段对应的单位
		fields_unit: [],

		//存储表格所有的数据
		//fields_data: [],

		//存储表格的每个字段的类型
		fields_type: [],

		//[V1,V2,V3.....]
		fields_alias: [],

		dtable: 'null',

		//已选择的行
		//selectedTrs: [],

		//从服务器需要更新的字段记录,每一项记录的是字段的ID如”{3:{field1:'name',field2:'sex'}}
		upFieldsInServer: {},

		//从客户端需要更新的字段记录,每一项记录的是字段的ID 如”{New3:{field1:'name',field2:'sex'}}
		upFieldsInClient: {},

		lastTableid:'',

		lastTbtype:'',

		tmpTrID: 0,//临时存储添加的行数,这里保存成模块的全局变量是为了记录所有的新加的记录

		selectedTrs:[],//保存所有被选中的行

		delFieldsInServer:[],//保存每行数据的id

		delFieldsInClient:[],//保存要删除的客户端新添加的tr节点，不需要与服务器交互
			
		openTable: function (tbid,tbrealname,tbqx,tabtype,ifedit,filter){

			var self = this;
			var qrysql = "";
			/*if(this.lastTableid === tbid && this.lastTbtype == tabtype){
				this.show();
				return;
			}*/
			this.lastTableid = tbid;
			this.lastTbtype = tabtype;

			this.tbinitfilter = filter;
//alert(this.tbinitfilter)
			this.tbid = tbid;
			this.tmpTrID = 0;
			this.tbqx = parseInt(tbqx);
			this.tbrealname = tbrealname;
			this.tabtype = tabtype;

			this.selectedTrs = [];
			
			this.ifediting = ifedit;

			this.currentpagedata=[];

			var sqlservice = new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp,fields){
				//console.log(tmp);
				self.show();
				
				self.dataReset();
				
				self.execData(tmp,fields);

				self.tableHeadDisplay('rtvt-tbhead',self.fields_tmp,self.fields_unit);
//console.log(self.fields_alias)
				self.getTableData(tbrealname, self.fields_alias,self.tbinitfilter,self.succmsg,self.failmsg);

	    	},'processFailed':function (){alert('请求数据失败！');return false;}});
		    	var qrysql = {'fields':"*","lyr":'g_fieldsdef','filter':"tabname="+"'"+tbrealname+"'"};
		    	sqlservice.processAscyn('SQLQUERY','mapb',qrysql);
		},
		
		refresh: function (){
			this.tableHeadDisplay('rtvt-tbhead',this.fields_tmp,this.fields_unit);

			this.getTableData(this.tbrealname, this.fields_alias,this.tbinitfilter,this.succmsg,this.failmsg);
		},
		//重新请求表格
		refresh2: function (){
			this.lastTableid = "";
			this.lastTbtype = "";
			var _tbid = this.tbid;
			var _tbqx = this.tbqx;
			var _tbrl = this.tbrealname;
			var _tbtype = this.tabtype;
			var _ifedit = this.ifediting;
			this.openTable(_tbid,_tbrl,_tbqx,_tbtype,_ifedit);
		},

		succmsg: function (){
			return;
		},

		failmsg: function (){
			alert('请求数据失败！')
		},

		tableHeadDisplay: function (theadID,fields,fields_unit){
			var fields_len=fields.length;
			var doc=document;
			var thead=doc.getElementById(theadID);
			thead.innerHTML="";
			var tmpThead=doc.createElement('thead');
			for(var i=0;i<fields_len;i++){
			  var tmpfield=fields[i];
			  var th=doc.createElement('th');
			  if(fields_unit[i] != 'null' && fields_unit[i] != ""){
			    tmpfield=tmpfield+"("+fields_unit[i]+")";
			  }
			  th.innerHTML=tmpfield;
			  tmpThead.appendChild(th);    
			}
			thead.innerHTML=tmpThead.innerHTML;
		},

		execData: function (tmp,fields){
			for(var i = 0, len = tmp.length; i < len; i++){
	            if(tmp[i]['FIELDREALNAME'] == 'null'){
	              tmp[i]['FIELDREALNAME'] = '';
	            }
	            if(tmp[i]['UNIT'] == 'null'){
	              tmp[i]['UNIT'] = '';
	            }
	            if(tmp[i]['FIELDTYPE'] == 'null'){
	              tmp[i]['FIELDTYPE'] = '';
	            }
	            if(tmp[i]['FIELD'] == 'null'){
	              tmp[i]['FIELD'] = '';
	            }
				this.fields_tmp.push(tmp[i]['FIELDREALNAME']);
				this.fields_unit.push(tmp[i]['UNIT']);
	            this.fields_type.push(tmp[i]['FIELDTYPE']);
				this.fields_alias.push(tmp[i]['FIELD']);
			}
	        this.fields_tmp.splice(0,0,'fid');
	        this.fields_alias.splice(0,0,'fid');
	        this.fields_unit.splice(0,0,'');
	        this.fields_type.splice(0,0,'int');
		},
		destorytb: function (){
			if($.fn.DataTable.fnIsDataTable( this.dtable )){
	    		this.dtable.fnClearTable(false);
	        	this.dtable.fnDestroy();
	        	$('#rtvt-tbhead').empty();
	    	}
		},
		//这一部分的逻辑要搞清，--周力杰
		getTableData: function (tableName,aliasarr,filter,succmsg,failmsg){
			var self = this;

			filter = filter || '';
			succmsg = succmsg || function (){return;}
			failmsg = failmsg || function (){alert('请求失败！');}
			//console.log(typeof this.table)
			/*if(this.dtable !== 'null'){
	        	this.dtable.fnClearTable(false);
	        	this.dtable.fnDestroy();
	    	}*/
	    	
	    	if($.fn.DataTable.fnIsDataTable( this.dtable )){
	    		this.dtable.fnClearTable(false);
	        	this.dtable.fnDestroy();
	        }
	    	//var returnValue = {};
			var websqlUrl = gEcnu.config.geoserver + "/WebSQL";
			//var websqlUrl = gEcnu.config.geoserver + "WebSQL";

			this.dtable = $('#rtvt-data').dataTable({
			  "bPaginate": true,"iDisplayLength":15,'bStateSave': false,"bDestory":true,"sPaginationType": "full_numbers", "bLengthChange": true,"bFilter": true,'bSort':false,"bInfo": true,"bAutoWidth": true,
			  "oLanguage": {"sLengthMenu": "每页显示 _MENU_ 条记录","sZeroRecords": "抱歉， 没有找到",
			      "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			      "sInfoEmpty": "没有数据",
			      "sSearch": "搜索：",
			      "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
			      "oPaginate": {
			          "sFirst": "首页",
			          "sPrevious": "前一页",
			          "sNext": "后一页",
			          "sLast": "尾页"
			      },
			      "sZeroRecords": "没有检索到数据"
			  },
			  "sZeroRecords": "没有检索到数据",
			  "bProcessing": true,
			  "bServerSide": true,
			  "sDom": 'lf<"clear">tirp',
		      /*'tableTools': {
		        "sSwfPath": "/mapb/common/jslib/publib/datatables/copy_csv_xls.swf",
		        "aButtons": [
		            {
		              "sExtends":    "csv",
		              "sButtonText": "导出数据",
		              "aButtons":    ["csv"],// [ "csv", "xls", "pdf" ]
		              "bFooter": false,
		            }
		        ]
		      }, */ 
			  //"sAjaxSource": "serv/Action.php?dif="+Math.random(),
			  "sAjaxSource": websqlUrl + "?dif="+Math.random(),
			  "fnServerData": function ( sSource, aoData, fnCallback, oSettings ) {
			  	    var aoData_len = aoData.length;
			        var sEcho,iDisplayStart,iDisplayLength;
			        for(var mm = 0; mm < aoData_len; mm++){
			        	var everyAoData = aoData[mm];
			          	if(everyAoData["name"] == "sEcho"){
				          	sEcho = everyAoData["value"];
				          	continue;
			        	}
				        if(everyAoData["name"] == "iDisplayStart"){
				          iDisplayStart = everyAoData["value"];
				          continue;
				        } 
				        if(everyAoData["name"] == "iDisplayLength"){
				          iDisplayLength = everyAoData["value"];
				          continue;
				        } 
			      	}
			      	var where = self.creatWhere(aliasarr, aoData);

				    if(filter && filter !==''){
				      	if(where === ''){
				      		where += filter;
				      	}else{
				      		where += 'and ' + filter;
				      	}
		    	    }

		    	    var fld = "";
		    	    var sqlqrysql = '';
		    	    var tmpaliasarr = zhtoolUtil.cloneobj2(aliasarr);
		    	    for(var nn=0, len3 = tmpaliasarr.length; nn < len3; nn++){
		    	    	tmpaliasarr[nn] = "["+ tmpaliasarr[nn] + "]";
		    	    }
	    	      	fld = tmpaliasarr.join(',');

				    if(where !== ""){
				    	sqlqrysql="select " + fld + " from " + "'" + tableName + "' where " + where + " limit " + iDisplayLength+ " offset " + iDisplayStart;
				    }else{
				    	sqlqrysql="select " + fld + " from " + "'" + tableName + "' limit " + iDisplayLength+ " offset " + iDisplayStart;
				    }
				    console.log(sqlqrysql)
				  	 
	    		  	//var sqlqrysql="select " + fld + " from " + "'" + tableName + "' " + wherestr + " limit " + iDisplayLength+ " offset " + iDisplayStart;

			      	var qryParams={
					    "mt":"SQLQuery",
					    "GeoDB":'mapb',
					    "SQL":sqlqrysql
				  	}

				    var datastr = JSON.stringify(qryParams);
				    var params = {
				        req: datastr
				    };
				    params.aoData=JSON.stringify(aoData);

			        oSettings.jqXHR = $.ajax({
			            "dataType": 'json',
			            "type": "POST",
			            "url": sSource,
			            "data": params,
			            "success":function(resp){
			            	//console.log(resp)
					        self.getRecordsLength(tableName,resp,where,fnCallback,succmsg,failmsg);
				        },
				        "error":function (){
				        	failmsg();
				        }
				    });    
			    },
			    "fnDrawCallback": function( oSettings ) {
					//console.log(oSettings)
					self.reWriteData('rtvt-data');
					$('#rtvt-data tbody tr').filter(function (){
						var seltrs = self.selectedTrs;
						for(var q = 0, leng = seltrs.length; q < leng; q++){
							if($(this).attr('fieldid') == seltrs[q].attr('fieldid')){
								//$(this).css('background','#93D7FB');
								$(this).addClass('row_selected');
							}
						}
					});
    			}
			});
		},
		//根据搜索框的值生成作为where条件
		creatWhere: function (aColumns,aoData){

		  	var aoData_len = aoData.length;
		    var where = "";
		    for(var mm = 0; mm < aoData_len; mm++){
		    	var everyAoData = aoData[mm];
			    if((everyAoData["name"]=="sSearch") && (everyAoData["value"]!="")){
			      var sWhere = "(";
			      for (var i=0,len2 = aColumns.length ; i < len2; i++ ){
			        sWhere += aColumns[i] + " LIKE '%" + everyAoData["value"] + "%' OR ";
			      }
			      sWhere = sWhere.substr( 0, sWhere.length-4 );
			      sWhere += ')';
			      return sWhere;
			    } 
		    }
		  return where;
		},

		getRecordsLength: function (tableName,resp,where,fnCallback,succmsg,failmsg){
		  var self = this;
		  var sqlservice = new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp,fields){

		    var totallength = 0;
		    var lenginfo = tmp[0];
		    for(var key in tmp[0]) {
		      totallength = tmp[0][key];
		    }
		    var resources = {};
		    var lengtmp = resp.data.length;
		    for(var i = 0; i < lengtmp; i++){
		      for(var j = 0, len3 = resp.data[i].length; j < len3; j++){
		        if(resp.data[i][j] == 'null'){
		          resp.data[i][j] = '';
		        }
		      }
		    }

		    //resources.fields     = self.fields_alias;
		    //resources.fieldsType = self.fields_type;
		    //resources.fieldsUnit = self.fields_unit;
		    resources.aaData     = resp.data;
		    resources.iTotalRecords = totallength;
		    resources.iTotalDisplayRecords = totallength;
		   /* data_fields=resp.fields=fields_alias;
		    type_fields=resp.fieldsType;
		    unit_fields=resp.fieldsUnit;*/
		    self.currentpagedata = [];
		    self.currentpagedata = resp.data;
		    
		    fnCallback(resources);
		    //重写数据（为tr设置attribute('TrID')属性以及为每个td添加input）
		    //self.reWriteData('rtvt-data');

		    
		    succmsg();

		    
		    
		    
		    //重写数据之后进行事件的绑定
		    var seltrs = self.selectedTrs;
		    if(self.ifediting){
		    	//var seltrs = self.selectedTrs;
		    	self.bindClickEvt('rtvt-data');
		    }
		    self.bindchooseClickEvt('rtvt-data',seltrs);

		    var tbwidth = $('#rtvt-data').css('width');
		    $('#rtvt-data_wrapper').css('width',tbwidth);
		   	$('.rtv-tbdata').perfectScrollbar('destroy');
		    $('.rtv-tbdata').perfectScrollbar();
		    

		  },'processFailed':function (){failmsg();}});

		   var qrysql = {'fields':"count(*)","lyr":tableName,'filter':where};

		  sqlservice.processAscyn('SQLQUERY','mapb',qrysql);
		},

		reWriteData: function (tbeleid){
		  var doc=document;
		  var data_Table=doc.getElementById(tbeleid);
		  var data_Tbody=data_Table.tBodies[0];
		  var data_Rows=data_Tbody.rows;
		  var data_Rows_len=data_Rows.length;
		  for(var i=0;i<data_Rows_len;i++){
		     var tmpRow=data_Rows[i];
		     var data_Cells=tmpRow.cells;
		     var data_Cells_len=data_Cells.length;
		     for(var j=0;j<data_Cells_len;j++){
		        var tmpCell=data_Cells[j];
		        //console.log($(tmpCell))
		        var tmpCell_data;
		        if($(tmpCell).find('input').length>0){
		        	tmpCell_data=$(tmpCell).find('input').val();
		        }else{
		        	//console.log(11);
		        	tmpCell_data=tmpCell.innerHTML;
		        }
		        tmpCell.setAttribute('tdIndex',j);
		        $(tmpCell).css('position','relative');
		        if(j==0){//说明是第一个单元格，此时需要利用此ID赋值给TR属性
		          tmpRow.setAttribute('FieldID',tmpCell_data);
		          tmpRow.setAttribute('TrID','old'+tmpCell_data);
		        }else{
		          var input=doc.createElement('input');
		          input.type="text"; 
		          input.setAttribute('disabled','true')            
		          $(input).attr("value",tmpCell_data);//填充内容
		          //$(input).prop('disabled',true);
		          $(input).css('height','120%').css('border','0').css('background-color','transparent');
		          if(tmpCell_data!=""){
		            $(input).attr('size', $(input).val().length);
		          }else{
		            $(input).attr('size',"4");
		          }
		          tmpCell.innerHTML="";
		          tmpCell.appendChild(input);
		        }
		     }
		  }
		},

		bindchooseClickEvt: function(tableID,selTrs){
			var self = this;
	      //var selTrs = this.selectedTrs;
		  $("#"+tableID+" td:first-child").unbind('click');
		  $("#"+tableID+" td:first-child").click( function(e) {
		    if( $(this).parent().hasClass('row_selected') ) {

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

		bindClickEvt: function (tableID){
	      var self = this;
		  $("#"+tableID+" td input").prop('disabled',false);

		  $("#"+tableID+" td input").unbind('onchange');
		  $("#"+tableID+" td input").on('change',function(e) {
		    var value=$(this).val();
		    if(value==""){
		      $(this).attr('size',"4");
		    }else{
		      $(this).attr('size', $(this).val().length);
		    }
		    var tdEle=this.parentNode;//td元素节点
		    var tdindexNum=tdEle.getAttribute('tdIndex');//td的索引号，从第一列为0开始
		    var trEle=tdEle.parentNode;//tr元素节点
		    var parentTrRowID=trEle.getAttribute('TrID');//tr节点的的属性trid
		    self.upFieldsRecords(tableID,parentTrRowID,tdindexNum,value,trEle,'input');
		  });


		    $("#"+tableID+" td select").prop('disabled',false);
		    $("#"+tableID+" td select").unbind('onchange');
		    $("#"+tableID+" td select").on('change',function(e) {
		      var value=$(this).val();
		      var tdEle=this.parentNode;
		      var tdindexNum=tdEle.getAttribute('tdIndex');
		      var trEle=tdEle.parentNode;
		      var parentTrRowID=trEle.getAttribute('TrID');
		      self.upFieldsRecords(tableID,parentTrRowID,tdindexNum,value,trEle,'select');
		    });
		},
		/*
		*@params
		*tableID表格的ID，parentTrRowID是每一行tr所对应的TrID属性
		*tdIndex表示第几列，value是每个td中改变的input或select值
		*trEle表示改变行的tr节点，clickEleType表示是select改变还是input框值改变
		*/
		upFieldsRecords: function (tableID,parentTrRowID,tdIndex,value,trEle,clickEleType){
		  var  tdIndex = parseInt(tdIndex);
		  var tmpfieldName=this.fields_alias[tdIndex];

		  if(parentTrRowID.indexOf('old') >= 0){//说明是服务器端已存在的数据

		    var upID=parentTrRowID.substring(3);//获取是表格中的哪一行，其实是数据库中一条记录的id号，例如：1

		    if(typeof this.upFieldsInServer[upID]=="undefined"){

		            this.upFieldsInServer[upID]={};

		    }

		    //格式:如{"1":{'V1':value}}
		    this.upFieldsInServer[upID][tmpfieldName]=value;

		  }else{//客户端新添加的记录

		    if(typeof this.upFieldsInClient[parentTrRowID]=="undefined"){

		        this.upFieldsInClient[parentTrRowID]={};

		    }

		    this.upFieldsInClient[parentTrRowID][tmpfieldName]=value;

		  }
		},
		/*
		*点击添加，加入一新行
		*/
		addRow: function (qx,tableid){
			var doc=document;
        //console.log(doc.getElementById('recTable'));
            var fieldsBody= doc.getElementById(tableid).tBodies[0];
            //然后需要判断tbody最后一条记录的对应字段名是否为空！
            var rowid =fieldsBody.rows.length-1;
            if(rowid>0){
                var fieldTdInput=fieldsBody.rows[rowid].cells[1].firstChild;
                var ifFieldEmpty=fieldTdInput.value;
                if(ifFieldEmpty==""){
                    fieldTdInput.focus();
                  return;
                }
            }

        	this.tmpTrID++;
            var tr=doc.createElement('tr');
            tr.setAttribute('ifNew','new');
            tr.setAttribute('TrID','new'+this.tmpTrID);
            var td1=doc.createElement('td');
            td1.setAttribute('tdIndex',0);
            td1.innerHTML="N";
            tr.appendChild(td1);
            var fieldsInTable=this.fields_tmp;//数据表中字段
            var fields_length=fieldsInTable.length;
            for(var mm=1;mm<fields_length;mm++){
                var td=doc.createElement('td');
                td.setAttribute('tdIndex',mm);
                var input=doc.createElement('input');
                input.type="text";    
                $(input).css('width','95%').css('height','120%').css('border','0').css('background-color','transparent');
                $(input).attr("value",'');//填充内容
                td.appendChild(input);
                tr.appendChild(td);
            }

            fieldsBody.appendChild(tr);
            //重新绑定事件
            /*this.execbindevt(qx,tableid,seltrs);*/
            var seltrs = this.selectedTrs;
             if(qx == 1){
				this.unbindevt(tableid);
			}else{
				this.bindClickEvt(tableid,seltrs);				
			}        	

		},

		deleteRows: function (qx,tableid){
			var seltrs = this.selectedTrs;
			var selectedRows=seltrs.length;
	        if(selectedRows==0){return;}
	        var doc=document;
            var fieldsBody= doc.getElementById(tableid).tBodies[0];;
            var selectedTrs_len=seltrs.length;
            for(var i=0;i<selectedTrs_len;i++){
                var tmpdelRecord=seltrs[i];
                var trRID=tmpdelRecord.attr('TrID');
                if(trRID.indexOf('old')>=0){
                  var delFieldID=tmpdelRecord.attr('FieldID');
                  this.delFieldsInServer.push(delFieldID);
                }else{
                  this.delFieldsInClient.push(trRID);
                }
                var rows_len =fieldsBody.rows.length;
                for(var j=0;j<rows_len;j++){
                    var tmpTrRecID=fieldsBody.rows[j].getAttribute('TrID');
                    if(tmpTrRecID==trRID){
                      fieldsBody.removeChild(fieldsBody.rows[j]);
                      break;
                    }
                }
            }
            //重新绑定事件
            //this.execbindevt(qx,tableid,seltrs);
            var seltrs = this.selectedTrs;
            if(qx == 1){
				this.unbindevt(tableid);
			}else{
				this.bindClickEvt(tableid,seltrs);				
			}
		},

		saveData: function (){
			var upfins = this.upFieldsInServer;

			var upfinc = this.upFieldsInClient;

			var delfins = this.delFieldsInServer;

			var delfinc = this.delFieldsInClient;

			var tablereal = this.tbrealname;

			this.addCustomEvt._events.savedata('tbdata',tablereal,upfins,upfinc,delfins,delfinc);
		},

		hide: function (){
			$('.rtv-tbdataout').css('display','none');
		},

		show: function (){
			$('.rtv-tbdataout').nextAll().css('display','none');
			$('.rtv-tbdataout').prevAll().css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		dataReset: function (){
		  //数据置空
			this.fields_tmp = [];
			this.fields_unit = [];
			//fields_data: [];
			this.fields_type = [];
			this.fields_alias = [];
		},
		//重置内存中所有修改的表格数据
		ResetOprateData: function (){
			this.upFieldsInServer = {};

			this.upFieldsInClient = {};

			this.delFieldsInServer = [];

			this.delFieldsInClient = [];

		},

		clearSelectedRows: function (){
			this.selectedTrs=[];
		},

		unbindevt: function (tableid){
			$("#"+tableid+" td input").unbind('onchange');
			$("#"+tableid+" td input").prop('disabled',true);
			$("#"+tableid+" td select").unbind('onchange');
			$("#"+tableid+" td select").prop('disabled',true);
		},

		execFieldsInTable: function (tableName,sqltasks){
			var self= this;
			var delRecords = sqltasks['delete'],//数组[]
      		upRecords  = sqltasks['update'],//{'1':{}}
      		addRecords  = sqltasks['add'];//{'new1':{}}

      		var Otmpdel = this.delTableRecords(tableName,delRecords);
      		var Otmpup = this.upTableRecords(tableName,upRecords);
			var Otmpadd = this.addTableRecords(tableName,addRecords);

			var sqltasksall = [];
			if(Otmpdel){
				sqltasksall.push(Otmpdel);
			}
			if(Otmpadd){
				for(var i = 0; i < Otmpadd.length; i++){
					sqltasksall.push(Otmpadd[i]);
				}
			}
			if(Otmpup){
				for(var i = 0; i < Otmpup.length; i++){
					sqltasksall.push(Otmpup[i]);
				}
			}
			if(sqltasksall.length == 0){
				alert('保存成功！');
				/*********刷新**************/
				//tableOpe_table(tableOpenOrDesign);
				this.refresh2();
		        this.ResetOprateData();
				return;
			}

			var sqlservice =new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp){
		      //deleteSelectRecordsOrFields(tmp,dBaseName,tableName,delIds);
		     //console.log(tmp);
			    var tasknum=0;
			    var flagnum=0;
			    for(var key in tmp){
			     	tasknum++;
			     	if(tmp[key]['Msg']){
			     		flagnum++;
			     	}
			    }
			    if(tasknum === flagnum){
			     	self.refresh2();
		        	self.ResetOprateData();
			     	alert('保存成功！');
			     	return;
			    }else{
			     	self.refresh2();
		        	self.ResetOprateData();
			     	alert('保存失败！');
			     	return;
			    }
		    },'processFailed':function (){alert('保存失败');return false;}});
		    //var qrysql = {'fields':"field","lyr":'fieldsdef','filter':delIds};    //根据用户id
		    sqlservice.processAscyn(gEcnu.ActType.SQLTask,'mapb',sqltasksall);
		},

		delTableRecords: function (tableName,delRecords){
			if(delRecords.length == 0){return false;}
			var Odeltask = {'mt':"SQLDelete","tablename":tableName,"KeyFld":"fid","key":[]};

			for(var i = 0, len = delRecords.length; i < len; i++){
				Odeltask.key.push(delRecords[i]);
			}

			return Odeltask;
		},

		upTableRecords:function (tableName,upRecords){
			var Auptask = [];
			var num = 0;
			for(var key in upRecords){
				num++;
				var Ouptask = {"mt":"SQLExec","SQL":""};
				Ouptask.SQL = "update " + tableName + " set ";
				for(var key1 in upRecords[key]){
					Ouptask.SQL += key1 + "=" +"'"+upRecords[key][key1]+ "',";
				}
				Ouptask.SQL = Ouptask.SQL.substr(0, Ouptask.SQL.length-1);
				Ouptask.SQL += " where " + this.fields_alias[0] + "=" + "'" + key + "'";
				Auptask.push(Ouptask);
			}
			if(num == 0){
				return false;
			}else{
				return Auptask;
			}
		},

		addTableRecords:function (tableName,addRecords){
			var Ainsert = [];
			var num = 0;
			for(var key in addRecords){
				num++;
				var task = {"mt":"SQLExec","SQL":""}
				task.SQL += "insert into " + tableName + "("
				for(var key1 in addRecords[key]){
					task.SQL += key1 + ","
				}
				task.SQL = task.SQL.substr(0, task.SQL.length - 1);
				task.SQL += ") values (";
				for(var key2 in addRecords[key]){
					task.SQL += "'" + addRecords[key][key2] + "',"
				}
				task.SQL = task.SQL.substr(0, task.SQL.length - 1);
				task.SQL += ")";
				Ainsert.push(task);
			}
			if(num == 0){
				return false;
			}else{
				return Ainsert;
			}
		},

		addCustomEvt: {
			_events:{},

			on: function (evttype,callback){
				switch (evttype){
					case 'savedata':
					this._events.savedata = callback;
					break;

					case 'opensuccess':
					this._events.savedata = callback;
				}
			}
		}

	}

	$('#rtvt-data').on('keydown','input',function (){
		if(event.which == 9 || event.keyCode == 9){
			$('.rtv-tbdata').perfectScrollbar('update');
		}
	});

	//$('.rtv-tbdata').perfectScrollbar();

	/*$('.rtvte-btn').click(function (){
		var tableid = 'rtvt-data';
		var qx = openTableMod.tbqx;
		var tbtype = openTableMod.tabtype;
		if(qx === 1){
			alert('不具有编辑权限，该表不能编辑！');
			return;
		}
		var val = $(this).val();
		switch (val){
			case '添加':
			if(tbtype == 'ftset'){alert('地图属性数据不能添加！');return;}
			openTableMod.addRow(qx,tableid);
			break;

			case '删除':
			if(tbtype == 'ftset'){alert('地图属性数据不能删除！');return;}
			openTableMod.deleteRows(qx,tableid);
			break;

			case '保存':
			openTableMod.saveData();
			break;
		}
	});*/


	module.exports = openTableMod;
});