--获取指定地图的信息
get_db gmapdb sysdb

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where map_name=:mapname
)

select * from g_map where map_name=:mapname and map_flag>=0 

select gl.* from g_map gm,g_layers gl
where gm.map_name=:mapname and gm.map_id=gl.map_id and gm.map_flag>=0 and gl.lyr_flag>=0

--获取资源的分享类型
select sharetype from sysdb_resControl rc,sysdb_resource r where rc.resid=r.resid and resname=:mapname and resowner=:resowner 

put_db