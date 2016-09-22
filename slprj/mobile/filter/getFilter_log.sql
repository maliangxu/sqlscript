get_db_update slprj

begin_trans

--查询日志作者
select distinct writer
from slprj_diary
where ::filter

--查询一共有多少条日志记录
select count(writer) as count
from slprj_diary

end_trans

put_db_update slprj