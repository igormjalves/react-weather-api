import "./style.css"
import { UilTemperature, UilTear, UilWind, UilSun, UilSunset, UilArrowUp, UilArrowDown } from '@iconscout/react-unicons'
import { currentWeatherDate } from '../../date'

const CurrentWeather = (props) => {
    
    const timeZone = props.data.timezone;
    const sunrise = currentWeatherDate(props.data.sys.sunrise, timeZone)
    const sunset = currentWeatherDate(props.data.sys.sunset, timeZone)

    return (
        <div className="weather-info">
            <div className="top-info">
                <p className="city">{props.data.name}, {props.data.sys.country}</p>
                <p className="weather-description">{props.data.weather[0].description}</p>
            </div>
            <div className="bottom-info">
                <div className="temp-info-col">
                        <img alt="Weather" src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}.png`} />
                </div>
                <div className="temp-info-col temperature">
                    <span>{Math.round(props.data.main.temp)}°C</span>
                </div>
                <div className="temp-info-col">
                    <div className="temp-details">
                        <UilTemperature className="current-weather-icon" />
                        <span>Feels like</span>
                        <span className="temp-details-data">{Math.round(props.data.main.feels_like)}°C</span>
                    </div>
                    <div className="temp-details">
                        <UilTear className="current-weather-icon" />
                        <span>Humidity</span>
                        <span className="temp-details-data">{props.data.main.humidity}%</span>
                    </div>
                    <div className="temp-details">
                        <UilWind className="current-weather-icon" />
                        <span>Wind Speed</span>
                        <span className="temp-details-data">{props.data.wind.speed}m/s</span>
                    </div>
                </div>
            </div>
            <div className="temp-more-info">
                <UilSun className="temp-more-details-data temp-image" />
                <p className="temp-more-details-data">Rise<span className="temp-more-details-data">{`${sunrise[4]}:${sunrise[5]}`}</span></p>
                <p className="temp-more-details-data">|</p>
                <UilSunset className="temp-more-details-data temp-image" />
                <p className="temp-more-details-data">Set<span className="temp-more-details-data">{`${sunset[4]}:${sunset[5]}`}</span></p>
                <p className="temp-more-details-data">|</p>
                <UilArrowUp className="temp-more-details-data temp-image" />
                <p className="temp-more-details-data">Max<span className="temp-more-details-data">{Math.round(props.data.main.temp_max)}°C</span></p>
                <p className="temp-more-details-data">|</p>
                <UilArrowDown className="temp-more-details-data temp-image" />
                <p className="temp-more-details-data">Min<span className="temp-more-details-data">{Math.round(props.data.main.temp_min)}°C</span></p>
            </div>            
        </div>
    );
}

export default CurrentWeather;