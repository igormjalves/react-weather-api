import { currentWeatherDate } from '../../date'

const LocalTime = (props) => {
    
    const unixDate = props.data.dt;
    const timeZone = props.data.timezone;
    
    const dateInfo = currentWeatherDate(unixDate, timeZone)
    
    const weekDay = dateInfo[0]
    const day = dateInfo[1]
    const month = dateInfo[2]
    const year = dateInfo[3]
    const formattedHours = dateInfo[4]
    const formattedMinutes = dateInfo[5]

    return (
        <div>
            <p className="local-time">{weekDay}, {day} {month} {year} | Local time: {formattedHours}:{formattedMinutes}</p>
        </div>
    );
 }

export default LocalTime;