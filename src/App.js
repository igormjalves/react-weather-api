import { useState } from 'react';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import CurrentWeather from './components/current-weather';
import ForecastWeather from './components/forecast-weather';
import LocalTime from './components/local-time';
import Search from './components/search';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    // console.log(searchData)
    const [latitude, longitude] = searchData.value.split(" ");
    
    const currentWeatherData = fetch(`${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);
    const forecastWeatherData = fetch(`${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([currentWeatherData, forecastWeatherData])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({city: searchData.label, ...weatherResponse});
        setForecastWeather({city: searchData.label, ...forecastResponse});
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // console.log(currentWeather)
  // console.log(forecastWeather)
  
  return (
    <div className="App">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <LocalTime data={currentWeather} />}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <ForecastWeather data={forecastWeather} />}
    </div>
  );
}

export default App;
