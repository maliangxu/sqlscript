get_db sysdb

--检查是否登录
select -2 as sql_result,'用户未登录' as sql_msg
where not exists(
select * 
from users_online 
where ECNUID=:ECNUID  
)

--是否登录超时
select -3 as sql_result,'用户长时间未操作' as sql_msg
where not exists(
select * 
from users_online 
where ECNUID=:ECNUID and datetime(access_time,'60 minutes')>datetime('now','localtime') 
)

--记录变量值userid
select 'userid='||userid as sql_add_param
from users_online 
where ECNUID=:ECNUID

select  1 as sql_result,'已经登录 '||:userid as sql_msg

put_db