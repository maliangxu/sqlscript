--SQLScript dlcheck.sql

get_db mapb

select lyr_id,svg_style from g_layers 
where lyr_id = :lyr_id

put_db