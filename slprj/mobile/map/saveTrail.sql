get_db_update slprj

begin_trans

insert into g_usertrail(userid,trailid,trailpoints,time) values(:usrid,:trailid,:trailpoints,:time) 

end_trans

put_db_update