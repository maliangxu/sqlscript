get_db mapb

select -1 as sql_result,'该表格已在该表空中！' as sql_msg
where exists(
select * from tb_relation 
where tb_id=:tbid and db_id=:dbid
)

insert into tb_relation(tb_id,db_id) values (:tbid,:dbid)

put_db