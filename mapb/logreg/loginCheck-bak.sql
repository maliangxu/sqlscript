get_db sysdb

--µÇÂ¼ÑéÖ¤

select USERID,PASS,EMAIL,TELEPHONE,FLAG from sysdb_users 
where USERID=:userid and PASS=:userPass

put_db