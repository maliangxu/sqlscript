--打开地图（地图中可能包含来自分享的图层）
get_db mapb,sysdb

--自己的业务表
select t.tb_alias as tb_alias,t.tb_id as tb_id,t.tb_name as tb_name,
'4' as sharetype,'tb' as tabtype from g_tab t
 join g_tab_rel r on t.tb_id=r.tb_id
 join sysdb_resources sr on sr.resid=t.tb_id
 where sr.resowner=:username and r.map_id=:dbid and sr.restype=:restype
 and sr.flag>=0

--图层来自分享  
select gl.alias as tb_alias,gl.ftset_id as tb_id,gf.ftsetName as tb_name,
 rc.sharetype as sharetype,'ftset' as tabtype,gf.datasource as filter from g_layers gl,g_ftset gf 
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id
join sysdb_resControl rc on rc.id=r.id
join sysdb_usergroups up on up.groupname=rc.groupname
where gm.map_id=:dbid  and up.userid=:userid and r.restype='lyr' 
and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 and rc.flag>=0
and gf.ftset_id=gl.ftset_id

put_db