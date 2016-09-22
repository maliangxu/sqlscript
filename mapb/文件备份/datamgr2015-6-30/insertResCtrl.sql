--用户分享资源：一次性插入多条记录

get_db sysdb

--判断是否存在该图层



insert or replace into sysdb_resControl(flag,id,groupname,sharetype,rescdesc,transfer)
select 0,r.id, up.groupname,:sharetype,:rescdesc,:transfer
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and (r.resid in (::resids) and r.restype=:restype and r.flag>=0)
--and (r.resid in (::resids)  and r.resowner=:userid and r.restype=:restype and r.flag>=0)

put_db


