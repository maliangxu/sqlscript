--保存地图状态：涉及g_map表的ViewExtent字段和resource表中的imgurl字段
get_db_update sysdb

update sysdb_resources set imgurl=:imgurl,timestamp=:storetime
	where resid=:resid and restype='tb'

put_db_update