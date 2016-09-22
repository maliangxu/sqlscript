--仅从表空间中移除表格
get_db mapb

delete from tb_relation where db_id=:dbid and tb_id=:tbid

put_db