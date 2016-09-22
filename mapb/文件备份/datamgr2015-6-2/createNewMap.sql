--新建地图：向g_map表中追加一条记录


get_db ::userid

select -2 as sql_result,'Already exists the map' as sql_msg
where exists(
select * 
from g_map 
where map_name=:mapname  
)

insert into g_map(map_name,ViewExtent,coordsys,map_alias,map_flag)
values(:mapname, :viewextent, :coordsys, :mapalias,0)


put_db