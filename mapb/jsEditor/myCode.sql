get_db sysdb

--用户自己的资源 :userid,
select respath from sysdb_resources where resowner=:userid and restype='code' and flag>=0

put_db
