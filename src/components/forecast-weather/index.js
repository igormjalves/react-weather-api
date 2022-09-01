import './style.css'
import { currentWeatherDate, forecastWeatherDate } from '../../date'

const ForecastWeather = (props) => {

    const tomorrow = (props.data.list[0].dt+props.data.city.timezone)*1000

    const forecastDateInfo = forecastWeatherDate(tomorrow)
    const tomorrowMidnight = forecastDateInfo[0]
    let noonDays = forecastDateInfo[1]
    const gmt = forecastDateInfo[2]
    
    const todayForecast = []
    const nextDaysForecast = []

    const forecastData = props.data.list
    
    forecastData.forEach((element) => {
        if(((element.dt) < Math.floor(tomorrowMidnight.getTime() / 1000)) && (todayForecast.length < 5)) {
            todayForecast.push(element)
            let testDate = new Date((element.dt+props.data.city.timezone+gmt)*1000)
            element.hour_forecast = `${(testDate.getHours() < 10) ? "0" + testDate.getHours() : testDate.getHours()}:00`
        }

        if((element.dt) === noonDays) {
            nextDaysForecast.push(element)
            element.week_day = currentWeatherDate(element.dt,0)[0];
            noonDays += 86400
        }
    })

    return (
        <div className='forecast-info'>
            <div className="forecast-header">
                <p className='forecast-title'>hourly</p>
            </div>
            <hr className='forecast-line' />

            <div className='forecast-hourly'>
                {todayForecast.map(item => (
                    <div className='forecast-hourly-col'>
                        <p className='forecast-hourly-data'>{item.hour_forecast}</p>
                        <img alt='' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} className='forecast-hourly-image' />
                        <p className='forecast-temperature' >{Math.round(item.main.temp)}°C</p>
                    </div>
                ))}
            </div>

            <div className="forecast-header">
                <p className='forecast-title'>daily</p>
            </div>
            <hr className='forecast-line' />

            <div className='forecast-hourly'>
                {nextDaysForecast.map(item => (
                    <div className='forecast-hourly-col'>
                        <p className='forecast-hourly-data'>{item.week_day.slice(0,3)}</p>
                        <img alt='' src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} className='forecast-hourly-image' />
                        <p className='forecast-temperature' >{Math.round(item.main.temp)}°C</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForecastWeather;

