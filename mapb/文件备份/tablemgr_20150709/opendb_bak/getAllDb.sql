--取出所有的表空间，我的，我所在组的，其他人（公共组）的
get_db sysdb,mapb

--我的表空间
select d.db_name,'me' as owner,d.db_id,'4' as sharetype from db_map d
join sysdb_resources r on r.resid=d.db_id
where r.flag>=0 and r.resowner=:username and r.restype=:restype

--我所在组的表空间
select d.db_name,'group' as owner,rc.sharetype,u.groupname,d.db_id from db_map d
join sysdb_resources r on r.resid=d.db_id
join sysdb_resControl rc on rc.id=r.id
join sysdb_usergroups u on rc.groupname=u.groupname
where r.restype=:restype and r.flag>=0 and u.flag>=0
 and rc.flag>=0 and u.userid=:username

--其他人的表空间
select d.db_name,'public' as owner,rc.sharetype,d.db_id from db_map d
join sysdb_resources r on r.resid=d.db_id
join sysdb_resControl rc on rc.id=r.id
where r.flag>=0 and rc.flag>=0 and r.restype=:restype and rc.groupname="public"

put_db