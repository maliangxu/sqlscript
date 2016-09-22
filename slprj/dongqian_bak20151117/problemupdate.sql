get_db slprj

--添加项目
update prj_problem set prjProblem=:existpro,solution=:solveplan,consultMatter=:leadersolve,state=:state,solveTime=:solvetime,remark=:dqgx_warn where id=:itemid 

put_db slprj