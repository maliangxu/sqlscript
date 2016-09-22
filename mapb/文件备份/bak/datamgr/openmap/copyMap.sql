--复制分享
get_db mapb,sysdb

begin_trans

insert into g_map(map_name,map_type,extent,ViewExtent,coordsys,bz,map_flag)
	select map_name,map_type,extent,ViewExtent,coordsys,bz,map_flag from g_map gm
	join sysdb_resources r on r.resid=gm.map_id 
	where r.resid=:resid and restype='map'

insert into g_layers(lyr_name,lyr_type,)

end_trans

put_db