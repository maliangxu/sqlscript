get_db sysdb

--查找用户表
select -1 as sql_result,'账号不存在或密码错误' as sql_msg
where not exists(
select * from sysdb_users 
where userid=:userid and pass=:pass and flag>=0
)

select  1 as sql_result,'账号存在' as sql_msg
where  exists(
select * from sysdb_users 
where userid=:userid and pass=:pass and flag>=0
)


put_db