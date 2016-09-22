get_db_update mapb

update g_usercommentNum set  commentnum=commentnum+1 where map_id=:map_id

put_db_update