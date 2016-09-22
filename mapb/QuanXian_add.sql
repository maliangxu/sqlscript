--SQLScript dlcheck

get_db_update sysdb

begin_trans

sql_if ::user_add 
insert or replace into sysdb_users(flag,userid,username,pass,email,userdesc,validity)
values(0,:userid,:username,:pass,:email,:userdesc,'no')

sql_if ::group_add 
insert or replace into sysdb_usergroups(flag,userid,groupname,groupdesc)
values(0,:userid,:groupname,:groupdesc)

sql_if ::res_add 
insert or replace into sysdb_resources(flag,resname,restype,resowner,resdesc)
values(0,:resname,:restype,:userid,:resdesc)

sql_if ::resctrol_add 
insert or replace into sysdb_resControl(flag,resname,groupname,sharetype,rescdesc)
values(0,:resname,:groupname,:sharetype,:rescdesc)

end_trans

put_db_update