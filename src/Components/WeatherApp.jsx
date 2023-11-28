import React, { useState, useRef } from 'react';
import './WeatherApp.css';

import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

const WeatherApp = () => {
    const [wicon, setWicon] = useState(cloud_icon);

    const cityInputRef = useRef(null);

    const [weatherClass, setWeatherClass] = useState('');


    const search = async () => {
        try {
            const cityName = cityInputRef.current.value.trim();
            if (cityName === "") {
                // Mostrar un mensaje al usuario indicando que debe ingresar una ciudad
                return;
            }

            const api_key = '7650cc4b80502e6d0f027e407783d4cd';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${api_key}`;

            const response = await fetch(url);
            const data = await response.json();

            // Actualizar datos climáticos
            updateWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    const updateWeatherData = (data) => {
        const humidityElement = document.getElementsByClassName("humidity-percent")[0];
        const windElement = document.getElementsByClassName("wind-rate")[0];
        const temperatureElement = document.getElementsByClassName("weather-temp")[0];
        const locationElement = document.getElementsByClassName("weather-location")[0];
        const weatherCode = data.weather[0].icon;

        humidityElement.innerHTML = `${data.main.humidity} %`;
        windElement.innerHTML = `${data.wind.speed} km/h`;
        temperatureElement.innerHTML = `${data.main.temp}°C`;
        locationElement.innerHTML = data.name;

        setWeatherIcon(data.weather[0].icon);
        setWeatherClass(getWeatherClassFromCode(weatherCode));
    };

    
        const setWeatherIcon = (iconCode) => {
        switch (iconCode) {
            case "01d":
            case "01n":
                setWicon(clear_icon);
                break;
            case "02d":
            case "02n":
                setWicon(cloud_icon);
                break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
                setWicon(drizzle_icon);
                break;
            case "09d":
            case "09n":
            case "10d":
            case "10n":
                setWicon(rain_icon);
                break;
            case "13d":
            case "13n":
                setWicon(snow_icon);
                break;
            default:
                setWicon(clear_icon);
                break;
        }
    };

        const getWeatherClassFromCode = (weatherCode) => {
            switch (weatherCode) {
                case "01d":
                case "01n":
                    return 'clearSky';
                case "02d":
                case "02n":
                    return 'cloudy';
                case "09d":
                case "09n":
                case "10d":
                case "10n":
                    return 'rainy';
                case "03d":
                case "03n":
                case "04d":
                case "04n":
                    return 'drizzly' 
                case "13d":
                case "13n":
                    return 'snowy'      
        
                // Agregar más casos para otros tipos de clima si es necesario
                default:
                    return ''; // Para el resto de casos, no aplicar ningún estilo especial
            }
    };


    return (
        <div className={`container ${weatherClass}`}>
            <div className='top-bar'>
                <input type="text" ref={cityInputRef} className="cityInput" placeholder='Search'/>
                <div className="search-icon" onClick={search}>
                    <img src={search_icon} alt="Search"/>
                </div>
                <div className="weather-image">
                    <img src={wicon} alt="Weather Icon" />
                </div>
                <div className="weather-temp">24°C</div>
                <div className="weather-location">London</div>
                <div className="data-container">
                    <div className='element'>
                        <img src={humidity_icon} alt="Humidity Icon" className='icon'/>
                        <div className='data'>
                            <div className="humidity-percent">64%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>
                    <div className='element'>
                        <img src={wind_icon} alt="Wind Icon" className='icon'/>
                        <div className='data'>
                            <div className="wind-rate">18 km/h</div>
                            <div className="text">Wind Speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default WeatherApp;