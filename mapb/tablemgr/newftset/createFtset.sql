--创建要素:
--涉及的表操作:创建f表，g_ftset g_Meta

get_db_update mapb,sysdb

begin_trans


--建立索引


--向fileldinfo表中追加记录（要素表中属性字段 真实字段与Vi的对应关系 自动计算Vi）
--insert or replace into g_fieldinfo(tabname,realname,type) values(:ftsetab,:realname,:fldType)

--向要素列表g_ftset中添加记录
insert or replace into g_ftset(flag,ftsetName,alias,shptype,coordsys,datasource,type,xmin,ymin,xmax,ymax) values(0,:ftsetname,:alias,:shpType,:coordsys,:ftsetname,'ftset',:xmin,:ymin,:xmax,:ymax)

select 'ftsetid='|| last_insert_rowid() as sql_add_param

--资源表中增加记录
insert or replace into sysdb_resources(flag,resid,restype,resowner,resdesc,keywords,visitcount)  values (0,:ftsetid,'lyr',:userid,:resdesc,'',0)


end_trans

put_db_update