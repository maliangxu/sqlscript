get_db sysdb

--����Ƿ��¼
select -2 as sql_result,'�û�δ��¼' as sql_msg
where not exists(
select * 
from users_online 
where ECNUID=:ECNUID  
)

--�Ƿ��¼��ʱ
select -3 as sql_result,'�û���ʱ��δ����' as sql_msg
where not exists(
select * 
from users_online 
where ECNUID=:ECNUID and datetime(access_time,'60 minutes')>datetime('now','localtime') 
)

--��¼����ֵuserid
select 'userid='||userid as sql_add_param
from users_online 
where ECNUID=:ECNUID

select  1 as sql_result,'�Ѿ���¼ '||:userid as sql_msg

put_db