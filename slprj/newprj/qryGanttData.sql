﻿get_db_update slprj

begin_trans

--查询甘特图所需数据
select zj_pifu,LX_SUGGEST5,LX_SUGGEST6,LX_SUGGEST1,LX_SUGGEST2,LX_ENESTIMATE5,LX_ENESTIMATE6,LX_ENESTIMATE1,LX_ENESTIMATE2,LX_FEASIBILITY5,LX_FEASIBILITY6,LX_FEASIBILITY1,LX_FEASIBILITY2,LX_PRIRESPOND5,LX_PRIRESPOND6,LX_PRIRESPOND1,LX_PRIRESPOND2,LX_ESTIRESPOND5,LX_ESTIRESPOND6,LX_ESTIRESPOND1,LX_ESTIRESPOND2,GH_CHOOSELOC5,GH_CHOOSELOC6,GH_CHOOSELOC1,GH_CHOOSELOC2,GH_CONSLAND5,GH_CONSLAND6,GH_CONSLAND1,GH_CONSLAND2,GH_PLAN5,GH_PLAN6,GH_PLAN1,GH_PLAN2,GH_PRJPLAN5,GH_PRJPLAN6,GH_PRJPLAN1,GH_PRJPLAN2,TD_GROUP2NATION5,TD_GROUP2NATION6,TD_GROUP2NATION1,TD_GROUP2NATION2,TD_HUABO5,TD_HUABO6,TD_HUABO1,TD_HUABO2,TD_ZHENGDI5,TD_ZHENGDI6,TD_ZHENGDI1,TD_ZHENGDI2,TD_SHEBAO5,TD_SHEBAO6,TD_SHEBAO1,TD_SHEBAO2,TD_HUABOJUEDING5,TD_HUABOJUEDING6,TD_HUABOJUEDING1,TD_HUABOJUEDING2,TD_YONGDIPIZHUN5,TD_YONGDIPIZHUN6,TD_YONGDIPIZHUN1,TD_YONGDIPIZHUN2,TD_ZHENGSHOU5,TD_ZHENGSHOU6,TD_ZHENGSHOU1,TD_ZHENGSHOU2,JG_BAOJIAN5,JG_BAOJIAN6,JG_BAOJIAN1,JG_SHEJIZHAOBIAO5,JG_SHEJIZHAOBIAO6,JG_SHEJIZHAOBIAO1,JG_KANCHAZHAOBIAO5,JG_KANCHAZHAOBIAO6,JG_KANCHAZHAOBIAO1,JG_SHIGONGTU5,JG_SHIGONGTU6,JG_SHIGONGTU1,JG_SHIGONGZHAOBIAO5,JG_SHIGONGZHAOBIAO6,JG_SHIGONGZHAOBIAO1,JG_JIANLIZHAOBIAO5,JG_JIANLIZHAOBIAO6,JG_JIANLIZHAOBIAO1,JG_SHIGONGXUKE5,JG_SHIGONGXUKE6,JG_SHIGONGXUKE1,SJ_GONGCHENG5,SJ_GONGCHENG6,SJ_GONGCHENG3,SJ_CAIWU5,SJ_CAIWU6,SJ_CAIWU3,GD_GUIDANG5,GD_GUIDANG6,GD_GUIDANG1,GD_GUIDANG3,GD_YIJIAO5,GD_YIJIAO6,GD_YIJIAO1 
from slprj_processManage 
where id=:id

end_trans

put_db_update slprj