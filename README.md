# Weather_App
Программа являет собой  приложение, показывающее погоду локально.
Для этого использовались 2 сервиса:
- https://open-meteo.com/ - сервис присылает JSON с данными о погоде по заданной широте и долготе.
- https://www.geojs.io/docs/v1/endpoints/geo/ - этот сервис умеет определять локальное местоположение и присылать его координаты широты и долготы.
На запрос по адресу: https://get.geojs.io/v1/ip/geo.json получили данные  широты и долготы. 
 Из полученного ответа взять поля: "latitude", "longitude", "city".
Значения из первого запроса подставляю в строку запроса на сервер погоды, и из полученного ответа берем поля “temperature” , "windspeed", "weathercode". Для последнего поля получила текстовое описание.
