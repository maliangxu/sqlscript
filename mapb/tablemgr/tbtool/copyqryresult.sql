--将查询的结果要素保存为图层
get_db_update mapb,sysdb



--select 'ftsetname='||:userid||abs(random()) as sql_add_param

select 'newftsetab='||'f_'|| :ftsetname as sql_add_param

select 'copytbname='||'f_'|| :copyFtset as sql_add_param

begin_trans

--复制表中的符合条件的记录到一张新要素表
create table ::newftsetab as select ::flds from ::copytbname  where fid in ::fids 

--在g_ftset表中插入记录
insert into g_ftset(flag,ftsetName,alias,shptype,coordsys,datasource,type,xmin,ymin,xmax,ymax) 
	select 0,:ftsetname,:tbalias,shptype,coordsys,:ftsetname,type,xmin,ymin,xmax,ymax 
	from g_ftset where ftsetName=:copyFtset and flag>=0




--可以获取刚刚插入的表的主键id
select 'new_ftsetid='||last_insert_rowid() as sql_add_param 

       --select 'time='|| datetime('now','localtime') as sql_add_param

--向资源表中插入记录
insert into sysdb_resources(flag,resid,restype,resowner,resdesc,visitcount,[timestamp]) values( 0,:new_ftsetid,'lyr',:userid,:description,0,:timer) 

insert into g_layers(lyr_name,alias,lyr_type,map_id,ftset_id,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag) 
	select :ftsetname,:tbalias,lyr_type,:dbid,:new_ftsetid,visible,z_index,selectbale,autolabel,zoomlayer,lablefield,lyr_style,labelstyle,lyr_flag
	from g_layers where lyr_name=:copyFtset and lyr_flag>=0 and map_id=:dbid


select ftset_id,ftsetName,alias,shptype from g_ftset where ftset_id= :new_ftsetid


end_trans

put_db_update