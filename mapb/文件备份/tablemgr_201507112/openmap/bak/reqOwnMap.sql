﻿--打开自己的地图（地图中可能包含来自分享的图层）
get_db mapb,sysdb

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where resid=:resid
)

--获取地图信息
select * from g_map where resid=:resid and map_flag>=0 

--select 'resowner='||resowner as sql_add_param from sysdb_resources r
--where r.resid=:resid

--获取图层信息（以及图层的分享类型信息）
--图层来自自己创建的

select gl.*,r.resid,r.resowner from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resname=gl.lyr_name
where gm.resid=:resid and r.resowner=:userid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 

--图层来自分享的
select gl.*,r.resid,r.resowner,rc.sharetype from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resname=gl.lyr_name
join sysdb_resControl rc on rc.resid=r.resid
where gm.resid=:resid and r.resowner!=:userid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 and rc.flag>=0

put_db