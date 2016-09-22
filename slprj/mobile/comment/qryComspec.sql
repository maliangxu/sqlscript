get_db_update slprj

begin_trans

--查询单条批示所有信息
select prjName,prjClassify,ldC.id,ldC.prjNum,ldC.content,leader,comTime,ldC.deadline,peCharger,finishSitu,ldC.validate,
       ldC.validateTime,ldC.ifApply,lastCmcate,finishAces,notFinishInst,'ldc' as name
from slprj_ldComment as ldc left join slprj_conProject as con on ldc.prjNum=con.prjNum
where ldc.id=:comid

--查询单条批示的进展情况
select content,addTime,'ldcp' as name
from slprj_ldCProcess
where ldCId=:comid
order by addTime DESC

--查询单条批示的交互记录情况
select content,addPerson,type,addTime,'feedback' as name
from cmt_feedback
where ldCId=:comid
order by id DESC

end_trans

put_db_update slprj