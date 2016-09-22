--SQLScript dlcheck.sql

get_db sysdb

select r.* from sysdb_resources r 
where r.restype=:restype and r.resowner=:userid and r.flag>=0 order by timestamp desc


put_db