--获取指定地图的信息
get_db mapb,sysdb

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where map_id=:resid
)

--获取地图信息
select * from g_map where map_id=:resid and map_flag>=0 

--获取图层信息（以及图层的分享类型信息）
select gl.* from g_layers gl
join g_map gm on gm.map_id=gl.map_id
where gm.map_id=:resid and gm.map_flag>=0 and gl.lyr_flag>=0


put_db