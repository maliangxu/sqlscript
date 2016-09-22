
--获取所有地图
--传入参数：userid、restype
get_db sysdb,mapb


--1、自己的图层
select map_id,map_name,extent,coordsys from g_map gm,sysdb_resources r
where r.resowner=:userid and r.resid=gm.map_id and r.restype='map' and r.flag>=0 and gm.map_flag>=0

--2、他人分享的图层

select map_id,map_name,extent,coordsys from g_map gm
  join sysdb_resources r on r.resid=gm.map_id
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype='map' and r.resowner!=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0 and gm.map_flag>=0
union 
select map_id,map_name,extent,coordsys from  g_map gm
  	join sysdb_resources r on r.resid=gm.map_id
	join sysdb_resControl rc on r.id=rc.id
    join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.groupname='public' and r.restype='map' and r.resowner!=:userid and rc.flag>=0 and r.flag>=0 and gm.map_flag>=0

put_db