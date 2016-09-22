get_db mapb

select FIELD,FIELDREALNAME,FIELDTYPE,UNIT from g_fieldsdef where g_fieldsdef.tabname=:tablename

put_db