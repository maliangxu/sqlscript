get_db_update mapb

insert into g_userpraise(map_id,userid) values(:map_id,:userid) 

update g_userpraiseNum set  praisenum=praisenum+1 where map_id=:map_id

put_db_update