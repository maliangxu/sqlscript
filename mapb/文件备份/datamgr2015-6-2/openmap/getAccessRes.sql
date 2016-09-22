
--获取用户可访问的某种资源，如地图资源
--传入参数：userid、restype
get_db sysdb,publicdb

--用户自己的资源
select r.* from sysdb_resources r 
where resowner=:userid and restype=:restype

--用户可访问的资源（owner不是该用户的）
select r.*,rc.sharetype from sysdb_resources r 
  join sysdb_resControl rc on r.resid=rc.resid
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype=:restype and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union 
select r.*,rc.sharetype from sysdb_resources r 
join sysdb_resControl rc on r.resid=rc.resid
where groupname='public' and r.restype=:restype  and rc.flag>=0 and r.flag>=0
--对所有组开放的数据 （公开数据） 


put_db