--获取用户所在的组别
get_db sysdb

select -1 as sql_result,"The user doesn't belong to any groups" as sql_msg
where not exists(
select * from sysdb_usergroups
where userid=:userid
)

select * from sysdb_usergroups where userid=:userid and flag>=0

put_db 