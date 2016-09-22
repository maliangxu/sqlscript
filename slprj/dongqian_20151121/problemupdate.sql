get_db_update slprj

--添加项目
update prj_problem set prjProblem=:existpro,solution=:solveplan,consultMatter=:leadersolve,state=:state,solveTime=:solvetime,remark=:dqgx_warn where id=:itemid 

put_db_update slprj