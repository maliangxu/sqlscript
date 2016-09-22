get_db_update logdb

insert  into log(userip,userid,acctime,app,module,spantime,succ,msg,reqsize,ressize,p1,p2,p3,p4,p5,p6,p7,p8)
values(:userip,:userid,:acctime,:app,:module,:spantime,:succ,:msg,:reqsize,:ressize
      ,:map,:maptool,:mapZoom,:mapWidth,:mapHeight,:mapCenterX,:mapCenterY,:clearmap)

put_db_update