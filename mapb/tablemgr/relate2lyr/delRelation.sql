
--增加关联 ()

get_db_update mapb

--insert or replace into g_tab_rel(map_id,tb_id,ftset_id,geo_fld,fts_fld) values( :mapid , :tbid , :ftsetid , :geofld , :ftsetfld)

update g_tab_rel set ftset_id=null ,geo_fld=null ,fts_fld= null
where map_id= :mapid and tb_id= :tbid and ftset_id= :ftsetid


put_db_update