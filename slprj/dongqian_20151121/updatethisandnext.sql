get_db_update slprj


begin_trans

update prj_progress set fml_complete=:fml_complete,fml_bz=:fml_bz,fml_bzdesc=:fml_bzdesc,fml_desc=:fml_desc,cmp_complete=:cmp_complete,cmp_bz=:cmp_bz,cmp_bzdesc=:cmp_bzdesc,cmp_desc=:cmp_desc,ifshow=1,timestps=:stamps where protime=:protime_now and pid=:pid and datatype=:datatype

update prj_progress set fml_bzplan=:next_fml_plan,cmp_bzplan=:next_cmp_plan,timestps=:stamps where protime=:protime and datatype=:datatype and pid=:pid

update prj_items set ifDone=:ifDone where id=:pid

end_trans

put_db_update