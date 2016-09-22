--更新时准备的信息
get_db_update slprj

--select b.pid,a.fml_total,b.fml_complete,b.fml_rest,a.cmp_total,b.cmp_complete,b.cmp_rest,b.protime,b.proyear,b.proseason,b.promonth,b.proweek,b.proday,b.fml_bz,b.cmp_bz,b.fml_bzplan,b.cmp_bzplan,b.fml_last,b.cmp_last from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and a.ifDone=0 and b.datatype=:datatype and b.proyear=:year and b.promonth=:month and b.proweek=:week and b.ifshow=1

select id as pid,fml_total,cmp_total from prj_items where id=:pid

--本周是否有记录
--select ifnew,fml_complete,cmp_complete,fml_bz,cmp_bz,fml_last,cmp_last,fml_desc,cmp_desc from prj_progress where pid=:pid and datatype=:datatype and proyear=:yearnow and promonth=:monthnow and proweek=:weeknow
select b.ifnew,b.fml_complete,b.cmp_complete,b.fml_bz,b.cmp_bz,b.fml_desc,b.cmp_desc,b.fml_bzplan,b.cmp_bzplan,b.fml_bzdesc,b.cmp_bzdesc,'current' as current from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and b.datatype=:datatype and b.proyear=:yearnow and b.promonth=:monthnow and b.proweek=:weeknow and a.ifDone=0

--下周是否有记录
select b.fml_bzplan,b.cmp_bzplan,'next' as next from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and a.ifDone=0 and b.datatype=:datatype and b.proyear=:year and b.promonth=:month and b.proweek=:week and a.ifDone=0

--上周的记录
select b.ifnew,b.fml_complete,b.cmp_complete,b.fml_bz,b.cmp_bz,b.fml_desc,b.cmp_desc,b.fml_bzdesc,b.cmp_bzdesc,'prev' as prev from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and b.datatype=:datatype and b.proyear=:yearprev and b.promonth=:monthprev and b.proweek=:weekprev and a.ifDone=0

--select sum(b.fml_bz) as fml_alldone,sum(b.cmp_bz) as cmp_alldone from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and a.ifDone=0 and b.datatype=:datatype and b.proyear=:year and b.promonth=:month and b.proweek=:week and b.ifshow=1


put_db_update