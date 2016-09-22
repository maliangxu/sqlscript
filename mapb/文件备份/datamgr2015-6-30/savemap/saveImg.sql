--保存地图状态：涉及g_map表的ViewExtent字段和resource表中的imgurl字段
get_db sysdb

update sysdb_resources set imgurl=:imgurl
	where resid=:resid and restype='map'

put_db