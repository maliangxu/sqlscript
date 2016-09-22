--打开地图（地图中可能包含来自分享的图层）
get_db mapb,sysdb

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where map_id=:resid
)

--获取地图信息
select * from g_map where map_id=:resid and map_flag>=0 


--获取图层信息（以及图层的分享类型信息）
--1图层来自自己创建的--join sysdb_resources r on r.resname=gl.lyr_name
select gl.*,r.resid,r.resowner,gf.type from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id  
join g_ftset gf on gf.ftset_id=gl.ftset_id
where gm.map_id=:resid and r.resowner=:userid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 


--2图层来自分享的  --join sysdb_resources r on r.resname=gl.lyr_name
select gl.*,r.resid,r.resowner,rc.sharetype,rc.transfer,gf.type from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id
join sysdb_resControl rc on rc.id=r.id
join g_ftset gf on gf.ftset_id=gl.ftset_id
where gm.map_id=:resid and r.resowner!=:userid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 and rc.flag>=0

put_db