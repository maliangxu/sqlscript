--SQLScript mapb.dlcheck

get_db_update sysdb

--����ܷ����Ȩ��
select -3 as sql_result,'�û�û�з��ʴ���Դ��Ȩ��' as sql_msg
where not exists(
          select 1
	)

--������ʼ�¼
insert or replace into users_online(ECNUID,userid,access_time,access_url,access_param)
values(:ECNUID,:userid,datetime('now','localtime'),'webmap',:map)

put_db_update