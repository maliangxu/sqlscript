get_db slprj

--去年度完成情况
select b.fml_bzdesc as fml_bzdesc_y,b.cmp_bzdesc as cmp_bzdesc_y from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and b.datatype="year" and b.proyear=:y_prev_year

--今年计划
select b.fml_bzplan as fml_bzplan_y,b.cmp_bzplan as cmp_bzplan_y from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and datatype="year" and b.proyear=:year 

--上季度完成情况
select b.fml_bzdesc as fml_bzdesc_s,b.cmp_bzdesc as cmp_bzdesc_s from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and b.datatype="season" and b.proyear=:s_prev_year and b.proseason=:s_prev_season

--本季度计划完成
select b.fml_bzplan as fml_bzplan_s,b.cmp_bzplan as cmp_bzplan_s from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and datatype="season" and b.proyear=:year and b.proseason=:season

--上月完成情况
select b.fml_bzdesc as fml_bzdesc_m,b.cmp_bzdesc as cmp_bzdesc_m from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and b.datatype="month" and b.proyear=:m_prev_year and b.promonth=:m_prev_month

--本月计划完成
select b.fml_bzplan as fml_bzplan_m,b.cmp_bzplan as cmp_bzplan_m from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and datatype="month" and b.proyear=:year and b.promonth=:month

--上周完成情况
select b.fml_complete as fml_complete,b.cmp_complete as cmp_complete,b.fml_bzdesc as fml_bzdesc_w,b.cmp_bzdesc as cmp_bzdesc_w from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and b.datatype="week" and b.proyear=:w_prev_year and b.promonth=:w_prev_month and b.proweek=:w_prev_week

--本周计划完成
select b.fml_bzplan as fml_bzplan_w,b.cmp_bzplan as cmp_bzplan_w from prj_items as a,prj_progress as b where a.id=b.pid and a.id=:prjnum and datatype="week" and b.proyear=:year and b.promonth=:month and b.proweek=:week

--项目基本信息
select * from prj_items where id=:prjnum

put_db