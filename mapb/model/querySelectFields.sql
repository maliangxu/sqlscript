get_db mapb

select FIELD from g_fieldsdef where tabname=:tablename and FIELDREALNAME in ( ::fields )

put_db