import React, { useEffect, useRef, useState } from 'react'
import windspeed_icon from '../src/assets/windspeed.png'
import humidity_icon from '../src/assets/dewpoint.png'
import cloud_sun from '../src/assets/cloudsun.png'
import cloud from '../src/assets/cloud.png'
import clear from '../src/assets/clear.png'
import light_rain from '../src/assets/light_rain.png'
import shower_rain from '../src/assets/shower_rain.png'
import thunder from '../src/assets/thunder.png'
import snow from '../src/assets/snow.png'
import mist from '../src/assets/mist.png'
import search_icon from '../src/assets/search_icon.png'

const App = () => {

  const [weatherData, setWeatherData] = useState(false);
  const inputLocation = useRef()

  const icons_codes = {
    "01d": clear,
    "02d": cloud_sun,
    "03d": cloud,
    "04d": cloud,
    "05d": light_rain,
    "09d": shower_rain,
    "10d": shower_rain,
    "11d": thunder,
    "13d": snow,
    "50d": mist
  }

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data)
      const icon = icons_codes[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } 
    
    catch (error) {
    }
  
  }

  useEffect(() => {
    search("Las Vegas");
  },[])

  return (
    <div className='app'>
      <div className='nav'>
          <div className='headertext'>
            Weather App
          </div>
          <div className='search'>
            <input className='search_bar' ref={inputLocation} type="text" placeholder='Search City'></input>
            <img src={search_icon} alt="" onClick={()=>search(inputLocation.current.value)}/>
          </div>
          
      </div>
      <div className='weather'>
        <div className='location'>
          {weatherData.location}
        </div>
        <div className='temp'>
          {weatherData.temperature}°C 
        </div>
        <div className='icon'>
          <img src={weatherData.icon} alt="" />
        </div>
        <div className='specifics'>
          <div className='windspeeds'>
            <img src={windspeed_icon} alt="" />
              <p>Wind Speed</p>
              <p>{weatherData.windSpeed} km/h</p>
          </div>
          <div className='humidity'>
          <img src={humidity_icon} alt="" />
            <p>Humidity</p>
            <p>{weatherData.humidity}°C</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

