get_db_update slprj

begin_trans

--查询共计多少条记录
select count(id) as count
from slprj_diary

--查询日志信息
select id,lastUpdateTime,diaryContent
from slprj_diary
order by addTime DESC
limit :start,:num

end_trans

put_db_update slprj