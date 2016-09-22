get_db_update mapb,sysdb

begin_trans

--g_ftset添加记录
insert into g_ftset(flag, ftsetName,alias,shptype,coordsys,datasource,type)
values(0, :name, :name, 5, 'unknown', :filepath, 'tif')

--可以获取刚刚插入的表的主键id
select 'new_ftsetid='||last_insert_rowid() as sql_add_param 

--g_layers添加记录
insert or replace into g_layers(lyr_name,alias,lyr_type,map_id,ftset_id,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag)
values(:name, :name,99,:mapid,:new_ftsetid,1,1000,0,0,'false,0,0',0,'GeoSymbols,35,$00408080,10','134,宋体,$00000000,-14,0',0)

--sysdb_resources添加记录
insert or replace into sysdb_resources(flag,resid,restype,resowner,respath)
values(0, :new_ftsetid, 'lyr', :userid, 'map/'||:mapid)

end_trans

put_db_update