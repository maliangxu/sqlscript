define(function (require, exports, module){

	var storeimgmod = {

		init: function (username, dbid, tbid, tbtype){
			this.dbid = dbid;
			this.username = username;
			this.tbid= tbid;
			this.fileserver = gEcnu.config.geoserver+"fileserver?";
			var tmpdate = new Date();
			//this.imgid = username+tmpdate.getTime();
			this.imgid = ""+tbtype+'_'+tbid;
			this.formatetime = '' + tmpdate.getFullYear() +'年'+ (tmpdate.getMonth() + 1) +'月'+ tmpdate.getDate()+'日';
			var self = this;
			var exportdomid = document.getElementById('rtvt-data');
			html2canvas(exportdomid, {
			  onrendered: function(canvas) {
			  	console.log(canvas)
			  	console.log(self.dbid)
			    var imgdata = canvas.toDataURL();
			    console.log(imgdata);
			    self._upload(imgdata);
			    canvas=null;
			  },
			  width: 400,
			  height: 300
			});
		},
		/**
		 * 生成缩略图上传至服务器
		 * @param  {[type]} imgdata base64编码的图片数据
		 */
		_upload: function (imgdata){
			var requrl = this.fileserver + "req=putbase64"; 
			var resid = this.imgid;
			var filePath = '表格缩略图/' + resid + '.png';
			var self = this;
			
			var param = {'fn':filePath,'con':imgdata};
		  	$.ajax({
			  	url:requrl,
			  	type:'POST',
			  	data:param,
			  	async:false,
			  	success:function (msg){console.log(msg);
			  		self.updResImg(filePath);//更新缩略图 imgurl
			     	//alert('上传图片成功');
				},
				error: function (e){ 
					alert('上传失败');
					//self.updResImg(filePath);
					//console.log(e);
				}
			});	
		},
		/**
		 * 更新资源表中的资源缩略图字段
		 * @param  {String} imgPath 图片的地址
		 */
		updResImg: function (imgPath){
			var storetime = this.formatetime;
			var option={
			"scriptname":"mapb.tablemgr.savetable.saveImg",
			"resid":this.tbid,
			"imgurl":imgPath,
			"storetime":storetime,
			};
			var sqlScript=new gEcnu.WebsqlScript({'processCompleted':function (){

			},'processFailed':function (){alert('上传失败2！')}});
			sqlScript.processAscyn(option);

		}
	}
	module.exports = storeimgmod;
});