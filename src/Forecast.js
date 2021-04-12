import React from 'react'
import {ForecastCard} from './ForecastCard'

const Forecast = ({forecastForSevenDays}) =>{

    const forecastCards = forecastForSevenDays.map((day)=>{        
            return <ForecastCard key={day.dt} dayWeather={day}/>;    
    })    
    
    return(
        <div className="forecastSevenDays">
        {forecastCards}
        </div>
    )
}


export {Forecast}
