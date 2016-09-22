get_db_update slprj

begin_trans

--查询共计多少条记录
select count(id) as count
from slprj_warn
where ::filter

--查询提醒
select id,title,bewarn,reminder,time
from slprj_warn
where ::filter
order by time DESC
limit :start,:num

end_trans

put_db_update slprj