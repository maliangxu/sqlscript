--请求所有的表格
get_db mapb,sysdb

--请求用户自己的表格
--owner=1是用户自己的表，owner=2是用户所在组分享的表，owner=3是公众分享的表
select t.tb_id,t.tb_name,t.tb_alias,'4' as sharetype,'1' as owner from g_tab t
 join sysdb_resources sr on sr.resid=t.tb_id where sr.flag>=0 and
 sr.resowner=:username and sr.restype=:restype

--请求用户组内的表格
select t.tb_id,t.tb_name,t.tb_alias,src.sharetype,'2' as owner from
 g_tab t,sysdb_resources sr,sysdb_resControl src,sysdb_usergroups sug
 where sug.userid=:username and sug.flag>=0 and sug.groupname=src.groupname
 and src.id=sr.resid and src.flag>=0 and sr.restype=:restype and sr.flag>=0
 and sr.resid=t.tb_id 

--请求公共组的表格
select t.tb_id,t.tb_name,t.tb_alias,src.sharetype,'3' as owner from
  g_tab t,sysdb_resources sr,sysdb_resControl src
  where src.sharetype='public' and src.flag>=0 and src.id=sr.resid and
  sr.restype=:restype and sr.flag>=0 and sr.resid=t.tb_id

put_db
