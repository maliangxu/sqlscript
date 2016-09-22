get_db_update slprj

begin_trans

select distinct peCharger
from prj_ldComment

end_trans

put_db_update slprj