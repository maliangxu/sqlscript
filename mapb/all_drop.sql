--SQLScript dlcheck

get_db_update sysdb

begin_trans

drop table sysdb_resControl 

drop table sysdb_usergroups

drop table sysdb_users

drop table sysdb_resources

drop table users_online

end_trans

put_db_update