get_db airquality_db

select area,position_name,aqi from stations,airquality where stations.station_code =  airquality.station_code AND time_point=:time_str

put_db