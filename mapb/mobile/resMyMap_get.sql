get_db sysdb,mapb

--用户自己的资源 :userid,resid,map_name,map_alias,sharetype
select  r.*
from g_map map,sysdb_resources r  
where r.resid=map.map_id  and r.resowner=:userid and r.restype=:restype and map.map_flag>=0 and r.flag>=0

select r.*,upn.* from sysdb_resources r
  join g_map map on r.resid=map.map_id
  join g_userpraiseNum upn on r.resid=upn.map_id
where r.resowner=:userid and r.restype=:restype  and map.map_flag>=0 and r.flag>=0

select up.* from sysdb_resources r
  join g_map map on r.resid=map.map_id
  join g_userpraise up on r.resid=up.map_id
where r.resowner=:userid and up.userid=:userid and r.restype=:restype  and map.map_flag>=0 and r.flag>=0

select ucn.* from sysdb_resources r
  join g_map map on r.resid=map.map_id
  join g_usercommentNum ucn on r.resid=ucn.map_id
where r.resowner=:userid and r.restype=:restype  and map.map_flag>=0 and r.flag>=0

put_db