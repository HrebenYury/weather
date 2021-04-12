import React, { useState, useEffect } from 'react'
import { getCurrentDateString, getSunsetOrSunriseTime, setWeatherIcon } from './WeatherResult'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'
import { ModalCard } from './ModalCard.js'


const DayWeatherCard = (day) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#container')
    });

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    return (
        <div className="card" id='container'>
            <h3 className="dateCard">{day.date}</h3>
            <p className="iconCard"><FontAwesomeIcon icon={day.icon} /></p>
            <p className="tempCard">{day.day_temp} °C</p>
            <button onClick={openModal} className="open-modal-button">MORE</button>
            <ModalCard day={day} closeModal={closeModal} modalIsOpen={modalIsOpen}/>
        </div>
    )
}

const ForecastCard = ({ dayWeather }) => {
    const date = getCurrentDateString(dayWeather.dt).stringDateMonth;
    const sunset = getSunsetOrSunriseTime(dayWeather.sunset);
    const sunrise = getSunsetOrSunriseTime(dayWeather.sunrise);
    const icon = setWeatherIcon(dayWeather.weather[0].main);
    const dayWeatherData = {
        date,
        sunset,
        sunrise,
        icon,
        morn_temp: Math.round(dayWeather.temp.morn),
        day_temp: Math.round(dayWeather.temp.day),
        eve_temp: Math.round(dayWeather.temp.eve),
        night_temp: Math.round(dayWeather.temp.night),
        morn_feels_like: Math.round(dayWeather.feels_like.morn),
        day_feels_like: Math.round(dayWeather.feels_like.day),
        eve_feels_like: Math.round(dayWeather.feels_like.eve),
        night_feels_like: Math.round(dayWeather.feels_like.night),
        wind_speed: dayWeather.wind_speed,
        pressure: dayWeather.pressure,
        humidity: dayWeather.humidity,
        description: dayWeather.weather[0].description,
    };

    const card = DayWeatherCard(dayWeatherData);

    return (
        <>
            {card}
        </>
    )
}

export { ForecastCard }