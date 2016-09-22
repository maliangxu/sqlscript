--复制分享:先将地图工作空间复制一份，不复制要素表，并更新资源表
get_db mapb,sysdb

begin_trans

--复制地图记录
insert into g_map(map_name,map_type,extent,ViewExtent,coordsys,bz,map_flag)
	select :mapnameSave,map_type,extent,ViewExtent,coordsys,bz,map_flag from g_map gm
	join sysdb_resources r on r.resid=gm.map_id 
	where r.resid=:mapid and restype='map' and gm.map_flag>=0

--可以获取刚刚插入的表的主键id
select 'new_mapid='||last_insert_rowid() as sql_add_param 

--复制图层记录
insert or replace into g_layers(lyr_name,alias,lyr_type,lyr_type,map_id,ftset_id,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag)
select lyr_name,alias,lyr_type,lyr_type,:new_mapid,ftset_id,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag from g_layers where map_id=:mapid and lyr_flag>=0

--向资源表中插入记录(地图复制为该用户的资源，但是图层数据不复制)
select 'respath='||'map/'||:new_mapid as sql_add_param

insert or replace into sysdb_resources(flag,resid,restype,resowner,respath,resdesc,imgurl,keywords)
select 0,:new_mapid,'map',:userid,:respath,resdesc,imgurl,keywords from sysdb_resources r where r.resid=:mapid and restype='map' and r.flag>=0

--返回map_id
select :new_mapid as mapid

end_trans

put_db