--创建要素
get_db ::userid

--创建要素表(未考虑预留字段)
create table if not exists ::ftsetTab (FID integer PRIMARY KEY,shpType integer,xmin double,ymin double,xmax double,ymax double,shpLen double,shpArea double,shpData blob,::flds)

--向要素列表g_ftset中添加记录
insert or replace into g_ftset(ftsetName,alias,shptype,viewextent,coordsys,datasource,type) values(:ftsetName,:alias,:shpType,:viewExtent,:coord,:ftsetName,'ftset')

--向g_meta中插入记录
insert or replace into g_Meta(name,shptype,xmin,ymin,xmax,ymax) values(:ftsetName,:shpType,:xmin,:ymin,:xmax,:ymax)

--向fileldinfo表中追加记录（要素表中属性字段 真实字段与Vi的对应关系 自动计算Vi）
--insert or replace into fieldinfo(field,tabname,fieldRealname,fieldtype) 
--select fldV,:ftset,:fldName,:fldType 


put_db