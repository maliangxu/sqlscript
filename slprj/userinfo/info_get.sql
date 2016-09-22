--SQLScript dlcheck.sql

get_db slprj

select u.* from slprj_users u
where u.userid=:userid 


put_db