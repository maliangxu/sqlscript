

get_db mapb,sysdb

--向ftset列表中增加记录
insert into g_ftset(flag,ftsetName,alias,shptype,coordsys,datasource,type) values(0,:lyrname,:lyrname,:shptype,:coordsys,:datasrc,'shp')

select 'ftsetid='|| last_insert_rowid() as sql_add_param

--向resources表中增加记录
insert into sysdb_resources(flag,resid,restype,resowner,resdesc,keywords,visitcount)  values (0,:ftsetid,'lyr',:userid,'','',0)




put_db
