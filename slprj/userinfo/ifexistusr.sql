get_db slprj

--查找用户表
select -1 as sql_result,'账号不存在或密码错误' as sql_msg
where not exists(
select * from slprj_users 
where userid=:userid and pass=:pass 
)

select  1 as sql_result,'账号存在' as sql_msg
where  exists(
select * from slprj_users 
where userid=:userid and pass=:pass 
)


put_db