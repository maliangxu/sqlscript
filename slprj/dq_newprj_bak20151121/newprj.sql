--新建项目
get_db_update slprj


select -1 as sql_result from prj_items where prj_name=:prj_name

begin_trans

insert into prj_items(prj_cls,prj_name,itemNo,fml_total,cmp_total,compName,compCharge,familyCharge,countyCharge,townCharge,ifDone,buildName,buildTime) values (:prj_cls,:prj_name,:itemNo,:fml_total,:cmp_total,:compName,:compCharge,:familyCharge,:countyCharge,:townCharge,:ifDone,:buildName,:buildTime)

select 'prj_id='||last_insert_rowid() as sql_add_param from prj_items

--insert into prj_progress(pid,fml_total,fml_complete,fml_rest,fml_rate,cmp_total,cmp_complete,cmp_rest,cmp_rate,protime,proyear,datatype,ifshow)
--values (:prj_id,:fml_total,:fml_complete,:fml_rest,:fml_rate,:cmp_total,:cmp_complete,:cmp_rest,:cmp_rate,:y_time_year,:y_time,'year',1)

--insert into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,datatype,ifshow)
--values (:prj_id,'','',:y_y,:y_y,'year',0)

--insert into prj_progress(pid,fml_total,fml_complete,fml_rest,fml_rate,cmp_total,cmp_complete,cmp_rest,cmp_rate,protime,proyear,promonth,datatype,ifshow)
--values (:prj_id,:fml_total,:fml_complete,:fml_rest,:fml_rate,:cmp_total,:cmp_complete,:cmp_rest,:cmp_rate,:y_time_month,:y_time,:m_time,'month',1)

--insert into prj_progress(pid,fml_bz,cmp_bz,protime,proyear,promonth,datatype,ifshow)
--values (:prj_id,'','',:m_protime,:m_y,:m_m,'month',0)

--insert into prj_progress(pid,fml_total,fml_complete,fml_rest,fml_rate,cmp_total,cmp_complete,cmp_rest,cmp_rate,protime,proyear,promonth,proweek,datatype,ifshow)
--values (:prj_id,:fml_total,:fml_complete,:fml_rest,:fml_rate,:cmp_total,:cmp_complete,:cmp_rest,:cmp_rate,:y_time_week,:y_time,:m_time,:w_time,'week',1)

--insert into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,promonth,proweek,datatype,ifshow)
--values (:prj_id,'','',:w_protime,:w_y,:w_m,:w_w,'week',0)

--insert into prj_progress(pid,fml_total,fml_complete,fml_rest,fml_rate,cmp_total,cmp_complete,cmp_rest,cmp_rate,protime,proyear,proseason,datatype,ifshow)
--values (:prj_id,:fml_total,:fml_complete,:fml_rest,:fml_rate,:cmp_total,:cmp_complete,:cmp_rest,:cmp_rate,:y_time_season,:y_time,:s_time,'season',1)

--insert into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,proseason,datatype,ifshow)
--values (:prj_id,'','',:s_protime,:s_y,:s_s,'season',0)

--插入年进度
insert or replace into prj_progress(pid,fml_complete,cmp_complete,protime,proyear,datatype,ifshow,ifnew,timestps)
values (:prj_id,:fml_complete,:cmp_complete,:y_time_year,:y_time,'year',1,1,:stamps)

insert or replace into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,datatype,ifshow,timestps)
values (:prj_id,'','',:y_y,:y_y,'year',0,:stamps)

--插入月进度
insert or replace into prj_progress(pid,fml_complete,cmp_complete,protime,proyear,promonth,datatype,ifshow,ifnew,timestps)
values (:prj_id,:fml_complete,:cmp_complete,:y_time_month,:y_time,:m_time,'month',1,1,:stamps)

insert or replace into prj_progress(pid,fml_bz,cmp_bz,protime,proyear,promonth,datatype,ifshow,timestps)
values (:prj_id,'','',:m_protime,:m_y,:m_m,'month',0,:stamps)

--插入周进度
insert or replace into prj_progress(pid,fml_complete,cmp_complete,protime,proyear,promonth,proweek,datatype,ifshow,ifnew,timestps)
values (:prj_id,:fml_complete,:cmp_complete,:y_time_week,:y_time,:m_time,:w_time,'week',1,1,:stamps)

insert or replace into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,promonth,proweek,datatype,ifshow,timestps)
values (:prj_id,'','',:w_protime,:w_y,:w_m,:w_w,'week',0,:stamps)

--插入季度进度
insert or replace into prj_progress(pid,fml_complete,cmp_complete,protime,proyear,proseason,datatype,ifshow,ifnew,timestps)
values (:prj_id,:fml_complete,:cmp_complete,:y_time_season,:y_time,:s_time,'season',1,1,:stamps)

insert or replace into prj_progress(pid,fml_bzplan,cmp_bzplan,protime,proyear,proseason,datatype,ifshow,timestps)
values (:prj_id,'','',:s_protime,:s_y,:s_s,'season',0,:stamps)

end_trans

put_db_update