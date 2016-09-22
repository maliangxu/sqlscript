get_db sysdb,mapb

select r.*,sharetype from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
where ug.userid=:userid and r.restype=:restype and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union
select r.*,sharetype from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  --join sysdb_usergroups ug on rc.groupname=ug.groupname
where rc.groupname='public' and r.restype=:restype and rc.flag>=0 and r.flag>=0


select r.*,sharetype,upn.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_userpraiseNum upn on r.resid=upn.map_id
where ug.userid=:userid and r.restype=:restype  and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union
select r.*,sharetype,upn.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  --join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_userpraiseNum upn on r.resid=upn.map_id
where rc.groupname='public' and r.restype=:restype and rc.flag>=0 and r.flag>=0

select up.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_userpraise up on r.resid=up.map_id
where ug.userid=:userid  and up.userid=:userid and r.restype=:restype  and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union
select up.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  --join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_userpraise up on r.resid=up.map_id
where  rc.groupname='public' and up.userid=:userid and r.restype=:restype  and rc.flag>=0 and r.flag>=0

select ucn.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_usercommentNum ucn on r.resid=ucn.map_id
where ug.userid=:userid and r.restype=:restype  and ug.flag>=0 and rc.flag>=0 and r.flag>=0
union
select ucn.* from sysdb_resources r
  join sysdb_resControl rc on r.id=rc.id
  --join sysdb_usergroups ug on rc.groupname=ug.groupname
  join g_usercommentNum ucn on r.resid=ucn.map_id
where rc.groupname='public' and r.restype=:restype  and rc.flag>=0 and r.flag>=0

put_db