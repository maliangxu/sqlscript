get_db slprj

--获取所有的动迁项目问题
select prj_items.prj_name,prj_problem.* from prj_items,prj_problem where prj_items.id=prj_problem.prjNum order by id desc

put_db slprj