get_db_update sysdb

update sysdb_users set telephone=:telephone,email=:email,userdesc=:userdesc
where userid=:userid and flag>=0

put_db_update