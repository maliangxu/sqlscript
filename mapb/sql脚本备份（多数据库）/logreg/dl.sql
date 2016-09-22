get_db sysdb

--查找用户表
select -1 as sql_result,'account is not exist or the password is wrong' as sql_msg
where not exists(
select * from sysdb_users 
where userid=:userid and pass=:pass and flag>=0
)

begin_trans

--保存访问记录
insert or replace into users_online(ECNUID,userid,access_time,access_url,access_param)
values(lower(hex(randomblob(16))),:userid,datetime('now','localtime'),'dl','')

end_trans

--保存变量 ECNUID 供后续使用
select 'ECNUID='||ECNUID as sql_add_param
from users_online
where userid=:userid

--返回结果 设置cookie 
select  1 as sql_result,'登录成功 '||:userid as sql_msg,'Set-Cookie:ECNUID='||:ECNUID ||'; path=/' as sql_set_head

put_db