--用户分享资源：一次性插入多条记录

get_db sysdb

--获取resid
select 'resid='||resid as sql_add_param
from sysdb_resources
where resowner=:userid and resname=:resname and flag>=0

insert or replace into sysdb_resControl(flag,resid,groupname,sharetype,rescdesc)
select 0,:resid,groupname,:sharetype,:rescdesc 
from sysdb_usergroups
where groupname in (::groupnames)

put_db
