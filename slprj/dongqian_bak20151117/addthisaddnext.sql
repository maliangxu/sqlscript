get_db slprj


begin_trans

--update prj_progress set fml_last=:fml_last,fml_complete=:fml_complete,fml_rest=:fml_rest,fml_bz=:fml_bz,fml_desc=:fml_desc,cmp_last=:cmp_last,cmp_complete=:cmp_complete,cmp_rest=:cmp_rest,cmp_bz=:cmp_bz,cmp_desc=:cmp_desc,ifshow=1 where protime=:protime_now and pid=:pid and datatype=:datatype

insert into prj_progress(pid,fml_complete,fml_bz,fml_desc,fml_bzdesc,cmp_complete,cmp_bz,cmp_desc,cmp_bzdesc,protime,proyear,proseason,promonth,proweek,datatype,ifshow,timestps) values (:pid,:fml_complete,:fml_bz,:fml_desc,:fml_bzdesc,:cmp_complete,:cmp_bz,:cmp_desc,:cmp_bzdesc,:protime_now,:year_now,:season_now,:month_now,:week_now,:datatype,1,:stamps)

insert or replace into prj_progress(pid,protime,proyear,proseason,promonth,proweek,datatype,ifshow,timestps)
values (:pid,:protime,:year,:season,:month,:week,:datatype,0,:stamps)

update prj_items set ifDone=:ifDone where id=:pid

end_trans

put_db