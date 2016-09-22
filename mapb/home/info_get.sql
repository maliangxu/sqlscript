--SQLScript dlcheck.sql

get_db sysdb

select u.* from sysdb_users u
where u.userid=:userid and u.flag>=0


put_db