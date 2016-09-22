--添加表空间
get_db mapb,sysdb


begin_trans

insert into db_map(db_name,db_desc) values (:db_name,:db_desc)

select 'db_id='||last_insert_rowid() as sql_add_param from db_map

insert into sysdb_resources(flag,resid,restype,resowner,respath,resdesc,imgurl,keywords)
values (0,:db_id,'db',:username,:respath,:db_desc,:imgurl,:keywords)

end_trans

put_db