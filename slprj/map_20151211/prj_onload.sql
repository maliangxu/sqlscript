get_db slprj

--查询项目名称
select distinct prjName from f_prjPosition where (dutyMan=:userName or agent=:userName)

select distinct prjClassify from slprj_conProject

put_db slprj
