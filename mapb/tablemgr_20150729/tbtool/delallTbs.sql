--物理删除所有的表格
get_db mapb,sysdb

begin_trans

delete from g_tab where tb_id in ::sAlltbids 

delete from g_tab_rel where tb_id in ::sAlltbids and map_id=:dbid

delete from sysdb_resources where resid in ::sAlltbids and resowner=:username and restype='tb'

delete from sysdb_resControl where (select sr.resid from sysdb_resources sr,sysdb_resControl src where sr.id=src.id and src.shareby<>:username and sr.restype='tb') in ::sAlltbids

delete from g_fieldsdef where tabname in ::sAlltbreals

end_trans

put_db