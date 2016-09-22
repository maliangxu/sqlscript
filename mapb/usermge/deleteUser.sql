get_db_update sysdb

delete from sysdb_users where userid in ( ::selectedUsrs )

put_db_update