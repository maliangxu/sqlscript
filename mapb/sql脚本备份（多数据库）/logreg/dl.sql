get_db sysdb

--�����û���
select -1 as sql_result,'account is not exist or the password is wrong' as sql_msg
where not exists(
select * from sysdb_users 
where userid=:userid and pass=:pass and flag>=0
)

begin_trans

--������ʼ�¼
insert or replace into users_online(ECNUID,userid,access_time,access_url,access_param)
values(lower(hex(randomblob(16))),:userid,datetime('now','localtime'),'dl','')

end_trans

--������� ECNUID ������ʹ��
select 'ECNUID='||ECNUID as sql_add_param
from users_online
where userid=:userid

--���ؽ�� ����cookie 
select  1 as sql_result,'��¼�ɹ� '||:userid as sql_msg,'Set-Cookie:ECNUID='||:ECNUID ||'; path=/' as sql_set_head

put_db