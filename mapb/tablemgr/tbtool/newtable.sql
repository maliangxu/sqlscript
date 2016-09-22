--新建表格
get_db_update mapb,sysdb

begin_trans

--insert into tb_list(flag,tb_name,tb_alias,tb_type) values (0,:tbrname,:tablename,1)

--select 'tb_id='||last_insert_rowid() as sql_add_param from tb_list

--insert into tb_relation(db_id,tb_id) values (:dbid,:tb_id)

--insert into sysdb_resources(flag,resid,restype,resowner)
 --values (0,:tb_id,'tb',:username)

--create table if not exists ::tbrname(ID integer PRIMARY KEY,V1 text,V2 text,V3 text,V4 text,V5 text,V6 text,V7 text,V8 text,V9 text,V10 text,V11 text,V12 text,V13 text,V14 text,V15 text,V16 text,V17 text,V18 text,V19 text,V20 text,V21 text,V22 text,V23 text,V24 text,V25 text,V26 text,V27 text,V28 text,V29 text,V30 text,V31 text,V32 text,V33 text,V34 text,V35 text,V36 text,V37 text,V38 text,V39 text,V40 text,V41 text,V42 text,V43 text,V44 text,V45 text,V46 text,V47 text,V48 text,V49 text,V50 text,V51 text,V52 text,V53 text,V54 text,V55 text,V56 text,V57 text,V58 text,V59 text,V60 text,V61 text,V62 text,V63 text,V64 text,V65 text,V66 text,V67 text,V68 text,V69 text,V70 text,V71 text,V72 text,V73 text,V74 text,V75 text,V76 text,V77 text,V78 text,V79 text,V80 text,V81 text,V82 text,V83 text,V84 text,V85 text,V86 text,V87 text,V88 text,V89 text,V90 text,V91 text,V92 text,V93 text,V94 text,V95 text,V96 text,V97 text,V98 text,V99 text,V100 text)

insert into g_tab(flag,tb_name,tb_alias,tb_type) values (0,:tbrname,:tablename,1)

select 'tb_id='||last_insert_rowid() as sql_add_param from g_tab

insert into g_tab_rel(map_id,tb_id) values (:dbid,:tb_id)

insert into sysdb_resources(flag,resid,restype,resowner)
 values (0,:tb_id,'tb',:username)

create table if not exists ::tbrname (FID INTEGER PRIMARY KEY,V1 REAL,V2 REAL,V3 REAL,V4 REAL,V5 REAL,V6 REAL,V7 REAL,V8 REAL,V9 REAL,V10 REAL,V11 REAL,V12 REAL,V13 REAL,V14 REAL,V15 REAL,V16 REAL,V17 REAL,V18 REAL,V19 REAL,V20 REAL,V21 REAL,V22 REAL,V23 REAL,V24 REAL,V25 REAL,V26 REAL,V27 REAL,V28 REAL,V29 REAL,V30 REAL,V31 REAL,V32 REAL,V33 REAL,V34 REAL,V35 REAL,V36 REAL,V37 REAL,V38 REAL,V39 REAL,V40 REAL,V41 REAL,V42 REAL,V43 REAL,V44 REAL,V45 REAL,V46 REAL,V47 REAL,V48 REAL,V49 REAL,V50 REAL,V51 REAL,V52 REAL,V53 REAL,V54 REAL,V55 REAL,V56 REAL,V57 REAL,V58 REAL,V59 REAL,V60 REAL,V61 REAL,V62 REAL,V63 REAL,V64 REAL,V65 REAL,V66 REAL,V67 REAL,V68 REAL,V69 REAL,V70 REAL,V71 REAL,V72 REAL,V73 REAL,V74 REAL,V75 REAL,V76 REAL,V77 REAL,V78 REAL,V79 REAL,V80 REAL,V81 REAL,V82 REAL,V83 REAL,V84 REAL,V85 REAL,V86 REAL,V87 REAL,V88 REAL,V89 REAL,V90 REAL,V91 REAL,V92 REAL,V93 REAL,V94 REAL,V95 REAL,V96 REAL,V97 REAL,V98 REAL,V99 REAL,V100 REAL)

--create table if not exists ::tbrname (FID integer PRIMARY KEY,V1,V2,V3,V4,V5,V6,V7,V8,V9,V10,V11,V12,V13,V14,V15,V16,V17,V18,V19,V20,V21,V22,V23,V24,V25,V26,V27,V28,V29,V30,V31,V32,V33,V34,V35,V36,V37,V38,V39,V40,V41,V42,V43,V44,V45,V46,V47,V48,V49,V50,V51,V52,V53,V54,V55,V56,V57,V58,V59,V60,V61,V62,V63,V64,V65,V66,V67,V68,V69,V70,V71,V72,V73,V74,V75,V76,V77,V78,V79,V80,V81,V82,V83,V84,V85,V86,V87,V88,V89,V90,V91,V92,V93,V94,V95,V96,V97,V98,V99,V100)

end_trans

put_db_update