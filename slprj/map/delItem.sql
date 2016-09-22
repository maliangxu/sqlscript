get_db_update slprj

begin_trans

--
delete from ::tb where :field = :data

end_trans

put_db_update slprj