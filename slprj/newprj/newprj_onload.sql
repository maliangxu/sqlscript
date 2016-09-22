get_db slprj

--查询项目名称
select distinct prjName from slprj_conProject

--查询项目分类
select distinct prjClassify from slprj_conProject

--查询项目状态
select distinct state from slprj_conProject

--查询负责人
select distinct dutyOfficer from slprj_conProject

--查询经办人
select distinct agent from slprj_conProject

select username,groupname,telephone from slprj_users where groupname='责任人' or groupname='经办人' or groupname='基地负责人' or groupname='管理员'

put_db slprj
