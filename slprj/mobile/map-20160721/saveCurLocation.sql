get_db_update slprj

begin_trans

insert into g_userlocation(userid,locationid,lng,lat,address,time) values(:userid,:locationid,:lng,:lat,:address,:time) 

end_trans

put_db_update