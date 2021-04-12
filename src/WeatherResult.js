import React from 'react';
import { Forecast } from './Forecast.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloud,
    faBolt,
    faCloudRain,
    faCloudShowersHeavy,
    faSnowflake,
    faSun,
    faSmog,
} from '@fortawesome/free-solid-svg-icons';



export const setWeatherIcon = (main) => {
    const weatherIcon = {
        Thunderstorm: faBolt,
        Drizzle: faCloudRain,
        Rain: faCloudShowersHeavy,
        Snow: faSnowflake,
        Clear: faSun,
        Clouds: faCloud,
    }
    return weatherIcon[main] ? weatherIcon[main] : faSmog;
}

const currentWeather = (parseWeatherData) => {
    return (
        <div className="forecastCurrentDay">
            <div className="weather-general-info">
                <div className="general-icon">
                    <FontAwesomeIcon icon={parseWeatherData.icon} />
                    <h4>{parseWeatherData.description}</h4>
                </div>
                <div className="general-temp">
                    <h3>{parseWeatherData.temperature} °C</h3>
                    <h4>Feels like {parseWeatherData.feels_like} °C</h4>
                </div>                
            </div>
            <div className="weather-details-info">
                <div>
                    <h2>{parseWeatherData.sunrise}</h2>
                    <span>Sunrise</span>
                </div>
                <div>
                    <h2>{parseWeatherData.sunset}</h2>
                    <span>Sunset</span>
                </div>
                <div>
                    <h2>{parseWeatherData.pressure} hPa</h2>
                    <span>Pressure</span>
                </div>
                <div>
                    <h2>{parseWeatherData.wind} m/h</h2>
                    <span>Wind speed</span>
                </div>
                <div>
                    <h2>{parseWeatherData.humidity} %</h2>
                    <span>Humidity</span>
                </div>
                <div>
                    <h2>{parseWeatherData.visibility} m</h2>
                    <span>Visibility</span>
                </div>
            </div>
        </div>
    );
}


export const getCurrentDateString = (currentDateMS) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'Nocvember',
        'December',
    ];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date(currentDateMS * 1000);
    const stringDayDateMonth = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    const stringDateMonth = `${currentDate.getDate()} ${months[currentDate.getMonth()]}`
    return {
        stringDayDateMonth,
        stringDateMonth
    };
}

export const getSunsetOrSunriseTime = (time) => {
    return new Date(time * 1000).toLocaleTimeString().slice(0, 5);
}

const WeatherResult = ({ forecastWeather, usefulCoordinatesData, forecastForSevenDays }) => {
    const date = getCurrentDateString(forecastWeather.current.dt).stringDayDateMonth;
    const sunrise = getSunsetOrSunriseTime(forecastWeather.current.sunrise);
    const sunset = getSunsetOrSunriseTime(forecastWeather.current.sunset);
    const icon = setWeatherIcon(forecastWeather.current.weather[0].main);
    const placeName = `${usefulCoordinatesData.data[0].name} ${usefulCoordinatesData.data[0].continent} ${usefulCoordinatesData.data[0].country_code}`;
    const parseWeatherData = {
        date,
        sunrise,
        sunset,
        placeName,
        icon,
        temperature: Math.round(forecastWeather.current.temp),
        feels_like: Math.round(forecastWeather.current.feels_like),
        pressure: forecastWeather.current.pressure,
        wind: forecastWeather.current.wind_speed,
        humidity: forecastWeather.current.humidity,
        visibility: forecastWeather.current.visibility,
        description: forecastWeather.current.weather[0].description,
    }

    let res = currentWeather(parseWeatherData);

    return (


        <div className="weatherResult">
            <div className="place-date-label">
                <h1>{placeName}</h1>
                <h3>{date}</h3>
            </div>
            {res}
            <Forecast forecastForSevenDays={forecastForSevenDays} />
        </div>

    );
}

export { WeatherResult }