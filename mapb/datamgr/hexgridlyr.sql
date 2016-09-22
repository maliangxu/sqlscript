--将查询的结果要素保存为图层
get_db_update mapb,sysdb

begin_trans

--在g_ftset表中插入记录
insert into g_ftset(flag,ftsetName,alias,shptype,coordsys,datasource,type,xmin,ymin,xmax,ymax) 
	select 0,:ftsetname,:ftsetAlias,5,coordsys,:ftsetname,type,xmin,ymin,xmax,ymax 
	from g_ftset where ftset_id=:baseFtset and flag>=0

--可以获取刚刚插入的表的主键id
select 'new_ftsetid='||last_insert_rowid() as sql_add_param 

--在g_layers表中插入记录
insert into g_layers(lyr_name,alias,lyr_type,map_id,ftset_id,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag)
	values(:ftsetname,:ftsetAlias,5,:mapid,:new_ftsetid,1,1000,0,0,'false,0,0',0,'0,$008c840c,1,1,$00c5bc31','134,宋体,$00000000,-14,0',0)

--可以获取刚刚插入的表的主键id
select 'new_lyrid='||last_insert_rowid() as sql_add_param 


--向资源表中插入记录
insert into sysdb_resources(flag,resid,restype,resowner,respath,resdesc,visitcount,[timestamp]) values( 0,:new_ftsetid,'lyr',:userid,'map/'||:new_lyrid,:description,0,:time) 

end_trans

put_db_update