--SQLScript dlcheck.sql

get_db sysdb

select r.*,rc.sharetype from sysdb_resources r
  join sysdb_resControl rc on r.resid=rc.resid
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype=:restype  and ug.flag>=0 and rc.flag>=0 and r.flag>=0


put_db