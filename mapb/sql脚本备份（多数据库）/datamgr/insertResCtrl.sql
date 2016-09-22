--用户分享资源：一次性插入多条记录

get_db sysdb

insert or replace into sysdb_resControl(flag,resid,groupname,sharetype,rescdesc)
select 0,r.resid, up.groupname,:sharetype,:rescdesc 
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and  (r.resname in (::resnames)  and r.resowner=:userid  and r.flag>=0)

put_db