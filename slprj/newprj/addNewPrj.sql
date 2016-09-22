get_db_update slprj

begin_trans

--新增建设项目
insert into slprj_conProject (prjNum,prjName,prjClassify,prjContent,startTime,deadline,dutyOfficer,agent,agencyCom,peCharge,occArea,conArea,fund,remark,state) 
values (:prjNum,:prjName,:prjClassify,:prjContent,:startTime,:deadline,:dutyOfficer,:agent,:agencyCom,:peCharge,:occArea,:conArea,:fund,:remark,:state)

--查询项目分类
--select distinct className from slprj_prjClass

--查询负责人、经办人
--select username,groupname from slprj_users where groupname='责任人' or groupname='经办人'
end_trans

put_db_update slprj