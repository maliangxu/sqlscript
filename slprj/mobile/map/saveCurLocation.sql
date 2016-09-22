get_db_update slprj

begin_trans

insert into g_userphotos(userid,lng,lat,address,time,userText) values(:userid,:lng,:lat,:address,:time,:userText) 

end_trans

put_db_update