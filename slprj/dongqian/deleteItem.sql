get_db_update slprj

begin_trans

delete from prj_items where id=:prjid

delete from prj_progress where pid=:prjid

delete from prj_problem where prjNum=:prjid

delete from prj_ldComment where prjNum=:prjid

delete from prj_ldCProcess where prjNum=:prjid

end_trans


put_db_update slprj