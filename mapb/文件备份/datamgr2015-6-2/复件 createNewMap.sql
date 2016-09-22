--新建地图：
--涉及的表操作：g_map sysdb_resources, 向g_map、resource表中追加一条记录


get_db sysdb

--生成resid
select 'resid='||'map'||strftime('%f','now','localtime')||abs(random()) as sql_add_param


--向g_map表插入记录
insert into g_map(resid,map_name,ViewExtent,coordsys,map_alias,map_flag)
values(:resid, :mapname, :viewextent, :coordsys, :mapalias,0)

--向资源表插入记录
insert into sysdb_resources(resid,resname,restype,resowner,flag)
	values(:resid,:mapname,'map',:userid,0)


put_db