get_db_update mapb

begin_trans

--完整的复制一个表格
insert into ::tbrealname select * from ::tbreal 

end_trans

put_db_update