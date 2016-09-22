
--获取图层的字段：用于设置标注字段

get_db mapb

select 'ftab=f_'||datasource as sql_add_param
 from g_ftset where  ftset_id=:ftsetid

--查询fieldinfo表
select fieldname from g_fieldinfo where tabname=::ftab

select ::ftab.*, from ::ftab limit 1

put_db