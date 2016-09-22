
--增加关联 ()

get_db mapb

--insert or replace into g_tab_rel(map_id,tb_id,ftset_id,geo_fld,fts_fld) values( :mapid , :tbid , :ftsetid , :geofld , :ftsetfld)

update g_tab_rel set ftset_id= :ftsetid ,geo_fld= :geofld ,fts_fld= :ftsetfld
where map_id= :mapid and tb_id= :tbid 


put_db