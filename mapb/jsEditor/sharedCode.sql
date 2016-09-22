get_db sysdb


--用户可访问的资源（并且owner不是该用户）
--select r.resowner,rc.sharetype from sysdb_resources r 
select respath from sysdb_resources r 
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype='code' and r.resowner!=:userid and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union 
select respath from sysdb_resources r 
join sysdb_resControl rc on r.id=rc.id
where groupname='public' and r.restype='code' and r.resowner!=:userid and rc.flag>=0 and r.flag>=0
--对所有组开放的数据 （公开数据） 


put_db
