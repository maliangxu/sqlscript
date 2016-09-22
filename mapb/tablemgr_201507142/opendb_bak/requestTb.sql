--根据数据库名获取表格
get_db mapb,sysdb

--自己的表
select t.tb_alias as tb_alias,t.tb_id as tb_id,t.tb_name as tb_name,'4' as sharetype from tb_list t
 join tb_relation r on t.tb_id=r.tb_id
 join sysdb_resources sr on sr.resid=t.tb_id
 where sr.resowner=:username and r.db_id=:dbid and sr.restype=:restype
 and sr.flag>=0
 
--其他分享的表
--select t.tb_alias as tb_alias,t.tb_id as tb_id,t.tb_name as tb_name,
--newtb.sharetype as sharetype from tb_list t
-- join tb_relation r on t.tb_id=r.tb_id
-- join (select sr.resid,src.sharetype from 
-- sysdb_resources sr,sysdb_resControl src
-- where sr.id=src.id and sr.resowner<>:username and sr.flag>=0 and
-- src.flag>=0 and sr.restype=:restype)
-- as newtb on newtb.resid=t.tb_id where r.db_id=:dbid
select t.tb_alias as tb_alias,t.tb_id as tb_id,t.tb_name as tb_name,
newtb.sharetype as sharetype from tb_list t
 join tb_relation r on t.tb_id=r.tb_id
 join (select sr.resid,src.sharetype from 
 sysdb_resources sr,sysdb_resControl src
 where sr.id=src.id and sr.resowner<>:username and sr.flag>=0 and
 src.flag>=0 and sr.restype='db') as newtb on newtb.resid=r.db_id
 where r.db_id=:dbid


put_db