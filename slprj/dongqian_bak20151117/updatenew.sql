get_db slprj

begin_trans

update prj_progress set fml_last=:fml_last,fml_complete=:fml_complete,fml_rest=:fml_rest,fml_bz=:fml_bz,fml_desc=:fml_desc,cmp_last=:cmp_last,cmp_complete=:cmp_complete,cmp_rest=:cmp_rest,cmp_bz=:cmp_bz,cmp_desc=:cmp_desc,ifshow=1 where protime=:protime_now and pid=:pid and datatype=:datatype

--insert or replace into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,proseason,promonth,proweek,datatype,ifshow)
--values (:pid,:next_fml_plan,:next_cmp_plan,:protime,:year,:season,:month,;week,'year',0)
update prj_progress set fml_bzplan=:next_fml_plan,cmp_bzplan=:next_cmp_plan where protime=:protime and pid=:pid and datatype=:datatype

update prj_items set ifDone=:ifDone where id=:pid

end_trans

put_db