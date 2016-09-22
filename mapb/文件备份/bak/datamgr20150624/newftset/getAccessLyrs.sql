
--获取用户自己的图层
--传入参数：userid、restype
get_db sysdb,mapb


--select r.resid,f.* from sysdb_resources r,g_ftset f
--where r.resid=f.ftset_id and r.resowner=:userid and r.restype=:restype and r.flag>=0 and f.flag>=0


--1、自己的图层
select r.resid,ftsetName,alias,coordsys,xmin,ymin,xmax,ymax from g_ftset f,sysdb_resources r
where r.resowner=:userid and r.resid=f.ftset_id and r.restype=:restype and r.flag>=0 and f.flag>=0

--2、他人分享的图层

select r.resid,ftsetName,alias,coordsys,xmin,ymin,xmax,ymax from g_ftset f
  join sysdb_resources r on r.resid=f.ftset_id
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype=:restype and r.resowner!=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union 
select r.resid,ftsetName,alias,coordsys,xmin,ymin,xmax,ymax from g_ftset f
  	join sysdb_resources r on r.resid=f.ftset_id
	join sysdb_resControl rc on r.id=rc.id
    join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.groupname='public' and r.restype=:restype and r.resowner!=:userid and rc.flag>=0 and r.flag>=0

put_db