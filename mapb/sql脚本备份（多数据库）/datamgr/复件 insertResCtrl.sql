--用户分享资源：一次性插入多条记录

get_db sysdb

--判断是否存在该图层
select -1 as sql_result,'there not exists this layer or ftset,please check' as sql_msg
where not exists(
	select resname from sysdb_resources
    where resowner=:userid and (resname=:resnames or resname in (:resnames)) and flag>=0
)

insert or replace into sysdb_resControl(flag,resid,groupname,sharetype,rescdesc)
select 0,r.resid,up.groupname,:sharetype,:rescdesc 
from sysdb_usergroups up ,sysdb_resources r
where (up.groupname=:groupnames or up.groupname in (:groupnames)
 or
r.resname=:resnames or r.resname in (:resnames))  and r.resowner=:userid and r.flag>=0

put_db