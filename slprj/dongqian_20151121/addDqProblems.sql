get_db_update slprj

--添加项目
insert into prj_problem(prjNum,prjProblem,solution,consultMatter,state,remark,addPerson,addTime) values (:prjnum,:existpro,:solveplan,:leadersolve,:state,:warn,:addPerson,:addTime)

put_db_update slprj