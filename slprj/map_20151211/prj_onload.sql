get_db slprj

--��ѯ��Ŀ����
select distinct prjName from f_prjPosition where (dutyMan=:userName or agent=:userName)

select distinct prjClassify from slprj_conProject

put_db slprj
