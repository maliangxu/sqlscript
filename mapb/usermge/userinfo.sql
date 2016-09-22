get_db sysdb

select userid,username,sex,email,telephone,userdesc,validity from sysdb_users where validity=:validity

put_db