--根据数据库名获取表格
get_db mapb,sysdb

--自己的业务表
select t.tb_alias as tb_alias,t.tb_id as tb_id,t.tb_name as tb_name,
'4' as sharetype,'tb' as tabtype from g_tab t
 join g_tab_rel r on t.tb_id=r.tb_id
 join sysdb_resources sr on sr.resid=t.tb_id
 where sr.resowner=:username and r.map_id=:dbid and sr.restype=:restype
 and sr.flag>=0
 
--自己的属性表
--select t.alias as tb_alias,t.ftset_id as tb_id,t.ftsetName as tb_name,
-- '4' as sharetype,'ftset' as tabtype,t.datasource as filter from g_ftset t
-- join g_layers r on t.ftset_id=r.ftset_id
-- join sysdb_resources sr on sr.resid=r.ftset_id
-- where sr.resowner=:username and r.map_id=:dbid and sr.restype='lyr'
-- and sr.flag>=0

--获取图层信息（以及图层的分享类型信息）
--1图层来自自己创建的--join sysdb_resources r on r.resname=gl.lyr_name
select gl.alias as tb_alias,gl.ftset_id as tb_id,gf.ftsetName as tb_name,
 '4' as sharetype,'ftset' as tabtype,gf.datasource as filter 
 from g_layers gl,g_ftset gf
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id  
where gm.map_id=:dbid and r.resowner=:username and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 and gf.ftset_id=gl.ftset_id


--2图层来自分享的  --join sysdb_resources r on r.resname=gl.lyr_name
select gl.alias as tb_alias,gl.ftset_id as tb_id,gf.ftsetName as tb_name,
 rc.sharetype as sharetype,'ftset' as tabtype,gf.datasource as filter from g_layers gl,g_ftset gf
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id
join sysdb_resControl rc on rc.id=r.id
join sysdb_usergroups up on up.groupname=rc.groupname
where gm.map_id=:dbid  and r.resowner!=:username and up.userid=:username 
and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 
and rc.flag>=0 and gf.ftset_id=gl.ftset_id

put_db