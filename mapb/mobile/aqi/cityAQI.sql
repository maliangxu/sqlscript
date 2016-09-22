get_db airquality_db

select stations.position_name,airquality.aqi from stations,airquality where stations.station_code=airquality.station_code AND airquality.time_point =:time_str AND stations.area=:cityArea

put_db