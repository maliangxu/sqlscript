get_db slprj

--��ѯ��Ŀ����
select distinct prjNum,prjClass,prjName from f_prjPosition where (dutyMan=:userName or agent=:userName)

put_db slprj
