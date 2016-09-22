get_db slprj

select substr(maxid,1,6)|| substr("0000"||(substr(maxid,7)+1),-3) as prjNum
from (select max(prjNum) as maxid from ::tbName )

put_db