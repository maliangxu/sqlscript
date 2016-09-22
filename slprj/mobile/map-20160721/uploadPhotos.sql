get_db_update slprj

begin_trans

insert into g_userphotos(userid,lng,lat,userText,imgsUrl,time) values(:userid,:lng,:lat,:userText,:imgsUrl,:time) 

end_trans

put_db_update