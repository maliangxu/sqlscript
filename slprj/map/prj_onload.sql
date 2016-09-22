get_db slprj

--查询项目名称
select distinct prjNum,prjClass,prjName from f_prjPosition where (dutyMan=:userName or agent=:userName)

put_db slprj
