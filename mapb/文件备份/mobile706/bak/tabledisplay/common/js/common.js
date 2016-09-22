$(document).ready(function(){
   
  seajs.config({
  'base':'./modules/'
  });

	define(function(require){
		require('nav/nav');
	});

})