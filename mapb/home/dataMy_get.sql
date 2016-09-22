--SQLScript dlcheck.sql

get_db sysdb,mapb

select map_id,resid,tb_alias,resowner,restype,timestamp,resdesc,imgurl,username from g_tab_rel,g_tab,sysdb_resources r,sysdb_users u 
where r.resowner=:userid and r.restype=:restype and u.userid=:userid and g_tab_rel.tb_id=r.resid and g_tab.tb_id = r.resid and r.flag>=0

select 'resid='||resid as sql_add_param from sysdb_resources r
where r.resowner=:userid and r.restype=:restype and r.flag>=0

select 'map_id='||map_id as sql_add_param from g_tab_rel 
where tb_id=:resid

select map_id,map_name from g_map
where map_id=:map_id

put_db