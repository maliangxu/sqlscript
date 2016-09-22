get_db slprj

--查询项目分类
select prj_items.prj_name,prj_problem.* from prj_items,prj_problem where prj_items.id=prj_problem.prjNum and prj_items.id=:idnum

put_db slprj