get_db_update slprj

begin_trans

--查询项目分类
select className
from slprj_prjClass

--查询领导批示的负责人
select distinct peCharger
from slprj_ldComment
where ::filter

--查询领导批示的完成情况
select distinct finishSitu
from slprj_ldComment

--查询领导批示的批示领导
select distinct leader
from slprj_ldComment

end_trans

put_db_update slprj