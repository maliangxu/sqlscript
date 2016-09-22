get_db_update slprj

begin_trans

--查询项目名称
select prjName,agent,peCharge
from slprj_conProject
where prjNum = :prjNum

--查询本周期完成情况、备注
select plan,plan4charge,finishSitu,finish4charge,remark,remark4charge
from ::tbname
where id = :thisid

--查询下周期计划
select plan as nextplan,plan4charge as nextplan4charge
from ::tbname
where id = :nextid

end_trans

put_db_update slprj