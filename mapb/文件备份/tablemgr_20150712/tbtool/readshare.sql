get_db sysdb

--表空间的分享
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype,rescdesc)
select 0,r.id, :username,up.groupname,:sharetype,:resdesc
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and 
up.userid=:username and up.flag>=0 )
and r.resid =:dbid and r.restype='db' and r.flag>=0


put_db