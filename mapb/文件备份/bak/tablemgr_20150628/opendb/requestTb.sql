--根据数据库名获取表格
get_db mapb

select t.tb_alias,t.tb_id,t.tb_name from tb_list t,tb_relation r where r.db_id=:dbid and r.tb_id=t.tb_id

put_db