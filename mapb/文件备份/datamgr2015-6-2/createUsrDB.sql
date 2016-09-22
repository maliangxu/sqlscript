--新建数据库: 给每个用户创建数据库，并新建必要的几张表

get_db ::userid

create table if not exists g_map(map_id integer,map_name text,map_type text,extent text,ViewExtent text,coordsys text,map_alias text,bz text,map_flag integer default 0,primary key(map_id))

create table if not exists g_layers(lyr_id integer,lyr_name text,lyr_type integer,map_id integer,visible integer,z_index integer,alias text,datasource text,selectbale integer,autolabel integer,zoomlayer text,lablefield text,lyr_style text,labelstyle text,lyr_flag integer default 0,primary key(lyr_id))

create table if not exists g_meta(fid integer,name text,shptype integer,xmin double,ymin double,xmax double,ymax double,primary key(fid))

create table if not exists g_ftset(id integer,ftsetName text,alias text,shptype integer,viewextent text,coordsys text,datasource text,type text,primary key(id))   

create table if not exists fieldinfo(id integer,field text,tabname text,fieldRealname text,fieldtype text,primary key(id)) 

put_db
