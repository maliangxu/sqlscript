get_db_update sysdb

--查找用户表
select -1 as sql_result,'账号不存在或密码错误' as sql_msg
where not exists(
select * from sysdb_users 
where userid=:userid and pass=:pass and flag>=0
)

select userid,validity from sysdb_users 
where userid=:userid and flag>=0

--保存访问记录
insert or replace into users_online(ECNUID,userid,access_time,access_url,access_param)
values(lower(hex(randomblob(16))),:userid,datetime('now','localtime'),'dl','')

--保存变量 ECNUID 供后续使用
select 'ECNUID='||ECNUID as sql_add_param
from users_online
where userid=:userid

--检查是否cert验证
select -2 as sql_result,'设备未验证' as sql_msg
where not exists(
select * 
from users_online 
where ECNUID=:ECNUID  
)

--保存访问记录
update users_online
set userid=:userid
where ECNUID=:ECNUID

--返回结果 设置cookie 
select  1 as sql_result,'登录成功 '||:userid as sql_msg

select username from sysdb_users 
where userid=:userid and flag>=0

put_db_update