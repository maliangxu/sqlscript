--创建要素:
--涉及的表操作:创建f表，g_ftset g_Meta

get_db sysdb

select 'ftsetname='||:userid||:ftset||abs(random()) as sql_add_param

select '_ftsetTab='||'f_'|| :ftset||:userid as sql_add_param

--select 'resid='||:userid||'ftset'||strftime('%s','now','localtime')||abs(random()) as sql_add_param

--创建要素表(未考虑预留字段)
create table if not exists ::_ftsetTab (FID integer PRIMARY KEY,shpType integer,xmin double,ymin double,xmax double,ymax double,shpLen double,shpArea double,shpData blob,::flds)

--向要素列表g_ftset中添加记录
--insert or replace into g_ftset(resid,ftsetName,alias,shptype,viewextent,coordsys,datasource,type) values(:resid,:ftsetname,:alias,:shpType,:viewExtent,:coord,:ftsetname,'ftset')

--向g_meta中插入记录
--insert or replace into g_Meta(name,shptype,xmin,ymin,xmax,ymax) values(:ftsetname,:shpType,:xmin,:ymin,:xmax,:ymax)

--向fileldinfo表中追加记录（要素表中属性字段 真实字段与Vi的对应关系 自动计算Vi）
--insert or replace into fieldinfo(field,tabname,fieldRealname,fieldtype) 
--select fldV,:ftset,:fldName,:fldType 


put_db