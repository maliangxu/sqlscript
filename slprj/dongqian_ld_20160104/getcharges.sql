get_db slprj

select username from slprj_users where groupname='基地负责人' or groupname='责任人' or groupname='经办人' and validity='yes'

put_db