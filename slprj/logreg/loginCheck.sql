get_db slprj

--��¼��֤

select USERID,USERNAME,PASSWORD,VALIDITY,GROUPNAME from slprj_users 
where USERID=:userid and PASSWORD=:userPass

put_db