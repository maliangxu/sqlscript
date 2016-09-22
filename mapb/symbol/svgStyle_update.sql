--SQLScript dlcheck.sql

get_db_update mapb

update g_layers set svg_style = :svg_style
where lyr_id = :lyr_id

put_db_update