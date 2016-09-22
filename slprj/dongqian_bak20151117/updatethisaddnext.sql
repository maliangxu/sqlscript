get_db slprj


begin_trans

update prj_progress set fml_complete=:fml_complete,fml_bz=:fml_bz,fml_bzdesc=:fml_bzdesc,fml_desc=:fml_desc,cmp_complete=:cmp_complete,cmp_bz=:cmp_bz,cmp_bzdesc=:cmp_bzdesc,cmp_desc=:cmp_desc,ifshow=1,timestps=:stamps where protime=:protime_now and pid=:pid and datatype=:datatype

insert or replace into prj_progress(pid,protime,proyear,proseason,promonth,proweek,datatype,ifshow,timestps)
values (:pid,:protime,:year,:season,:month,:week,:datatype,0,:stamps)

update prj_items set ifDone=:ifDone where id=:pid

end_trans

put_db