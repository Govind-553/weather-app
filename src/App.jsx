import React, { useState } from 'react';
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import { weatherCodes } from './constants';

const App = () => {
  
  const [currentWeather, setCurrentWeather] = useState({});
  // fetches weather details from API url 
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Extract the current weather details
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = objects.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code)); 


      setCurrentWeather({ temperature, description, weatherIcon }); // updates state with weather details
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
         <HourlyWeather />
          
        </ul>
      </div>
    </div>
  </div>;
};

export default App;
