

get_db mapb,sysdb

--向resources表中增加记录
select 'ftsetTab='||'f_'|| :ftsetname as sql_add_param

select 'ftsetid='|| ftset_id as sql_add_param 
from g_ftset where ftsetName =:ftsetname and flag>=0

insert into sysdb_resources(flag,resid,restype,resowner,resdesc,keywords,visitcount)  values (0,:ftsetid,'lyr',:userid,'','',0)

select * from ::ftsetTab limit 1


put_db
