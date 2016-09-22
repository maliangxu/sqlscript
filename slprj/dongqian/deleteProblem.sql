get_db_update slprj

begin_trans

--获取所有的动迁项目问题
delete from prj_problem where id=:itemid

end_trans

put_db_update slprj