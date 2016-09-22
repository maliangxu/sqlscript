--获取指定地图的信息
get_db ::resowner

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where map_name=:mapname
)

select * from g_map where map_name=:mapname and map_flag>=0 

select gl.* from g_map gm,g_layers gl
where gm.map_name=:mapname and gm.map_id=gl.map_id and gm.map_flag>=0 and gl.lyr_flag>=0

put_db