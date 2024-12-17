const CurrentWeather = () => {
  return (
       <div className="current-weather">
        <img src="img/clouds.svg" className="weather-icon" />
        <h2 className="temperature ">25 <span>°C</span></h2>
        <p className="description">Partly Cloudy</p>
      </div>
  )
}
export default CurrentWeather
