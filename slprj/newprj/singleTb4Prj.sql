get_db slprj

--查询建设项目的基本信息
select prjNum,prjName,prjClassify,prjContent,startTime,deadline,dutyOfficer,agent,agencyCom,peCharge,fund,"prjInfo" as type from slprj_conProject where prjNum=:prjNum

--查询上年度完成情况
select prjNum,finishSitu,addTime,"lastYearF" as type from slprj_schYear where prjNum=:prjNum and prjYear=:lYear_y

--查询本年度完成计划
select prjNum,plan,addTime,"thisYearPlan" as type from slprj_schYear where prjNum=:prjNum and prjYear=:year

--查询上季度完成情况
select prjNum,finishSitu,addTime,"lastSeasonF" as type from slprj_schSeason where prjNum=:prjNum and prjYear=:lYear_s and prjSeason=:lSeason

--查询本季度工作计划
select prjNum,plan,addTime,"thisSeasonPlan" as type from slprj_schSeason where prjNum=:prjNum and prjYear=:year and prjSeason=:season

--查询上月完成情况
select prjNum,finishSitu,addTime,"lastMonthF" as type from slprj_schMonth where prjNum=:prjNum and prjYear=:lYear_m and prjMonth=:lMonth_m

--查询本月工作计划
select prjNum,plan,addTime,"thisMonthPlan" as type from slprj_schMonth where prjNum=:prjNum and prjYear=:year and prjMonth=:month

--查询上周完成情况
select prjNum,finishSitu,addTime,"lastWeekF" as type from slprj_schWeek where prjNum=:prjNum and prjYear=:lYear_w and prjMonth=:lMonth_w and prjWeek=:lWeek_w

--查询本周工作计划
select prjNum,plan,addTime,"thisWeekPlan" as type from slprj_schWeek where prjNum=:prjNum and prjYear=:year and prjMonth=:month and prjWeek=:week 

--查询全过程管理
select lx_suggest2,lx_suggest5,lx_enEstimate2,lx_enEstimate5,lx_feasibility2,lx_feasibility5,lx_priRespond2,lx_priRespond5,lx_estiRespond2,lx_estiRespond5,gh_chooseLoc2,gh_chooseLoc5,gh_consLand2,gh_consLand5,gh_plan2,gh_prjPlan2,td_group2nation2,td_huabo2,td_zhengdi2,td_shebao2,td_huabojueding2,td_yongdipizhun2,td_zhengshou2,jg_baojian1,jg_shejizhaobiao1,jg_kanchazhaobiao1,jg_shigongtu1,jg_shigongxuke1,jg_shigongzhaobiao1,jg_jianlizhaobiao1,sj_gongcheng3,sj_caiwu3,gd_guidang1,gd_yijiao1,gh_plan5,gh_prjPlan5,td_group2nation5,td_huabo5,td_zhengdi5,td_shebao5,td_huabojueding5,td_yongdipizhun5,td_zhengshou5,jg_baojian5,jg_shejizhaobiao5,jg_kanchazhaobiao5,jg_shigongtu5,jg_shigongxuke5,jg_shigongzhaobiao5,jg_jianlizhaobiao5,sj_gongcheng5,sj_caiwu5,gd_guidang5,gd_yijiao5,"process" as type from slprj_processManage where id=:prjNum 

--查询领导批示
select content,"ldComment" as type from slprj_ldComment where prjNum=:prjNum

--查询问题、解决措施和需协商的问题
select prjProblem,solution,consultMatter,"problem" as type from slprj_Problem where prjNum=:prjNum

--查询资金问题
--select id,Inv1,"fundProblem" as type from slprj_fund where id=:prjNum

put_db slprj
