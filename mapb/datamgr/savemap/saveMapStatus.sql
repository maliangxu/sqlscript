--保存地图状态：涉及g_map表的ViewExtent字段
get_db_update mapb

update g_map set ViewExtent=:viewExtent where map_id=:mapid 

put_db_update