export const currentWeatherDate = (unixDate, timeZone) => {
    const today = new Date()
    const tomorrowMidnight = today.setHours(24,0,0,0) / 1000;
    const gmt = today.getTimezoneOffset() * 60

    const milisseconds = (unixDate + timeZone + gmt) * 1000;

    const dateObject = new Date(milisseconds)

    const weekDay = dateObject.toLocaleString("en-US", {weekday: "long"});
    const month = dateObject.toLocaleString("en-US", {month: "long"});
    const day = dateObject.toLocaleString("en-US", {day: "numeric"});
    const year = dateObject.toLocaleString("en-US", {year: "numeric"});
    const hour = dateObject.getHours()
    const minute = dateObject.toLocaleString("en-US", {minute: "numeric"});

    const formattedHours = hour < 10 ? "0" + hour : hour;
    const formattedMinutes = minute < 10 ? "0" + minute : minute;

    return [weekDay, month, day, year, formattedHours, formattedMinutes, tomorrowMidnight, today]
}

export const forecastWeatherDate = (tomorrow) => {
    const tomorrowMidnight = new Date(tomorrow)
    tomorrowMidnight.setHours(24,0,0,0);
    
    const dayNoon = new Date(tomorrow)
    dayNoon.setHours(12,0,0,0);
    const gmt = dayNoon.getTimezoneOffset() * 60
    let noonDays;

    if (tomorrow < Math.floor(dayNoon.getTime() / 1000)) {
        noonDays = parseInt(((dayNoon.getTime() - (dayNoon.getTimezoneOffset() * 60000)) / 1000).toFixed(0))
    } else {
        noonDays = parseInt(((dayNoon.getTime() - (dayNoon.getTimezoneOffset() * 60000)) / 1000).toFixed(0)) + 86400
    }
    
    

    return [tomorrowMidnight, noonDays, gmt]
}