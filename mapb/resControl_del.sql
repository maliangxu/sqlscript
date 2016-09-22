--SQLScript dlcheck

get_db_update sysdb

begin_trans

delete from  sysdb_resControl 
where groupname =:groupname and resname=:resname

end_trans

put_db_update