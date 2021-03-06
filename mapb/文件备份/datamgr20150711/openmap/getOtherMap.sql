﻿--获取指定地图的信息
get_db mapb,sysdb

select -1 as sql_result,'there not exists this map' as sql_msg
where not exists(
 select * from g_map where map_id=:resid
)

--获取地图信息
select * from g_map where map_id=:resid and map_flag>=0 

--获取图层信息（以及图层的分享类型信息）
select gl.*,gf.type,gf.datasource from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join g_ftset gf on gf.ftset_id=gl.ftset_id
where gm.map_id=:resid and gm.map_flag>=0 and gl.lyr_flag>=0

--(2015-7-7修改)
--select gl.*,r.resid,r.resowner,rc.sharetype,rc.transfer,gf.type,gf.datasource from g_layers gl
--join g_map gm on gm.map_id=gl.map_id
--join sysdb_resources r on r.resid=gl.ftset_id
--join sysdb_resControl rc on rc.id=r.id
--join g_ftset gf on gf.ftset_id=gl.ftset_id
--join sysdb_usergroups up on up.groupname=rc.groupname
--where gm.map_id=:resid  and up.userid=:userid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 and rc.flag>=0


put_db