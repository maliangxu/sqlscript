
get_db_update mapb

select -1 as sql_result,'there not exists this lyr,please check' ad sql_msg
where not exists(
  select * from g_layers where map_id=:mapid and lyr_name=:lyrname
)

update g_layers set z_index=:zindex where lyr_name=:lyrname and map_id=:mapid

put_db_update