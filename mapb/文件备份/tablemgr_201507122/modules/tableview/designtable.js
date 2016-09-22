define(function (require, exports, module){
	//var _tablelist = require('tablelist/tablelist');

	var tbDesignMod = {
		
		fieldsVn: [],

		lastTbid: '',

		lastTbtype:"",

		selectedTrs:[],//选中的行

		tmpTrID: 0,//临时存储添加的行数,这里保存成模块的全局变量是为了记录所有的新加的记录

		//从服务器需要更新的字段记录,每一项记录的是字段的ID如”{3:{field1:'name',field2:'sex'}}
		upFieldsInServer: {},

		//从客户端需要更新的字段记录,每一项记录的是字段的ID 如”{New3:{field1:'name',field2:'sex'}}
		upFieldsInClient: {},

		delFieldsInServer:[],//保存每行数据的id

		delFieldsInClient:[],//保存要删除的客户端新添加的tr节点，不需要与服务器交互

		init: function (username,tbid,tbrealname,qx,tabtype,ifeidt){
			/*var showflag = this.ifHasShow();
			if(showflag){
				this.hide();
				return;
			}*/
			
			this.fieldhead = ['ID','字段名','字段类型','单位'];
			this.fieldheadVn = ['id','fieldRealname','fieldtype','unit'];
			
			var tabtype = tabtype;//'ftset'或者'tb'
			/*if(this.lastTbid === tbid && this.lastTbtype == tabtype){
				this.show();
				return;
			}*/
			this.lastTbid = tbid;
			this.lastTbtype = tabtype;

			this.tbqx = parseInt(qx);
			this.username = username;
			this.tbrealname = tbrealname;
			this.tbid = tbid;
			this.tabletype = tabtype;

			

			this.ifedting = ifeidt;

			this.getTbfields(tbrealname);
		},

		/*ifHasShow: function (){
			if($('.rtv-tbfieldsout').css('display') == 'block'){
				return true;
			}
			return false;
		},*/

		hide: function (){
			$('.rtv-tbfieldsout').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		show: function (){
			$('.rtv-tbfieldsout').nextAll().css('display','none');
			$('.rtv-tbfieldsout').prevAll().css('display','none');
			$('.rtv-tbfieldsout').css('display','block');
		},

		getTbfields: function (tbrealname){
			var self = this;
			var return_value=[];
  			var fields_return=this.fieldhead;
  			var value_return = [];

			var option = {
				'scriptname': 'mapb.tablemgr.tbtool.designtb',
				'tbrealname': tbrealname
			}
			var sqlscript = new gEcnu.WebsqlScript({'processCompleted':function(tmp){
				//console.log(tmp);
				var result = tmp.queryResult;
				self.show();
				var len = result.length;
		        for(var i = 0; i < len; i++){
		          var tmps={'id':'','field':''};
		          var Atmp_return = [];
		          Atmp_return.push(result[i]['ID']);
		          Atmp_return.push(result[i]['FIELDREALNAME']);
		          Atmp_return.push(result[i]['FIELDTYPE']);
		          Atmp_return.push(result[i]['UNIT']);
		          //Atmp_return.push(tmp[i]['intro']);
		          value_return.push(Atmp_return);
		          //这里记录fieldsVn记录表的所有字段，在做delete操作时有用
		          tmps.id = result[i]['ID'];
		          tmps.field = result[i]['FIELD'];
		          self.fieldsVn.push(tmps);
		        }
		        return_value.fields = fields_return;
		        return_value.data = value_return;

		       

		        self.tableFieldsDisplay('recThead_design','recTbody_design',return_value,[]);
			},'processFailed':function (){alert('请求字段失败！');return false;}});
			sqlscript.processAscyn(option);
		},

		tableFieldsDisplay: function (theadID,tbodyID,records,filters){
			//console.log(records);
			var fields=records.fields;
			//var data_fields=fields;
			var fields_value=records.data;
			var fields_len=fields.length;
			var fields_value_len=fields_value.length;
			var doc=document;
			var thead=doc.getElementById(theadID);
			var tbody=doc.getElementById(tbodyID);
			thead.innerHTML="";
			tbody.innerHTML="";
			var tmpThead=doc.createElement('thead');
			var tmpTbody=doc.createElement('tbody');
			var indexNum=[];
			for(var i=0;i<fields_len;i++){
			  var tmpfield=fields[i];
			  var filters_len=filters.length;
			  var ifFilter=false;
			  for(var k=0;k<filters_len;k++){
			    var tmpNF=filters[k];
			    if(tmpNF==tmpfield){
			           indexNum.push(i);
			           ifFilter=true;
			           break;
			    }
			  }
			  if(ifFilter) {continue;}
			    var th=doc.createElement('th');
			    th.innerHTML=tmpfield;
			    tmpThead.appendChild(th);     
			}
			thead.innerHTML=tmpThead.innerHTML;
			//填充数据

			for(var j=0;j<fields_value_len;j++){
			    var tmprecrd=fields_value[j];
			    var tmp_len=tmprecrd.length;
			    var tr=doc.createElement('tr');
			    for(var jj=0;jj<tmp_len;jj++){
			      var indexNum_len=indexNum.length;
			      var ifOut=false;
			      for(var kk=0;kk<indexNum_len;kk++){
			            var tmpIndex=indexNum[kk];
			            if(tmpIndex==jj){
			                ifOut=true;
			                break;
			            }
			      }
			      if(ifOut){continue};
			        var td=doc.createElement('td');
			        td.setAttribute('tdIndex',jj);
			        $(td).css('position','relative');
			        if(jj!=0){
			          if(jj!=2){
			            var input=doc.createElement('input');
			            input.setAttribute('disabled','true')
			            input.type="text";    
			            $(input).css('width','95%').css('height','120%').css('border','0').css('background-color','transparent');
			            if(tmprecrd[jj] == 'null'){
			              tmprecrd[jj] = '';
			            }
			            $(input).attr("value",tmprecrd[jj]);//填充内容
			            //$(input).prop('disabled',true);
			            td.appendChild(input);
			          }else{
			            //字段类型选择
			            var stringType=doubleType=intType=boolType="";
			            stringType="<option value='text'>text</option>";
			            doubleType="<option value='float'>float</option>";
			            intType="<option value='int'>int</option>";
			            boolType="<option value='blob'>blob</option>";
			            if(tmprecrd[jj]=="text"){
			                  stringType="<option value='text' selected='selected'>text</option>";
			            }else if(tmprecrd[jj]=="float"){
			              doubleType="<option value='float' selected='selected'>float</option>";
			            }else if(tmprecrd[jj]=="int"){
			              intType="<option value='int' selected='selected'>int</option>";
			            }else if(tmprecrd[jj]=="blob"){
			              boolType="<option value='blob' selected='selected'>blob</option>";
			            }
			            var totalOptions=stringType+doubleType+intType+boolType;
			            td.innerHTML="<select style='width:80px;' class='fieldType' disabled='true'>"+totalOptions+"</select>";
			          }
			        }else{
			          td.innerHTML=tmprecrd[jj];
			          tr.setAttribute('FieldID',tmprecrd[jj]);
			          tr.setAttribute('TrID','old'+tmprecrd[jj]);
			        }
			        
			        tr.appendChild(td);
			    }
			    tmpTbody.appendChild(tr);
			}
			tbody.innerHTML=tmpTbody.innerHTML;
			//this.bindClickEvt('recTable_design');
			$('.rtv-tbfieldsinner').perfectScrollbar('update');
			//this.unbindevt('recTable_design');
			/*var qx = this.tbqx;
			var seltrs = this.selectedTrs;
			if(qx == 1){
				this.unbindevt('recTable_design');
			}else{
				this.bindClickEvt('recTable_design',seltrs);
			}*/

			if(this.ifedting){
				var seltrs = this.selectedTrs;
				this.bindClickEvt('recTable_design',seltrs);
			}
		},

		refresh: function (){
			var _qx = this.tbqx;
			var _usrname = this.username;
			var _tbrltb = this.tbrealname;
			var _tbid = this.tbid;
			var _ifedit = this.ifedting;
            var _tbtype = this.tabletype;

			this.init(_usrname,_tbid,_tbrltb,_qx,_tbtype,_ifedit);
		},

		addrow: function (qx,designtbid){
			var doc=document;
	        var fieldsBody= doc.getElementById(designtbid).tBodies[0];
	        //然后需要判断tbody最后一条记录的对应字段名是否为空！
	        var rowid =fieldsBody.rows.length-1;
	        if(rowid>=0){
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
	        var td2=doc.createElement('td');
	        td2.setAttribute('tdIndex',1);
	        td2.setAttribute('focus',true);
	        var input=doc.createElement('input');
	        input.type="text";    
	        $(input).css('width','95%').css('height','120%').css('border','0').css('background-color','transparent');
	        $(input).attr("value",'');//填充内容
	        td2.appendChild(input);
	        var td3=doc.createElement('td');
	        td3.setAttribute('tdIndex',2);
	        var stringType="<option value='text' selected='selected'>text</option>";
	        var doubleType="<option value='float'>float</option>";
	        var intType="<option value='int'>int</option>";
	        var boolType="<option value='blob'>blob</option>";
	        var totalOptions=stringType+doubleType+intType+boolType;
	        td3.innerHTML="<select style='width:80px;' id='fieldType'>"+totalOptions+"</select>";
	        var td4=doc.createElement('td');
	        td4.setAttribute('tdIndex',3);
	        var input=doc.createElement('input');
	        input.type="text";    
	        $(input).css('width','95%').css('height','120%').css('border','0').css('background-color','transparent');
	        $(input).attr("value",'');//填充内容
	        td4.appendChild(input);
	        /*var td5=doc.createElement('td');
	        td5.setAttribute('tdIndex',4);
	        var input=doc.createElement('input');
	        input.type="text";    
	        $(input).css('width','95%').css('height','120%').css('border','0').css('background-color','transparent');
	        $(input).attr("value",'');//填充内容
	        td5.appendChild(input);*/
	        tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);tr.appendChild(td4);/*tr.appendChild(td5);*/
	        fieldsBody.appendChild(tr)

			var seltrs = this.selectedTrs;
			if(qx == 1){
				this.unbindevt('recTable_design');
			}else{
				this.bindClickEvt('recTable_design',seltrs);
			}
		},

		deleteRows: function (qx,designtbid){
			var selTrs = this.selectedTrs
			var selTrs_len=selTrs.length;
	        if(selTrs_len==0){return;}
	        //console.log(selTrs);
	        var doc=document;
	        var fieldsBody= doc.getElementById(designtbid).tBodies[0];
	        var selTrs_len=selTrs.length;
	        for(var i=0;i<selTrs_len;i++){
	            var tmpdelRecord=selTrs[i];
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
	        var seltrs = this.selectedTrs;
            if(qx == 1){
				this.unbindevt('recTable_design');
			}else{
				this.bindClickEvt('recTable_design',seltrs);				
			}
		},

		bindClickEvt: function (tableID,selTrs){
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

			    }else{
		            $("#"+tableID+' tr').removeClass('row_selected');
		            selTrs=[];//选中数据行
		            $(this).parent().addClass('row_selected');
		            var trEle=$(this).parent();
		            selTrs.push(trEle);
		            //console.log(trEle)
		            var len = self.selectedTrs;
		            self.selectedTrs = selTrs;

			    }
		      }
		    });
				
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
		  var self = this;
		  var tdIndex = parseInt(tdIndex);
		  //console.log(this.fieldsVn);
		  //var tmpfieldName=this.fieldsVn[tdIndex]['field'];
		  var tmpheadf = this.fieldhead;
		  var tmpfieldName=this.fieldhead[tdIndex];
		  if(parentTrRowID.indexOf('old') >= 0){//说明是服务器端已存在的数据

		    var upID=parentTrRowID.substring(3);//获取是表格中的哪一行，其实是数据库中一条记录的id号，例如：1

		    if(typeof this.upFieldsInServer[upID]=="undefined"){

		            this.upFieldsInServer[upID]={};

		    }

		    //格式:如{"1":{'V1':value}}
		    for(var i = 1, leng = tmpheadf.length; i < leng; i++){
		    	this.upFieldsInServer[upID][tmpheadf[i]]=trEle.cells[i].firstChild.value;
		    }

		    //this.upFieldsInServer[upID][tmpfieldName]=value;



  //这里不是很明白！！！！！！！！！！！！！！！！！！
		    if(tableID == "recTable_design"){//如果是设计表

		      if(tdIndex!=1){//如果设计表更新的字段不是‘字段名’字段就把相应的正式字段值填进去
		        var fieldName=trEle.cells[1].firstChild.value;
		        //alert(111)

		        this.upFieldsInServer[upID]['字段名']=fieldName;

		      }
		    }
		    //console.log(this.upFieldsInServer);
		  }else{//客户端新添加的记录

		    if(typeof this.upFieldsInClient[parentTrRowID]=="undefined"){

		        this.upFieldsInClient[parentTrRowID]={};

		    }

		    for(var i = 1, leng = tmpheadf.length; i < leng; i++){
		    	this.upFieldsInClient[upID][tmpheadf[i]]=trEle.cells[i].firstChild.value;
		    }

		    //this.upFieldsInClient[parentTrRowID][tmpfieldName]=value;



		    //这里不是很明白！！！！！！！！！！！！！！！！！！
		    if(tableID == "recTable_design" && clickEleType!="select"){

		      var fieldType=trEle.cells[2].firstChild.value;

		      var tmpfieldType=this.fieldhead[2]

		      this.upFieldsInClient[parentTrRowID][tmpfieldType]=fieldType;
		    }
		  }
		  //console.log(this.upFieldsInServer)
		},

		execFieldsInFieldsInfo:function (tableName,sqltasks){
			//var self = this;
			//console.log('更新的多有信息',sqltasks);
			var delRecords = sqltasks['delete'],//数组[]
      		upRecords  = sqltasks['update'],//{'1':{}}
      		addRecords  = sqltasks['add'];//{'new1':{}}
			//console.log(upRecords,delRecords,addRecords);
			var Otmpdel = this.delFieldsInFieldsInfoSQL(tableName,delRecords);
			var Otmpup = this.upFieldsInFieldsInfoSQL(tableName,upRecords);
			var Otmpadd = this.addFieldsInFieldsInfoSQL(tableName,addRecords);

			var sqltasksall = [];
			if(Otmpdel){
				sqltasksall.push(Otmpdel['del']);
				sqltasksall.push(Otmpdel['update']);
			}
			if(Otmpup){
				sqltasksall.push(Otmpup);
			}
			if(Otmpadd){
				this.addfieldsIsNotnull(Otmpadd,sqltasksall,tableName);
			}else{
				this.sqltaskexec(sqltasksall);	
			}
		},

		//返回对象，sqltask中删除的格式
		delFieldsInFieldsInfoSQL:function (tableName,delRecords){
			if(delRecords.length == 0){return false;}
			var Odeltask = {'mt':"SQLDelete","tablename":'g_fieldsdef',"KeyFld":"id","key":[]};
			var Ocleartask = {'mt':"SQLExec",'SQL':"update " + tableName + " set "}; 
			//console.log(fieldsVn);
			var fieldv = this.fieldsVn;
			var Oclear=[];
			for(var i = 0,leng = fieldv.length;i < leng;i++){
				for(var j = 0,leng2 = delRecords.length;j < leng2; j++){
					if(fieldv[i]['id'].toString() === delRecords[j].toString()){
						//Ocleartask['fldnames'].push(fieldv[i]['field']);
						Oclear.push(fieldv[i]['field']);
						Ocleartask['SQL'] += fieldv[i]['field'] + "='',";
					}
				}	
			}
			var strlen = Ocleartask['SQL'].length;
			Ocleartask['SQL'] = Ocleartask['SQL'].substr(0,strlen - 1);
			for(var jj = 0,leng2 = delRecords.length;jj < leng2; jj++){
				Odeltask['key'].push(delRecords[jj]);
			}
			//console.log(Odeltask,Ocleartask);
			return {'del':Odeltask,'update':Ocleartask}
		},

		//返回对象，sqltask中更新的格式
		upFieldsInFieldsInfoSQL:function (tableName,upRecords){
			var Ouptask = {'mt':"SQLUpdate","tablename":'g_fieldsdef',"fldnames":[],'data':[]};
			var execinfo= this.upFieldsInFieldsInfo1(upRecords);
			//console.log(execinfo);
			var Atmpenfields = this.fieldheadVn;
			if(execinfo){
				Ouptask["fldnames"] = execinfo['Fields'];
				Ouptask["data"] = execinfo['Data'];
				//var params = {'Fields':Atmpenfields,'data':addArr};
				//return params;
				//console.log(Ouptask)
				return Ouptask;
			}else{
				return false;
			}
			
		},
		//保存修改字段名称,只更新有的字段信息
		upFieldsInFieldsInfo1:function (upRecords){
			//console.log(upRecords)
			var Apostdata = [];
			var Atmpfields = this.fieldhead;
			var Atmpenfields = this.fieldheadVn;
			var num = 0;
			for(var key in upRecords){
				//var setvalue = '';
				num++;
				var tmpdata = [];
				tmpdata.push(parseInt(key));//添加id号
				for(var i = 1,len = Atmpfields.length;i < len; i++){
					//如果uprecords中有Atmpfields对应的数据就push进去
					if(upRecords[key][Atmpfields[i]] || upRecords[key][Atmpfields[i]] == ''){
						

						tmpdata.push(upRecords[key][Atmpfields[i]]);

					}/*else{
						tmpdata.push('');
					}*/
				}
				Apostdata.push(tmpdata);
			}
			if(num === 0){
				return false;
			}else{
				var params={'Fields':Atmpenfields,'Data':Apostdata}
				return params;
			}
		},
		//返回对象，sqltask中添加的格式
		addFieldsInFieldsInfoSQL:function (tableName,addRecords){
			//console.log(addRecords);
			//alert(123);
			var Oaddtask = {'mt':"SQLInsert","tablename":'g_fieldsdef',"fldnames":[],'data':[]};
			var addArr = [];
			var Atmpfields = this.fieldhead;
			var tmpenf = this.fieldheadVn;
			var Atmpenfields = ['tabname','field'].concat(tmpenf);
			Atmpenfields.splice(2,1);//['tabname','field','fieldrealname','fieldtype','unit']
			//console.log(Atmpenfields);
			//alert(12345);
			var num = 0;
			for(var key in addRecords){
				num++;
				//alert(1234);
				//console.log(addRecords[key]);
				var tmparr=[];
				for(var i = 0, len = Atmpfields.length; i < len; i++){
					//console.log(Atmpfields[i]);
					if(addRecords[key][Atmpfields[i]]){
						tmparr.push(addRecords[key][Atmpfields[i]]);
					}else{
						tmparr.push('');
					}
				}
				tmparr.splice(0, 0, tableName);
				tmparr.splice(1, 1, '');
				addArr.push(tmparr);
			}
			Oaddtask["fldnames"] = Atmpenfields;
			Oaddtask["data"] = addArr;
			//console.log(Oaddtask)
			//var params = {'Fields':Atmpenfields,'data':addArr};
			//return params;
			if(num == 0){
				return false;
			}else{
				return Oaddtask;
			}	
		},

		addfieldsIsNotnull:function (Otmpadd,slqtasks,tableName){
		  var self = this;
		  var sqlservice = new gEcnu.WebSQLServices.SQLServices({'processCompleted':function(tmp,fields){

		   // console.log(tmp,fields);
		    var totalnum = [];
		    for(var t = 1; t <= 100; t++){
				totalnum.push(t);
			}
		    var fieldsnum = [];
		    for(var q = 0; q < 100; q++){
		    	for(var i = 0, lent = tmp.length; i < lent; i++){
		    		var fnum = parseInt(tmp[i]['field'].substring(1));
		    		if(totalnum[q] == fnum){
		    			totalnum.splice(q,1);
		    		}
		    	}
		    }
		    if(totalnum.length < Otmpadd['data'].length){
		    	alert('数据库资源不足，不能添加字段！');
		    	return;
		    }
		    for(var j =0, l = Otmpadd['data'].length; j < l; j++){
		    	Otmpadd['data'][j][1] = "V" + totalnum[j];
		    }
		   	slqtasks.push(Otmpadd);
		   	self.sqltaskexec(slqtasks);

		  },'processFailed':function (){alert('请求字段失败！');return false;}});
		  var qrysql = {'fields':"field,fieldRealname","lyr":'g_fieldsdef','filter':"tabname=" + "'" + tableName + "'"};
		  sqlservice.processAscyn(gEcnu.ActType.SQLQUERY,'mapb',qrysql);
		},

		sqltaskexec:function (slqtasks){
			var self= this;
			if(slqtasks.length == 0){
				alert('保存成功1！');
				this.refresh();
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
		     	self.refresh();
		     	self.ResetOprateData();
		     	//tableOpe_table(tableOpenOrDesign);
		        //dataReset();
		     	alert('保存成功！');
		     	return;
		     }else{
		     	self.refresh();
		     	self.ResetOprateData();
		     	//tableOpe_table(tableOpenOrDesign);
		        //dataReset();
		     	alert('保存失败！');
		     	return;
		     }
		    },'processFailed':function (){alert('保存失败');return false;}});
		    //var qrysql = {'fields':"field","lyr":'fieldsdef','filter':delIds};    //根据用户id
		    sqlservice.processAscyn(gEcnu.ActType.SQLTask,'mapb',slqtasks);
		},

		//重置内存中所有修改的表格数据
		ResetOprateData: function (){
			this.upFieldsInServer = {};

			this.upFieldsInClient = {};

			this.delFieldsInServer = [];

			this.delFieldsInClient = [];

		},

		unbindevt: function (tableid){
			$("#"+tableid+" td input").unbind('onchange');
			$("#"+tableid+" td input").prop('disabled',true);
			$("#"+tableid+" td select").unbind('onchange');
			$("#"+tableid+" td select").prop('disabled',true);
		},

		saveData: function (){
			var upfins = this.upFieldsInServer;

			var upfinc = this.upFieldsInClient;

			var delfins = this.delFieldsInServer;

			var delfinc = this.delFieldsInClient;

			var tablereal = this.tbrealname;
			//console.log(upfins)

			this.addCustomEvt._events.savedata('tbdesign',tablereal,upfins,upfinc,delfins,delfinc);
		},

		addCustomEvt: {
			_events:{},

			on: function (evttype,callback){
				switch (evttype){
					case 'savedata':
					this._events.savedata = callback;
					break;
				}
			}
		}

	}

	$('.rtv-tbfieldsinner').perfectScrollbar();

	/*$('.rtvtf-btn').click(function (){
		var designtbid = 'recTable_design';
		var qx = tbDesignMod.tbqx;
		var tbtype = tbDesignMod.tabtype;
		if(qx === 1){
			alert('不具有编辑权限，该表不能编辑！');
			return;
		}
		var val = $(this).val();
		switch (val){
			case '添加':
			if(tbtype == 'ftset'){alert('地图属性数据不允许添加字段！');return;}
			tbDesignMod.addrow(qx,designtbid);
			break;

			case '删除':
			if(tbtype == 'ftset'){alert('地图属性数据不允许删除字段！');return;}
			tbDesignMod.deleteRows(qx,designtbid);
			break;

			case '保存':
			tbDesignMod.saveData();
			break;
		}
	});*/

	module.exports = tbDesignMod;
});