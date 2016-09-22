get_db_update sysdb

update sysdb_users set validity=:validity where userid in ( ::selectedUsrs )

put_db_update