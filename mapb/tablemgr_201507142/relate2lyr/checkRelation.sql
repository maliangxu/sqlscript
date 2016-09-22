


get_db mapb

select rel.*,gf.alias,gfld.field,gfld.fieldRealname from g_tab_rel rel,g_ftset gf, g_fieldsdef gfld
where tb_id= :tbid and map_id= :mapid and gf.ftset_id=rel.ftset_id and gfld.field=rel.geo_fld and gfld.tabname= :tbname and gf.flag>=0

put_db