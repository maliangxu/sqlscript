--SQLScript dlcheck.sql

get_db sysdb

select r.*,u.username from sysdb_resources r,sysdb_users u
where r.restype=:restype and u.userid=r.resowner and r.resowner=:userid and r.flag>=0


put_db