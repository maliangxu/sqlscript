get_db mapb,sysdb

--删除表空间
begin_trans

delete from db_map where db_id=:db_id

delete from tb_relation where db_id=:db_id

delete from sysdb_resources where resid=:db_id and flag>=0 and resowner=:username

end_trans

put_db