get_db slprj

--查询负责人
select username from slprj_users where groupname='责任人' or groupname='经办人'

put_db slprj
