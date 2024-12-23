import React, { useEffect, useRef, useState } from 'react';
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import NoResultsDiv from './components/NoResultsDiv';
import { weatherCodes } from './constants';
const API_KEY = import.meta.env.VITE_API_KEY;

const App = () => {
  
  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecasts, setHourlyForecasts] = useState([]);
  const [hasNoResults, setHasNoResults] = useState(false);
  const searchInputRef = useRef(null);

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
    setHasNoResults(false);
      window.innerWidth <= 768 && searchInputRef.current.focus();

    try {
      const response = await fetch(API_URL);
      if(!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();

      // Extract the current weather details
      const temperature = Math.floor(data.current.temp_c);
      const description = data.current.condition.text;
      const weatherIcon = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data.current.condition.code)); 


      setCurrentWeather({ temperature, description, weatherIcon });

      // combines hourly data for both the forecast days
      const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour]

      searchInputRef.current.value = data.location.name;
      filterHourlyForecast(combinedHourlyData);// updates state with weather details
    } catch {
      // set setHasNoResults if there's an error
      setHasNoResults(true);
    }
  };

 // fetches default city weather details on initial rendering
  useEffect(() => {
    const defaultCity = "Mumbai";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
    getWeatherDetails(API_URL);
  }, []);

  return <div className="container">
    {/* Search section */}
    <SearchSection getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

    {hasNoResults ? (
      <NoResultsDiv />
    ) : (
        <div className="weather-section">
     
      <CurrentWeather currentWeather={currentWeather} />
  
      {/* hourly-forecast-section */}
      <div className="hourly-forecast">
        <ul className="weather-list">
          {hourlyForecasts.map((hourlyWeather) => (
            <HourlyWeather key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
          ))}       
        </ul>
      </div>
    </div>
    )
  }
    
  </div>;
};

export default App;
