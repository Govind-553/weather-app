import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";

const App = () => {
  // fetches weather details from API url 
  const getWeatherDetails = async (API_URL) => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("Error fetching weather data");
    }
  };

  return <div className="container">
    {/* Search section */}
    <SearchSection getWeatherDetails={getWeatherDetails} />

    {/* Weather section */}
    <div className="weather-section">
     
    <CurrentWeather />
  
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
