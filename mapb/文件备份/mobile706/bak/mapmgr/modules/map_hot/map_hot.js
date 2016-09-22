  //查询userid所在组的其他成员分享的资源（不包括自己的）
  define(function(require, exports, module) {

    var res_id = [];
    var share_type = [];
    var hot_owner = [];
    var map_resdesc = [];
    var imgURLPre = gEcnu.config.geoserver+"fileserver?fn=upload/";

    var mapHotFun = {
      resultMap : function (callback) {
          var that=this;
          var userID = sessionStorage.getItem("usrID");
          var getPara = {"scriptname":"mapb.home.resType_get",
                        "userid":userID,
                        "restype":"map"
                      };
          var sqlScript = new gEcnu.WebsqlScript({'processCompleted':function(msg){alert("成功啦~~");

          var reJson = msg.queryResult;          console.log(reJson);
     
          var htmlStr = "";
          for (var i = 0; i < reJson.length; i++) {

          htmlStr = htmlStr + '<li class="myDataChildDiv"><div class="myData_caption">' + reJson[i].RESDESC +'<span><img src="common/imgs/arrow.png"></span></div><div class="myData_img"><img src=' + imgURLPre+reJson[i].IMGURL +' alt=' + reJson[i].RESDESC +'></div><div class="myData_imgComment"><p>特征描述：该数据来源于…，主要说明了…的情况。</p><p>创建时间：2015/06/19</p></div><div class="myData_comment"><ul class="myData_commentList"><li class="myData_commentList_share"><img src="common/imgs/share.png" alt="share"><span>32</span></li><li class="myData_commentList_comment myData_commentList_border"><img src="common/imgs/comment.png" alt="comment"><span>58</span></li><li class="myData_commentList_zan"><img src="common/imgs/zan.png" alt="zan"><span>66</span></li></ul></div></li> ';

          share_type = share_type.concat(reJson[i].SHARETYPE);
          res_id = res_id.concat(reJson[i].RESID);
          hot_owner = hot_owner.concat(reJson[i].RESOWNER);   
          map_resdesc = map_resdesc.concat(reJson[i].RESDESC);     
          };

          $("#mapHotUl").html(htmlStr);  

          callback();
          
          },'processFailed':function(){}});
          sqlScript.processAscyn(getPara);    
      },

      Link2Datamgr : function (Num) { 
        var obj={"mapId":res_id[Num],"mapName":map_resdesc[Num],"shareType":share_type[Num],"owner":hot_owner[Num]};
        sessionStorage.setItem("mapMsg", JSON.stringify(obj));
        window.open("../mapmodule/index.html",'_self');
      }

    }
    module.exports = mapHotFun;

  })
