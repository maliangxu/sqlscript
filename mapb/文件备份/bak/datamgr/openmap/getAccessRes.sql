
--获取用户可访问的某种资源，如地图资源
--传入参数：userid、restype
get_db sysdb,mapb

--用户自己的资源 :userid,resid,map_name,map_alias,sharetype
select map.map_id, map_name,resowner,imgurl 
from g_map map,sysdb_resources r  
where r.resid=map.map_id  and r.resowner=:userid and r.restype=:restype and map.map_flag>=0 and r.flag>=0



--用户可访问的资源（并且owner不是该用户）
--select map.resid,map.map_name,map.map_alias,r.resowner,rc.sharetype from sysdb_resources r 
select map.map_id,map_name,resowner,imgurl,sharetype from sysdb_resources r 
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_map map on map.map_id=r.resid 
where ug.userid=:userid and r.restype=:restype and r.resowner!=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union 
select map.map_id,map_name,resowner,imgurl,sharetype from sysdb_resources r 
join sysdb_resControl rc on r.id=rc.id
join g_map map on map.map_id=r.resid 
where groupname='public' and r.restype=:restype and r.resowner!=:userid and rc.flag>=0 and r.flag>=0
--对所有组开放的数据 （公开数据） 


put_db