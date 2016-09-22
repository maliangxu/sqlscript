get_db_update slprj

begin_trans

update slprj_users set validity=:validity where userid in ( ::selectedUsrs )

end_trans

put_db_update