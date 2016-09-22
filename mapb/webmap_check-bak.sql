SQLScript dlcheck

get_db_update sysdb

--����ܷ����Ȩ��
select -3 as sql_result,'�û�û�з��ʴ���Դ��Ȩ��' as sql_msg
where not exists(
	select res_id 
	from sysdb_resources 
	where resname=:map and owneruser=:userid and flag>=0 
	union
	select res_id 
	from sysdb_resources 
        where resname=:map and resshare >0 and groupid isnull and  flag>=0
	union 
	select res_id 
	from sysdb_resources r join sysdb_res_group rg on r.groupid=rg.groupid join sysdb_users u on u.userid=rg.userid
	where  r.resname=:map and r.share >0 and (groupid notnull)  and r.flag>=0 and rg.flag>=0 and u.flag>=0
	and userid=:userid
)

--������ʼ�¼
insert or replace users_online(ECNUID,userid,access_time,access_url,access_param)
values(:ECNUID,:userid,datetime('now','localtime','webmap',:map)

put_db_update