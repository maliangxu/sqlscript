get_db_update sysdb

insert into sysdb_users(userid,username,sex,email,telephone,userdesc,validity) values(:USERID,:USERNAME,:SEX,:EMAIL,:TELEPHONE,:USERDESC,:VALIDITY) 

put_db_update