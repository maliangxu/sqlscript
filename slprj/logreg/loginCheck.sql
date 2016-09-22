get_db slprj

--µÇÂ¼ÑéÖ¤

select USERID,USERNAME,PASSWORD,VALIDITY,GROUPNAME from slprj_users 
where USERID=:userid and PASSWORD=:userPass

put_db