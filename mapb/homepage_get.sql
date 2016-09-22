SQLScript dlcheck.sql

get_db sysdb

select r.* from sysdb_resources r 
  join sysdb_resControl rc on r.resname=rc.resname
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0

put_db