define(function (require, exports, module){

	var opentablemod = require('tableview/opentable');

	var sqlsearchmod = require('sqlsearch/sqlsearch');

	var chartmod = {

		//lastTbid:'',

		init: function (tbid){
			this.configshow();
			var data_fields = this.fields = opentablemod.fields_tmp;
			var type_fields = this.typefields = opentablemod.fields_type;
			//this.seltrs = opentablemod.selectedTrs;
			this.alldata = sqlsearchmod.tballdatas;
			if(this.alldata.length == 0){
				alert('SQL查询数据可以生成图表！');
				return;
			}
			this.tbid = tbid;
			if(this.fields.length == 0){
				alert('无数据无法生成图表！');
				return;
			}
			/*if(this.lastTbid == tbid){
				return;
			}*/
			this.createFieldTypeList(data_fields,type_fields);
		},
		createFieldTypeList: function (data_fields,type_fields){
			$('#rtvmc-zdval').empty();
    		$('#rtvmc-zdchoose').empty();
    		$('#rtvc-biaozhu').empty();

    		var numtype=[];
		    var doc=document;
		    var valuesel=doc.getElementById('rtvmc-zdval');
		    var chart_Xaries=doc.getElementById('rtvc-biaozhu');
		    var fragmentval=doc.createDocumentFragment();
		    var fragmentx=doc.createDocumentFragment();

		    var optionmodel=doc.createElement('option');
		    for(var i=0,len=type_fields.length;i<len;i++){
		      var option=optionmodel.cloneNode(false);
		      if(type_fields[i].toLowerCase()=='int'||type_fields[i].toLowerCase()=='double'){
		        option.value=data_fields[i];
		        option.innerHTML=data_fields[i];
		        var clone=option.cloneNode(true);
		        fragmentval.appendChild(option);
		        fragmentx.appendChild(clone);
		      }else{
		        option.value=data_fields[i];
		        option.innerHTML=data_fields[i];
		        fragmentx.appendChild(option); 
		      }
		    }
		    valuesel.appendChild(fragmentval);
		    chart_Xaries.appendChild(fragmentx);
		},

		pushdata:function (){
  			var nodes=$('#rtvmc-zdval').find('option:selected');
  			nodes.prop('selected',false);
  			$('#rtvmc-zdchoose').append(nodes);
		},

		deletedata:function (){
  			var nodes=$('#rtvmc-zdchoose').find('option:selected');
  			nodes.prop('selected',false);
  			$('#rtvmc-zdval').append(nodes);
		},

		collectData:function (data_fields,tbdatas){
			var value_series=[];//字段值
			var type_series=[];//各个系列的标的类型
			$('#rtvmc-zdchoose').children('option').each(function(){
				value_series.push($(this).val());
			});
			var chart_title=$('#rtvc-chartmingzi').val();//表名
			var ytitle=$('#rtvmc-chartybiaoti').val();//Y轴的名称
			var legend_pos=$('#rtvc-weizhi').val();//图例的位置
			var series_name_arr=value_series;
			for(var i=0;i<value_series.length;i++){
				type_series[i]=$('#rtvmc-select_name').val();
			}
			var chart_type=type_series;
			var xziduan=$('#rtvc-biaozhu').val();
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

		//@params arr是字段数组，xval是x轴的标注字段。哪些字段被选择了.周力杰
		/*preparedata:function (arrs,xval,data_fields,seltrs){
			console.log(arrs,xval,data_fields,seltrs)
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
		  for(var m=0,len3=seltrs.length;m<len3;m++){
		    var xputdata;
		    if(data_fields[index_xziduan]==='ID'){//即为ID
		      xputdata=seltrs[m].find('td').eq(index_xziduan).text();
		    }else{
		      xputdata=seltrs[m].find('td').eq(index_xziduan).find('input').val();
		    }
		    xcatetory_arr.push(xputdata); x_arr.push(xputdata);
		    for(var n=0;n<len4;n++){
		      var putdata;
		      if(data_fields[index_arr[n]]==='ID'){//即为ID
		        putdata=Number(seltrs[m].find('td').eq(index_arr[n]).text());
		      }else{
		        putdata=Number(seltrs[m].find('td').eq(index_arr[n]).find('input').val());
		      }
		      data_arr[n].push(putdata);
		      draw_data[n].push(putdata);
		    }
		  }
		  return {
		    ydataarr:data_arr,
		    xcatetory:xcatetory_arr
		  };
		},*/

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

		//图表生成函数
		createChart:function (eleid,options){ 
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

		confighide: function (){
			$('.rtv-chart').css('display','none');
		},

		configshow: function (){
			$('.rtv-chart').nextAll().css('display','none');
			$('.rtv-chart').prevAll().css('display','none');
			$('.rtv-chart').css('display','block');
			this.configPre(); 
		},

		chartshow: function (){
			$('.rtv-chartshow').nextAll().css('display','none');
			$('.rtv-chartshow').prevAll().css('display','none');
			$('.rtv-chartshow').css('display','block');
		},

		charthide: function (){
			$('.rtv-chartshow').css('display','none');
			this.tableshow();
		},

		tableshow: function (){
			$('.rtv-tbdataout').css('display','block');
		},

		configNext: function (){
			$('#rtvm-chart1').css('display','none').next().css('display','block');
		},

		configPre: function (){
			$('#rtvm-chart2').css('display','none').prev().css('display','block');
		}
	}

	$('#rtv-cancelchart1,#rtv-cancelchart2').click(function (){
		chartmod.confighide();
	});

	$('#rtv-nextchart').click(function (){
		chartmod.configNext();
	});

	$('#rtv-prechart').click(function (){
		chartmod.configPre();
	});

	$('#rtv-okchart').click(function (){
		var chartdivid = 'rtvcs-inner';
		var data_fields = chartmod.fields;
		//var seltrs = chartmod.seltrs;
		var tbdatas = chartmod.alldata;
		var chartoption = chartmod.collectData(data_fields,tbdatas);
		chartmod.chartshow();
		chartmod.createChart(chartdivid,chartoption);
	});

	$('#rtvmc-pushdata').click(function (){
		chartmod.pushdata();
	});

	$('#rtvmc-deletedata').click(function (){
		chartmod.deletedata();
	});

	$('#rtv-closechart').click(function (){
		chartmod.charthide();
	});

	module.exports = chartmod;
});