--SQLScript dlcheck

get_db_update sysdb

begin_trans

delete from  sysdb_resControl 
where groupname =:groupname

delete from sysdb_usergroups
where groupname =:groupname

end_trans

put_db_update