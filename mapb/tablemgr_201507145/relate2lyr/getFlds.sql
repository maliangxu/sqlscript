
--获取图层的属性字段

get_db mapb

select gf.field,gf.fieldRealname from g_fieldsdef gf
where gf.tabname= :tbname   

put_db