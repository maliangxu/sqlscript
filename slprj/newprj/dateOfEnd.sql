get_db slprj

SELECT datetime(a,'0 days') as start,datetime(a,'+6 days') as end from 
(
select datetime(:friday,'-'||strftime('%w',:friday)||' days') as a
)

put_db