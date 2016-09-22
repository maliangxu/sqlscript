--用户分享地图：

get_db sysdb




--地图分享
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype,rescdesc,transfer)
select 0,r.id, :userid,up.groupname,:sharetype,:rescdesc,:transfer
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and r.resid =:mapid and r.restype='map' and r.flag>=0

--协同图层
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype,transfer)
select 0,r.id, :userid,up.groupname,3,-1
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and (r.resid in (::lyrresid) and r.restype='lyr' and r.flag>=0)


put_db


