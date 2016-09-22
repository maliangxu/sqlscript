--SQLScript dlcheck.sql

get_db sysdb

select r.*,rc.sharetype,u.username from sysdb_resources r,sysdb_users u
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where (ug.userid=:userid or ug.groupname='public') and u.userid=r.resowner and r.restype=:restype and r.resowner!=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0


put_db