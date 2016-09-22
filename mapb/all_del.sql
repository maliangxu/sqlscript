--SQLScript dlcheck

get_db_update sysdb

begin_trans

delete from  sysdb_resControl 

delete from sysdb_usergroups

delete from sysdb_users

delete from sysdb_resources

end_trans

put_db_update