--更新时准备的信息
get_db slprj

select id as pid,fml_total,cmp_total from prj_items where id=:pid

select b.ifnew,b.fml_complete,b.cmp_complete,b.fml_bz,b.cmp_bz,b.fml_desc,b.cmp_desc,b.fml_bzplan,b.cmp_bzplan,b.fml_bzdesc,b.cmp_bzdesc,'current' as current from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and b.datatype=:datatype and b.proyear=:yearnow and b.proseason=:seasonnow and a.ifDone=0

select b.fml_bzplan,b.cmp_bzplan,'next' as next from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and a.ifDone=0 and b.datatype=:datatype and b.proyear=:year and b.proseason=:season and a.ifDone=0

--上周的记录
select b.ifnew,b.fml_complete,b.cmp_complete,b.fml_bz,b.cmp_bz,b.fml_desc,b.cmp_desc,b.fml_bzdesc,b.cmp_bzdesc,'prev' as prev from prj_items as a,prj_progress as b where a.id=b.pid and b.pid=:pid and b.datatype=:datatype and b.proyear=:yearprev and b.proseason=:seasonprev and a.ifDone=0


put_db