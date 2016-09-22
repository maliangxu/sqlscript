get_db_update mapb

delete from g_userpraise where map_id=:map_id and userid=:userid

update g_userpraiseNum set  praisenum=praisenum-1 where map_id=:map_id

put_db_update