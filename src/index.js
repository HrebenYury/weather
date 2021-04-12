import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import {SearchCity} from './SearchCity'
import {SoSad} from './SoSad'
import {WeatherResult} from './WeatherResult'

class App extends React.Component{

  state = {
    error: false,
    place: '',
    latitude: '',
    longitude: '',
    dailyWeather: null,
    forecastForSevenDays: null,
    usefulCoordinatesData: '',
    isFetching: false,
  }

  onChangeHandler = (e) => {
    this.setState({place: e.target.value});
  }

  searchCityHandler = async (e) =>{
    e.preventDefault();
    this.setState({isFetching:true});
    const {place} = this.state;
    const APIkey = process.env.REACT_APP_GEOCODES_API_KEY;
    const coordinates = `http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${place}`;
    try {
      let response  = await fetch(coordinates);
      let res = await response.json();
      const latitude = res.data[0].latitude;
      const longitude = res.data[0].longitude;
      this.setState({latitude, longitude, error: false, usefulCoordinatesData: res});
      console.log(res);
      this.getWeatherHandler();
    } catch (e) {
      this.setState({error: true, latitude: null, longitude: null, dailyWeather: null, isFetching:false});
    }
    
  }  
  
  getWeatherHandler = async () => {
    const {longitude, latitude} = this.state;
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&appid=${API_KEY}&units=metric`;
    
    try {
      const response = await fetch(weather);
      const dailyWeather = await response.json();
      const forecastForSevenDays = dailyWeather.daily;
      forecastForSevenDays.splice(0,1);   //delete the current weather from dailies array
      this.setState({dailyWeather,forecastForSevenDays, error: false,isFetching:false});
    } catch (e) {
      this.setState({error: true, dailyWeather: null, isFetching:false});
    }
  }


  render(){
    const {place,error,dailyWeather,usefulCoordinatesData,forecastForSevenDays,isFetching} = this.state;
    return(
      <div>
        <SearchCity  submit={this.searchCityHandler} changeHalndler={this.onChangeHandler} value={place}/>
        {isFetching && <div className="loading"></div>}
        {dailyWeather && <WeatherResult forecastWeather={dailyWeather} usefulCoordinatesData={usefulCoordinatesData} forecastForSevenDays={forecastForSevenDays}/>}          
        {error && <SoSad/>} 
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);