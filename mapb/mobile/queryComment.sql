get_db mapb,sysdb

select su.username,su.userimg,guc.* from g_usercomment guc
join sysdb_users su on guc.userid=su.userid
where map_id=:map_id 

put_db