--新建表格
get_db mapb,sysdb

begin_trans

insert into tb_list(flag,tb_name,tb_alias,tb_type) values (0,:tbrname,:tablename,1)

select 'tb_id='||last_insert_rowid() as sql_add_param from tb_list

insert into tb_relation(db_id,tb_id) values (:dbid,:tb_id)

insert into sysdb_resources(flag,resid,restype,resowner)
 values (0,:tb_id,'tb',:username)

create table if not exists ::tbrname(ID integer PRIMARY KEY,V1 text,V2 text,V3 text,V4 text,V5 text,V6 text,V7 text,V8 text,V9 text,V10 text,V11 text,V12 text,V13 text,V14 text,V15 text,V16 text,V17 text,V18 text,V19 text,V20 text,V21 text,V22 text,V23 text,V24 text,V25 text,V26 text,V27 text,V28 text,V29 text,V30 text,V31 text,V32 text,V33 text,V34 text,V35 text,V36 text,V37 text,V38 text,V39 text,V40 text,V41 text,V42 text,V43 text,V44 text,V45 text,V46 text,V47 text,V48 text,V49 text,V50 text,V51 text,V52 text,V53 text,V54 text,V55 text,V56 text,V57 text,V58 text,V59 text,V60 text,V61 text,V62 text,V63 text,V64 text,V65 text,V66 text,V67 text,V68 text,V69 text,V70 text,V71 text,V72 text,V73 text,V74 text,V75 text,V76 text,V77 text,V78 text,V79 text,V80 text,V81 text,V82 text,V83 text,V84 text,V85 text,V86 text,V87 text,V88 text,V89 text,V90 text,V91 text,V92 text,V93 text,V94 text,V95 text,V96 text,V97 text,V98 text,V99 text,V100 text)

end_trans

put_db