get_db_update slprj

update slprj_users set telephone=:telephone, email=:email, userdesc=:userdesc, password=:pass, weixinid=:weixinid
where userid=:userid 

put_db_update