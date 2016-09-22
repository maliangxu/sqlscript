--用户分享资源：一次性插入多条记录

get_db sysdb

--判断是否存在该图层
select -1 as sql_result,'there not exists this layer or ftset,please check' as sql_msg
where not exist(
	select resname from sysdb_resources
    where resowner=:userid and resname=:resname and flag>=0
)

--获取resid
select 'resid='||resid as sql_add_param
from sysdb_resources
where resowner=:userid and resname=:resname and flag>=0

insert or replace into sysdb_resControl(flag,resid,groupname,sharetype,rescdesc)
select 0,:resid,groupname,:sharetype,:rescdesc 
from sysdb_usergroups
where groupname in (::groupnames)

put_db
