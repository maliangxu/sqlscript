--创建要素:
--涉及的表操作:创建f表，g_ftset g_Meta

get_db mapb,sysdb

begin_trans

select 'ftsetname='||:userid||abs(random()) as sql_add_param

--select 'ftsetab='|| 'f_' ||:userid||abs(random())  as sql_add_param
select 'ftsetab='||'f_'|| :ftsetname  as sql_add_param

--创建要素表
create table ::ftsetab (fid integer PRIMARY KEY,shpType integer,xmin double,ymin double,xmax double,ymax double,shpLen double,shpArea double,shpData blob, ::flds )
--create table ::ftsetab (fid integer PRIMARY KEY,shpType integer,xmin double,ymin double,xmax double,ymax double,shpLen double,shpArea double,shpData blob,V0,V1,V2,V3,V4,V5,V6,V7,V8,V9,V10,V11,V12,V13,V14,V15,V16,V17,V18,V19,V20,V21,V22,V23,V24,V25,V26,V27,V28,V29,V30,V31,V32,V33,V34,V35,V36,V37,V38,V39,V40,V41,V42,V43,V44,V45,V46,V47,V48,V49,V50)

--建立索引


--向fileldinfo表中追加记录（要素表中属性字段 真实字段与Vi的对应关系 自动计算Vi）
--insert or replace into g_fieldinfo(tabname,realname,type) values(:ftsetab,:realname,:fldType)

--向要素列表g_ftset中添加记录
insert or replace into g_ftset(flag,ftsetName,alias,shptype,coordsys,datasource,type,xmin,ymin,xmax,ymax) values(0,:ftsetname,:alias,:shpType,:coordsys,:ftsetname,'ftset',:xmin,:ymin,:xmax,:ymax)

select 'ftsetid='|| last_insert_rowid() as sql_add_param

--资源表中增加记录
insert or replace into sysdb_resources(flag,resid,restype,resowner,resdesc,keywords,visitcount)  values (0,:ftsetid,'lyr',:userid,:resdesc,'',0)


end_trans

put_db