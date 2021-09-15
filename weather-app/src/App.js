import axios from 'axios';
import React, { useState } from 'react'
import { FaWind, FaTint, FaCloud } from 'react-icons/fa'
import Footer from './components/Footer';


const App = () => {
  const [query, setQuery] = useState("");
  const [currentForecast, setCurrentForecast] = useState("");
  const [futureForecast, setFutureForecast] = useState("")

  const fetchCurrent = () => {
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/weather',
      params: {
        q: `${query}`,
        lang: 'en',
        units: 'imperial',
        mode: 'json'
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'ff1954025dmsheb07b3d2fcde4c8p10826djsne67f960e587f'
      }
    };

    axios.request(options)
      .then(response => {
        setCurrentForecast(response.data)
        console.log(response.data)
      })
      .catch(function (error) {
        setCurrentForecast(error);
      });
  }

  var currentDate = new Date((`${currentForecast.dt}`) * 1000).toDateString();

  const fetchFuture = () => {
    const options = {
      method: 'GET',
      url: 'https://community-open-weather-map.p.rapidapi.com/forecast/daily',
      params: {
        q: `${query}`,
        lat: '35',
        lon: '139',
        cnt: '10',
        units: 'metric or imperial',
        mode: 'json'
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': 'ff1954025dmsheb07b3d2fcde4c8p10826djsne67f960e587f'
      }
    };

    axios.request(options).then(function (response) {
      setFutureForecast(response.data);
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div className='container'>
      <div className="search-box" onSubmit={(e) => {
        e.preventDefault();
        fetchCurrent();
        fetchFuture();
      }}>
        <form action="">
          <input type="text" style={{ textTransform: "capitalize" }}
            onChange={(e) => {
              setQuery(e.target.value)
            }} placeholder='search by location' />
        </form>
      </div>
      {currentForecast && (
        <div className='result'>
          <h2>{currentForecast.name}, {currentForecast.sys.country} </h2>
          <p>{currentDate} | GMT
            {(currentForecast.timezone / 3600) > 0 ? `+${(currentForecast.timezone / 3600)}` : `${currentForecast.timezone / 3600}`}
          </p>
          <div className='grid'>
            <div>
              <FaWind />
              <p>{currentForecast.wind.speed} kmph</p>
            </div>
            <div>
              <FaTint />
              <p>{currentForecast.main.humidity}%</p>
            </div>
            <div>
              <FaCloud />
              <p style={{ textTransform: 'capitalize' }}>{currentForecast.weather[0].description}</p>
            </div>
          </div>
          <div className='flex'>
            <h1>{currentForecast.main.temp}</h1><sup>&deg;C</sup>
          </div>
          <p>Min Temp: {currentForecast.main.temp_min}&deg;C</p>
          <img src={`http://openweathermap.org/img/w/${currentForecast.weather[0].icon}.png`} alt="" width='30%' />
          <div className='grid'>
            <p>{currentForecast.main.feels_like}&deg;C</p>
            <p>{currentForecast.weather[0].main}</p>
            <p>{currentForecast.main.pressure} psi</p>
          </div>
        </div>
      )
      }
      {futureForecast && (
        <div style={{ color: '#87b0cd', textAlign: 'center' }}>
          <h5>Next 5 days</h5>
          <div className="flex_2">
            <div>
              <p>
                {futureForecast.list[1].weather[0].main}
              </p>
              <img src={`https://openweathermap.org/img/w/${futureForecast.list[1].weather[0].icon}.png`} alt="" width='40px' />
              <p>
                {new Date((`${futureForecast.list[1].dt}`) * 1000).getDate()}/{(new Date((`${futureForecast.list[1].dt}`) * 1000).getMonth() + 1)}
              </p>
            </div>
            <div>
              <p>
                {futureForecast.list[2].weather[0].main}
              </p>
              <img src={`https://openweathermap.org/img/w/${futureForecast.list[2].weather[0].icon}.png`} alt="" width='40px' />
              <p>
                {new Date((`${futureForecast.list[2].dt}`) * 1000).getDate()}/{(new Date((`${futureForecast.list[2].dt}`) * 1000).getMonth() + 1)}
              </p>
            </div>
            <div>
              <p>
                {futureForecast.list[3].weather[0].main}
              </p>
              <img src={`https://openweathermap.org/img/w/${futureForecast.list[3].weather[0].icon}.png`} alt="" width='40px' />
              <p>{new Date((`${futureForecast.list[3].dt}`) * 1000).getDate()}/{(new Date((`${futureForecast.list[3].dt}`) * 1000).getMonth() + 1)}
              </p>
            </div>
            <div>
              <p>
                {futureForecast.list[4].weather[0].main}
              </p>
              <img src={`https://openweathermap.org/img/w/${futureForecast.list[4].weather[0].icon}.png`} alt="" width='40px' />
              <p>
                {new Date((`${futureForecast.list[4].dt}`) * 1000).getDate()}/{(new Date((`${futureForecast.list[4].dt}`) * 1000).getMonth() + 1)}
              </p>
            </div>
            <div>
              <p>
                {futureForecast.list[5].weather[0].main}
              </p>
              <img src={`https://openweathermap.org/img/w/${futureForecast.list[5].weather[0].icon}.png`} alt="" width='40px' />
              <p>
                {new Date((`${futureForecast.list[5].dt}`) * 1000).getDate()}/{(new Date((`${futureForecast.list[5].dt}`) * 1000).getMonth() + 1)}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div >
  )
}

export default App
