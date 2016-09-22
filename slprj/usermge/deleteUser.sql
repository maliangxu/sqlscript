get_db_update slprj

begin_trans

delete from slprj_users where userid in ( ::selectedUsrs )

end_trans

put_db_update