--SQLScript dlcheck.sql

get_db mapb

select * from g_symbol where typeDescriptor like :symDescriptor;

put_db