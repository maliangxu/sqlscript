get_db sysdb,gmapdb

--select * from g_map where map_name='shmap'

--select * from sysdb_users where userid=:userid


--用户自己的资源 :userid,resid,map_name,map_alias,sharetype
select map.resid, map.map_name, map.map_alias,r.resowner
from sysdb_resources r ,g_map map
where r.resowner=:userid and r.restype=:restype and r.flag>=0
and map.resid=r.resid and map.map_flag>=0

put_db