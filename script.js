const weatherBlock = document.getElementById('weather');
const urlLocation = "https://get.geojs.io/v1/ip/geo.json"; 

const myCity = document.getElementById('city');
const temperature = document.getElementById('temperature');
const windspeed = document.getElementById('windspeed');
const weathercode =document.getElementById('weathercode');



showWeatherForecast(getLocation,getWeather,showWeather);


 async function getLocation(){
try{
    const response = await fetch(urlLocation);
    const data = await response.json();
    return {city:data.city,
      longitude: data.longitude,
      latitude:data.latitude };
 }catch {
    throw new Error("error while get location");
 
 }
}

async function getWeather(location){
try{
    const{city,longitude,latitude} = location;
    const urlWeather = "https://api.open-meteo.com/v1/forecast?"+`latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(urlWeather);
    const data = await response.json();
    return {city:city,
        temperature: data.current_weather.temperature,  
        windspeed: data.current_weather.windspeed,   
        weathercode: data.current_weather.weathercode,
        description:weatherDescription(data.current_weather.weathercode) 
    
    };
  }  catch {
    throw new Error("error while get weather"); 
  }
}
function showWeather(weather){

myCity.innerText=weather.city;
temperature.innerText=weather.temperature+"°C";
windspeed.innerText=weather.windspeed+"km/h";
weathercode.innerText = weather.description;

}

async function showWeatherForecast(getLocationFunc,getWeatherFunc,showWeatherFunc){
    const location = await getLocationFunc();
    const weather = await getWeatherFunc(location);
     showWeatherFunc(weather);
}

function weatherDescription(weathercode){
    switch (weathercode) {
        case 0: return "Clear sky";
        case 1: return "Mainly clear";
        case 2: return "Partly cloudy";
        case 3: return "Overcast";
        case 45: return "Fog";
        case 48: return "Depositing rime fog";
        case 51: return "Light drizzle";
        case 53: return "Moderate drizzle";
        case 55: return "Drizzle: dense";
        case 56: return "Freezing drizzle: light";
        case 57: return "Freezing drizzle: dense";
        case 61: return "Rain: slight";
        case 63: return "Rain: moderate";
        case 65: return "Rain: heavy";
        case 66: return "Freezing rain: light ";
        case 67: return "Freezing rain:  heavy";
        case 71: return "Snow fall: slight";
        case 73: return "Snow fall:  moderate";
        case 75: return "Snow fall: heavy";
        case 77: return "Snow grains";
        case 80: return "Rain showers: slight";
        case 81: return "Rain showers: moderate";
        case 82: return "Rain showers: violent";
        case 85: return "Snow showers slight";
        case 86: return "Snow showers  heavy";
        case 95: return "Thunderstorm";
        case 96: return "Thunderstorm with slight hail";
        case 99: return "Thunderstorm with heavy hail";
    
        default:
          return `Unknown weather code ${weathercode}`
    
      } 
}
