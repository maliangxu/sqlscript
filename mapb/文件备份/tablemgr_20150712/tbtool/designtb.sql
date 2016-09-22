--获取设计表的字段
get_db mapb

select id,field,fieldRealname,fieldtype,unit from g_fieldsdef where tabname=:tbrealname

put_db