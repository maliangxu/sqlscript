--获取表空间列表的信息
get_db sysdb,mapb

--获取我的表信息

select m.db_alias,r.tb_alias from db_map m 
  join sysdb_resources rc on m.db_id=rc.resid
  join tb_relation r on rc.resid=r.db_id
where rc.restype=:restype and rc.resowner=:username and rc.flag>=0

--获取共享的表信息


put_db