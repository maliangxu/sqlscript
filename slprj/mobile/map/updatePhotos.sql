get_db_update slprj

begin_trans

update g_userphotos set imgsUrl=:imgsUrl where id=:id 

end_trans

put_db_update