--仅从表空间中移除表格
get_db_update mapb

delete from g_tab_rel where map_id=:dbid and tb_id=:tbid

put_db_update