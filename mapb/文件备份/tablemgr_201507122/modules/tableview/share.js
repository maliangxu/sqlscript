define(function (require, exports, module){
	var sharemod = {

		putarr:[],//选择的组名，数组

		init: function (username,dbid){
			var self = this;
			this.dbid= dbid;
			this.username = username;
			this.show();
			this.putarr=[];
			this.getGroups(username,function (grouparr){
				console.log(grouparr);
				var flag = grouparr[0]['SQL_RESULT'] ? grouparr[0]['SQL_RESULT'] : 1;
				if(flag < 0){
					return;
				}else{
					self.createGroupList('rtvm-grouplist',grouparr);
				}
			});
		},

		getGroups: function (username,callback){
			var path ="mapb.tablemgr.tbtool.getGroupsOfUser"
			var option = {
				"scriptname": path,
				"username": username
			}
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					var garr = msg.queryResult;
					callback(garr);
				},	
				"processFailed":function (){alert("获取组信息失败！")}});
			sqlscript.processAscyn(option);
		},

		createGroupList: function (selid, grouparr){
			var ulist = document.getElementById(selid);
			for(var i = 0, l = grouparr.length; i < l; i++){
				var li = document.createElement('li');
				li.className = "rtvm-groupli";
				var checkbox = document.createElement('input')
				checkbox.type = 'checkbox';
				checkbox.id = "rtvm-groupli"+i;
				var label = document.createElement('label');
				label.setAttribute('for',"rtvm-groupli"+i);
				label.innerHTML = grouparr[i]['GROUPNAME'];
				li.appendChild(checkbox);
				li.appendChild(label);
				ulist.appendChild(li);
			}
		},

		show: function (){
			$('.rtv-share').nextAll().css('display','none');
			$('.rtv-share').prevAll().css('display','none');
			$('.rtv-share').css('display','block');
		},

		hide: function (){
			$('.rtv-share').css('display','none');
			$('.rtv-tbdataout').css('display','block');
		},

		getEleIndex: function (ele,arr){
			for(var i = 0, len = arr.length; i < len; i++){
				if(ele == arr[i]){
					return i;
				}
			}
			return -1;
		},

		createinput: function (inputid,arr){
			$('#'+inputid).val('');
			var str='';
			for(var i = 0, l = arr.length; i < l; i++){
				if(i == 0){
					str += arr[i];
				}else{
					str += ';' + arr[i];					
				}
			}
			console.log(str)
			$('#'+inputid).val(str);
		},

		validate: function (){
			var groupchose = this.putarr;
			if(groupchose.length<=0){
				alert('请选择要分享的组！');
				return false;
			}
			var mod = $('#rtvm-qxlist input:radio[name="rtvm-radio"]:checked').attr('data-mod');
			if(mod === undefined){
				alert('请选择要分享类型！');
				return false;
			}
			return true;
		},

		sharedb: function (username, gchoosearr, mod, desc, dbid){
			var groups = '';
			for(var i = 0, len = gchoosearr.length; i < len; i++){
				if(i == 0){
					groups += "'" + gchoosearr[i] + "'";
				}else{
					groups += ",'" + gchoosearr[i] + "'";
				}
			}
			 
			var path = "mapb.tablemgr.tbtool"
			var option = {
				'scriptname':'',
				'username':username,
				'groupnames':groups,
				'sharetype':'',
				'resdesc':desc,
				'dbid':dbid

			}
			var sqlscript = new gEcnu.WebsqlScript({"processCompleted":function(msg){
					//var garr = msg.queryResult;
					//callback(garr);
					console.log(msg);
				},	
				"processFailed":function (){alert("分享失败！")}});	
			switch(mod) {
				case 'read':
					option.scriptname = path + '.readshare';
					option.sharetype = '1';
					break;
				case 'copy':
					alert('暂不支持该分享！');
					return;
					break;
				case 'common':
					alert('暂不支持该分享！');
					return;
					break;
			}
			sqlscript.processAscyn(option);
		}
	}

	$('#rtvm-groupname').click(function (){
		$('#rtvm-grouplist').css('display','block');
	})
	$('#rtvm-groupname').focus(function (){
		$('#rtvm-grouplist').css('display','block');
	})

	$('#rtvm-grouplist').mouseleave(function (){
		$(this).css('display','none');
	})

	$('#rtvm-grouplist').on('click',"input",function (e){
		var groupname = $(this).next().text();
		var garr = sharemod.putarr;
		if($(this).prop('checked')){
			garr.push(groupname);
		}else{
			var index = sharemod.getEleIndex(groupname, garr);
			garr.splice(index, 1);
		}
		console.log(garr)
		sharemod.createinput('rtvm-groupname',garr);
	});

	$('#rtv-cancelshare').click(function (){
		sharemod.hide();
	})

	$('#rtv-okshare').click(function (){
		var flag = sharemod.validate();
		if(!flag){
			return;
		}
		var mod = $('#rtvm-qxlist input:radio[name="rtvm-radio"]:checked').attr('data-mod');
		var gchoosearr = sharemod.putarr;
		var dbid = sharemod.dbid;
		var desc = $('#rtvm-desctext').val();
		var username = sharemod.username;
		sharemod.sharedb(username, gchoosearr, mod, desc, dbid);
	})

	module.exports = sharemod;
});