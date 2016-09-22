--SQLScript dlcheck

get_db_update sysdb

begin_trans

delete from  sysdb_resControl 
where resname =:resname

delete from sysdb_resources
where resname =:resname

end_trans

put_db_update