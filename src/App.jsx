import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";

const App = () => {
  return <div className="container">
    {/* Search section */}
    <SearchSection/>

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
