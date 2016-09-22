--SQLScript dlcheck

get_db_update sysdb

begin_trans

delete from  sysdb_resControl 
where groupname in (select groupname from sysdb_usergroups where userid=:userid )

delete from sysdb_usergroups
where userid=:userid

delete from sysdb_users
where userid=:userid

end_trans

put_db_update