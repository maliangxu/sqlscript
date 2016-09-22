get_db_update sysdb

begin_trans

delete from sysdb_resources where restype='code' and resowner=:owner and respath=:respath

end_trans

put_db_update