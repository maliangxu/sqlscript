--新建地图：
--涉及的表操作：g_map sysdb_resources, 向g_map、resource表中追加一条记录


get_db mapb,sysdb

--向g_map表插入记录
insert into g_map(map_name,extent,ViewExtent,coordsys,map_flag)
values(:mapname, :extent, :extent,:coordsys,0)

select 'mapid='|| last_insert_rowid() as sql_add_param

select 'respath='||'map/'|| :mapid as sql_add_param

--向资源表插入记录
insert into sysdb_resources(flag,resid,restype,resowner,respath,visitcount)
	values(0,:mapid,'map',:userid,:respath,0)


put_db