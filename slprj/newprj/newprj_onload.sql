get_db slprj

--��ѯ��Ŀ����
select distinct prjName from slprj_conProject

--��ѯ��Ŀ����
select distinct prjClassify from slprj_conProject

--��ѯ��Ŀ״̬
select distinct state from slprj_conProject

--��ѯ������
select distinct dutyOfficer from slprj_conProject

--��ѯ������
select distinct agent from slprj_conProject

select username,groupname,telephone from slprj_users where groupname='������' or groupname='������' or groupname='���ظ�����' or groupname='����Ա'

put_db slprj
