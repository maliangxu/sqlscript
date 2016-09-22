--保存地图状态：涉及g_map表的ViewExtent字段和resource表中的imgurl字段
get_db sysdb

--update g_map set ViewExtent=:viewExtent

put_db