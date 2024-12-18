import React, { useState } from 'react';
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import { weatherCodes } from './constants';
import { use } from 'react';

const App = () => {
  
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;
    // filter the data for next 24 hours
    const next24HoursData = hourlyData.filter(({time}) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >=currentHour && forecastTime <= next24Hours;
    })

    setHourlyForecasts(next24HoursData);
  }
  // fetches weather details from API url 
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Extract the current weather details
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code)); 


      setCurrentWeather({ temperature, description, weatherIcon });

      // combines hourly data for both the forecast days
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]
      filterHourlyForecast(combinedHourlyData);// updates state with weather details
    } catch (error) {
      console.log("Error fetching weather data");
    }
  };

  return <div className="container">
    {/* Search section */}
    <SearchSection getWeatherDetails={getWeatherDetails} />

    {/* Weather section */}
    <div className="weather-section">
     
      <CurrentWeather currentWeather={currentWeather} />
  
      {/* hourly-forecast-section */}
      <div className="hourly-forecast">
        <ul className="weather-list">
          {hourlyForecasts.map((hourlyWeather) => (
            <HourlyWeather key={hourlyWeather.time_epoch} />
          ))};        
        </ul>
      </div>
    </div>
  </div>;
};

export default App;
