get_db_update sysdb

--����flagֵ

update sysdb_users
set FLAG=:flag
where TELEPHONE=:telephone or EMAIL=:email


put_db_update