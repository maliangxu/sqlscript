get_db sysdb

--��¼��֤

select USERID,PASS,EMAIL,TELEPHONE,FLAG from sysdb_users 
where USERID=:userid and PASS=:userPass

put_db