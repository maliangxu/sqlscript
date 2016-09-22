define(function (require, exports, module){

	var _sqlsearchmod = require('sqlsearchmod/sqlsearchmod');

	var _opentablemod = require('tableview/opentable')

	var chartsmod = {
		init: function (){
			var showflag = this.ifHasShow();
			if(showflag){
				this.alltablesshow();
				return;
			}

			this.configshow();
			this.fields = _sqlsearchmod.fieldSearch;
			this.fldalias = _sqlsearchmod.queryfields;
			this.typefields = _sqlsearchmod.fldTypeSearch;
			this.unitfields = _sqlsearchmod.fldUnitSearch;
			this.alldata = _sqlsearchmod.tballdatas;

console.log(this.fields);
//return
			if(!this.fields || this.fields.length < 1){
				this.fields = _opentablemod.fields_tmp;
				this.fldalias = _opentablemod.fields_alias;
				this.typefields = _opentablemod.fields_type;
				this.unitfields = _opentablemod.fields_unit;
				this.alldata = _opentablemod.currentpagedata;
			}

			if(this.fields.length == 0){
				alert('无数据无法生成图表！');
				return;
			}
			console.log(this.fields)
			console.log(this.alldata)

			this.createChoseZd('rtvmc-ul');
			this.createXsel('rtvmc-xbz');
		},

		createXsel: function (radioul){
			$('#'+radioul).empty();
			var zwfields = this.fields;
			var doc = document;
			var sel = doc.getElementById(radioul);
			for(var i= 0, l = zwfields.length; i < l; i++){
				if(zwfields[i] == 'fid'){
					continue;
				}
				var li = doc.createElement('li');
				li.className = 'ros-sqlzli';
				var radio = doc.createElement('input');
				radio.type = 'radio';
				radio.name = 'ros-sqlradio';
				radio.className = 'ros-sqlptclass';
				radio.id = 'ros-sqlradio'+i;
				if( i == 0 ){
					radio.checked = true;
				}
				/*check.setAttribute('data-realzd',ywfields[i]);
				check.setAttribute('data-unit',unitfield[i]);
				check.setAttribute('data-type',typefield[i]);*/
				var label = doc.createElement('label');
				label.setAttribute('for','ros-sqlradio'+i);
				label.innerHTML = zwfields[i];
				label.title = zwfields[i];
				li.appendChild(radio);
				li.appendChild(label);
				sel.appendChild(li);
			}
		},

		ifHasShow: function (){
			if($('.rtv-chart').css('display') == 'block'){
				return true;
			}
			return false;
		},

		createChoseZd: function (ulid){
			$('#'+ulid).empty();
			var zwfields = this.fields;
			var typefield = this.typefields;
			/*var ywfields = this.fieldalias;
			var unitfield = this.fieldunit;
			var typefield = this.fieldtype;*/

			var doc = document;
			var sel = doc.getElementById(ulid);
			var ifchecked = false;
			for(var i= 0, l = zwfields.length; i < l; i++){
				if(zwfields[i] == 'fid'){
					continue;
				}
				var tmptype = typefield[i].toLowerCase();
				if(tmptype == 'int' || tmptype == 'double' || tmptype=="real" || tmptype == "float"){
					var li = doc.createElement('li');
					li.className = 'ros-sqlzli';
					var check = doc.createElement('input');
					check.type = 'checkbox';
					check.name = 'ros-sqlcheck';
					check.className = 'ros-sqlptclas';
					check.id = 'ros-sqlcheck'+i;
					if(!ifchecked){
						check.checked = true;
						ifchecked = true;
					}
					/*check.setAttribute('data-realzd',ywfields[i]);
					check.setAttribute('data-unit',unitfield[i]);
					check.setAttribute('data-type',typefield[i]);*/
					var label = doc.createElement('label');
					label.setAttribute('for','ros-sqlcheck'+i);
					label.innerHTML = zwfields[i];
					label.title = zwfields[i];
					li.appendChild(check);
					li.appendChild(label);
					sel.appendChild(li);
				}
			}
			var li1 = doc.createElement('li');
			li1.className = 'ros-sqlzli1';
			//li1.setAttribute('data-realzd',ywfields[i]);
			var check1 = doc.createElement('input');
			check1.type = 'checkbox';
			check1.name = 'ros-sqlcheck';
			check1.className = 'ros-sqlptclas2';
			check1.id = 'ros-sqlcheckall';
			var label1 = doc.createElement('label');
			label1.setAttribute('for','ros-sqlcheckall');
			label1.innerHTML = '全选';
			label1.style.fontWeight = 'bold';
			li1.appendChild(check1);
			li1.appendChild(label1);
			sel.appendChild(li1);
		},

		createchart: function (){
			var chartoption = this.collectData();
			console.log(chartoption)
			var eleid = 'rtvcs-inner';
			this.chartshow();
			this.makeChart(eleid,chartoption);
		},

		collectData:function (){
			var value_series=[];//字段值
			value_series = this.getFieldarr();
			var data_fields = this.fields;
			var tbdatas = this.alldata;

			var type_series=[];//各个系列的标的类型
			/*$('#rtvmc-zdchoose').children('option').each(function(){
				value_series.push($(this).val());
			});*/
			var chart_title='';//表名
			var ytitle='';//Y轴的名称
			var legend_pos='';//图例的位置
			var series_name_arr=value_series;
			for(var i=0;i<value_series.length;i++){
				type_series[i]=$('#rtvmc-select_name').val();
			}

			var chart_type=type_series;

			var xziduan=$('.ros-sqlptclass:radio[name=ros-sqlradio]:checked').next().text();

			var tmptotal=this.preparedata(value_series,xziduan,data_fields,tbdatas);
			var data_arr=tmptotal.ydataarr;
			var Xcategories=tmptotal.xcatetory;

			return {
				chart_title: chart_title,
		  		chart_type: chart_type,
		  		Xcategories: Xcategories,
		  		ytitle: ytitle,
		  		legend_pos: legend_pos,
		  		series_name_arr: series_name_arr,
		  		data_arr: data_arr
			}
		},

		preparedata:function (arrs,xval,data_fields,datas){
			console.log(arrs,xval,data_fields,datas)
		  var index_arr=[];//字段的index
		  var index_xziduan;//x轴字段
		  var x_arr = [];
		  var len=data_fields.length;
		  for(var i=0;i<len;i++){
		    if(data_fields[i]==xval){
		      index_xziduan=i;
		    }
		    for(var j=0,len2=arrs.length;j<len2;j++){
		      if(data_fields[i]==arrs[j]){
		        index_arr.push(i);
		      }
		    }
		  }
		  var data_arr=[]; draw_data=[];
		  var xcatetory_arr=[];
		  var len4=index_arr.length
		  for(var t=0;t<len4;t++){
		    data_arr[t]=[]; draw_data[t]=[];
		  }
		  for(var m=0,len3=datas.length;m<len3;m++){
		    var xputdata;
		    //if(data_fields[index_xziduan]==='ID'){//即为ID
		      xputdata=datas[m][index_xziduan];
		    //}else{
		      //xputdata=datas[m][index_xziduan];
		    //}
		    xcatetory_arr.push(xputdata); x_arr.push(xputdata);
		    for(var n=0;n<len4;n++){
		      var putdata;
		      //if(data_fields[index_arr[n]]==='ID'){//即为ID
		        putdata=Number(datas[m][index_arr[n]]);
		      //}else{
		        //putdata=Number(seltrs[m][index_arr[n]]);
		     // }
		      data_arr[n].push(putdata);
		      draw_data[n].push(putdata);
		    }
		  }
		  console.log(data_arr,xcatetory_arr)
		  return {
		    ydataarr:data_arr,
		    xcatetory:xcatetory_arr
		  };
		},

		makeChart:function (eleid,options){ 
		  var chartset = {};
		  var series=[];
		  var tooltips={};
		  var chart_type_len=options.chart_type.length;
		  for(var k=0;k<chart_type_len;k++){
		    series[k] = {};
		    series[k].name = options.series_name_arr[k];
		    if(options.chart_type[k] === 'polar'){
		      chartset = { polar: true };
		      series[k].type = 'line';
		    }else{
		      series[k].type = options.chart_type[k];
		    }
		    
		    if(options.chart_type[k] === 'pyramid' || options.chart_type[k] === 'pie'){
		      series[k].data=[];
		      for(var t=0;t<options.data_arr[k].length;t++){
		        series[k].data.push([options.Xcategories[t],options.data_arr[k][t]]);
		      }
		      options.Xcategories=[];
		    }else{
		      series[k].data = options.data_arr[k];
		    }
		    if(options.chart_type[k] === 'scatter'){
		      tooltips={
		        formatter:function(){
		          return '<b>'+this.series.name+'</b><br><span>x:'+this.x+'</span><br><span>y:'+this.y+'</span>'
		        }
		      }
		    }
		  }

		  var legendset={};
		  var pos=options.legend_pos.toLowerCase();
		  if(pos==="left"||pos==="right"){
		    legendset.align = pos;
		    legendset.layout = 'vertical';
		    legendset.verticalAlign = 'middle';
		  } else {
		    legendset.layout = 'horizontal';
		  }
		  
		  (function(H) { 
		    var each = H.each;
		    H.wrap(H.seriesTypes.column.prototype, 'drawPoints', function(proceed) {
		        var series = this;
		        if(series.data.length > 0 ){
		            var width = series.barW > series.options.maxPointWidth ? series.options.maxPointWidth : series.barW;
		            each(this.data, function(point) {
		                point.shapeArgs.x += (point.shapeArgs.width - width) / 2;
		                point.shapeArgs.width = width;
		            });
		        }
		        proceed.call(this);
		  })
		  })(Highcharts);

		//console.log(chartset);

		  $('#'+eleid).highcharts({
		    chart: chartset,
		    title: {
		      text: options.chart_title,
		      tyle: {
		          fontFamily:'宋体,Arial'
		      }
		    },
		    subtitle:{

		    },
		    xAxis: {
		      categories: options.Xcategories
		      //tickPixelInterval:70
		    },
		    yAxis: {
		      title: {
		        text:options.ytitle
		      },
		      lineWidth: 1
		      //tickPixelInterval:70
		    },
		    tooltip: tooltips,
		    legend: legendset,
		    series: series,
		    plotOptions: {
		      series:{
		        maxPointWidth:45
		      },
		      pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        depth: 35,
		        dataLabels: {
		            enabled: false,
		        },
		        showInLegend: true,
		        size:300
		      }
		    },
		    credits: {
		      enabled: false,
		      text:''
		    },
		    exporting: {
		      enabled: true,
		      buttons: {
		        contextButton: {
		          symbol:'menu',
		            text: '导出',
		            theme: {
		              'stroke-width': 1,
		              stroke: 'silver',
		              r: 0,
		              states: {
		                  
		              }
		          },
		          x:-20
		        }
		      }
		    },
		    colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
		  });
		},

		getFieldarr: function (){
			//this.queryfields = [];
			var fieldarr = [];
			$('.ros-sqlptclas').filter(function (){
				if($(this).prop('checked')){
					fieldarr.push($(this).next().text());
				}
			});
			//this.queryfields = fieldarr;
			return fieldarr;
		},

		configshow: function (){
			$('.rtv-chart').nextAll().css('display','none');
			$('.rtv-chart').prevAll().css('display','none');
			$('.rtv-chart').css('display','block');
		},

		chartshow: function (){
			$('.rtv-chartshow').nextAll().css('display','none');
			$('.rtv-chartshow').prevAll().css('display','none');
			$('.rtv-chartshow').css('display','block');
		},

		sqltableshow: function (){
			$('.rtv-sqltbdataout').nextAll().css('display','none');
			$('.rtv-sqltbdataout').prevAll().css('display','none');
			$('.rtv-sqltbdataout').css('display','block');
		},

		alltablesshow: function (){
			$('.rtv-tbdataout').nextAll().css('display','none');
			$('.rtv-tbdataout').prevAll().css('display','none');
			$('.rtv-tbdataout').css('display','block');
		}

	}

	$('#rtv-cancelchart1').click(function (){
		//chartsmod.sqltableshow();
		chartsmod.alltablesshow();
	});

	$('#rtv-nextchart').click(function (){
		chartsmod.createchart();
	});

	$('#rtvmc-ul').on('click','.ros-sqlptclas2',function (){
		if($(this).prop('checked')){
			$('.ros-sqlptclas').prop('checked',true);
		}else{
			$('.ros-sqlptclas').prop('checked',false);
		}
		
	});

	$('#rtv-closechart').click(function (){
		//chartsmod.sqltableshow();
		chartsmod.alltablesshow();
	});

	module.exports = chartsmod;
});