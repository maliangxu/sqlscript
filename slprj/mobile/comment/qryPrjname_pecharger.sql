get_db_update slprj

begin_trans

--查询项目名称
select prjNum,prjName
from slprj_conProject

--查询所有人员
select username
from slprj_users

end_trans

put_db_update slprj