get_db sysdb

--µÇÂ¼ÑéÖ¤

select USERID,PASS,USERNAME,EMAIL,TELEPHONE,VALIDITY,FLAG from sysdb_users 
where USERID=:userid and PASS=:userPass and flag>=0

put_db