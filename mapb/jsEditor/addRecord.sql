get_db_update sysdb

begin_trans

select 'maxid='||max(resid) as sql_add_param from sysdb_resources where restype='code' 

insert into sysdb_resources(flag,resid,restype,resowner,respath,[timestamp])
values(0,:maxid+1,'code',:userid,:respath,:timer)

end_trans

put_db_update