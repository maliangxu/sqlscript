get_db_update slprj

begin_trans

--查询项目分类
select className
from slprj_prjClass

--查询用户名称和组别
select username,groupname
from slprj_users
where ::filter

end_trans

put_db_update slprj