

get_db mapb,sysdb

insert into g_layers(lyr_name,alias,lyr_type,map_id,ftset_id,z_index,lyr_style,labelstyle,lyr_flag) values(:lyrname,:alias,:shptype,:mapid,:ftsetid,1000,:lyrstyle,:labelstyle,0)  


select gl.*,r.resid,r.resowner,gf.type,gf.datasource from g_layers gl
join g_map gm on gm.map_id=gl.map_id
join sysdb_resources r on r.resid=gl.ftset_id  
join g_ftset gf on gf.ftset_id=gl.ftset_id
where gm.map_id=:mapid and gl.ftset_id=:ftsetid and r.restype='lyr' and gm.map_flag>=0 and gl.lyr_flag>=0 and r.flag>=0 


put_db