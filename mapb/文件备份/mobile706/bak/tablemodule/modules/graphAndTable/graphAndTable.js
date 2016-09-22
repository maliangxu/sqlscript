 $(document).ready(function(){
	$('#alreadyMakeGraph').click(function(){
		$('#graphAndTable_graph').css('display','block');
		$('#graphAndTable_tableDiv').css('display','none');
		$('#alreadyMakeGraph').css('backgroundColor','#F09932');
		$('#alreadyMakeGraph').css('color','#FFF');
		$('#chooseTable').css('backgroundColor','#F3F3F3');
		$('#chooseTable').css('color','#F09932');
	});
	$('#chooseTable').click(function(){
		$('#graphAndTable_graph').css('display','none');
		$('#graphAndTable_tableDiv').css('display','block');
		$('#chooseTable').css('backgroundColor','#F09932');
		$('#chooseTable').css('color','#FFF');
		$('#alreadyMakeGraph').css('backgroundColor','#F3F3F3');
		$('#alreadyMakeGraph').css('color','#F09932');
	});
	$('#graphAndTable_tableList li').click(function(){
		window.open("../tabledisplay/index.html",'_self')
	})
 })
	
