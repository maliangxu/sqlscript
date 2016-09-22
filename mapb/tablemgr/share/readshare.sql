get_db_update sysdb

--表格的分享
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype,rescdesc)
select 0,r.id, :username,up.groupname,:sharetype,:resdesc
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in ( ::groupnames ) and 
up.userid=:username and up.flag>=0 )
and r.resid =:tbid and r.restype='tb' and r.flag>=0

put_db_update