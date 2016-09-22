--SQLScript dlcheck.sql

get_db mapb

select * from g_symbol where symDescriptor like :symDescriptor;

put_db