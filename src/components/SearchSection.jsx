const SearchSection = ({getWeatherDetails}) => {

  // handles search city form submission
  const API_KEY = import.meta.env.API_KEY;
  const handleCitySearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.querySelector(".search-input");
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}`;
    getWeatherDetails(API_URL);   // fetches weather details for the city entered
    }
    
    return (
      <div className="search-section">
        <form action="#" className="search-form" onSubmit={handleCitySearch}>
      <span className="material-symbols-rounded">search
        </span>
        <input type="search" placeholder="Enter a City name" className="search-input" required />
      </form>
      <button className="location-button">
      <span className="material-symbols-rounded">
         my_location
      </span>
      </button>
    </div>
  )
}

export default SearchSection
