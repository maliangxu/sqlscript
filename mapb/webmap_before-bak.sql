--SQLScript mapb.dlcheck

get_db_update sysdb

--检查能否访问权限
select -3 as sql_result,'用户没有访问此资源的权限' as sql_msg
where not exists(
          select 1
	)

--保存访问记录
insert or replace into users_online(ECNUID,userid,access_time,access_url,access_param)
values(:ECNUID,:userid,datetime('now','localtime'),'webmap',:map)

put_db_update