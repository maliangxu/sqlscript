get_db sysdb

--查找用户表

select 1 as sql_result,'is exist' as sql_msg
where exists(
select * from sysdb_users 
where userid=:userid and flag>=0
)


put_db