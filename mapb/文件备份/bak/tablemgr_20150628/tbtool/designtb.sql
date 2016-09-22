--获取设计表的字段
get_db mapb

select id,field,fieldRealname,fieldtype,unit from tb_fieldsdef where tabname=:tbrealname

put_db