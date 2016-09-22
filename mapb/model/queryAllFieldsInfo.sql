get_db mapb

select FIELD as V,FIELDREALNAME as field,FIELDTYPE as fieldtype,UNIT as unit from g_fieldsdef where g_fieldsdef.tabname=:tablename

put_db