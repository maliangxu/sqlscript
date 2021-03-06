--用户分享地图：

get_db sysdb




--地图分享
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype,rescdesc)
select 0,r.id, :userid,up.groupname,:sharetype,:rescdesc
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and r.resid =:mapid and r.restype='map' and r.flag>=0

--copy、write型分享的地图： 对应的图层分享方式 read类型分享图层
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype)
select 0,r.id, :userid,up.groupname,1
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and (r.resid in (::readresid) and r.restype='lyr' and r.flag>=0)

--如果有协同图层
insert or replace into sysdb_resControl(flag,id,shareby,groupname,sharetype)
select 0,r.id, :userid,up.groupname,3
from sysdb_usergroups up,sysdb_resources r
where  (up.groupname in (::groupnames) and up.userid=:userid and up.flag>=0 )
and (r.resid in (::coopresid) and r.restype='lyr' and r.flag>=0)

--

put_db


