import React, { useState, useEffect } from 'react'
import { FiSearch, FiThermometer, FiWind, FiDroplet, FiArrowUp, FiArrowDown} from 'react-icons/fi'
import { BiMapPin } from 'react-icons/bi'
import { ImMeter } from 'react-icons/im'

import Header from './components/Header'
import Loading from './components/Loading'
import Footer from './components/Footer'
import Error from './components/Error'

// const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [query, setQuery] = useState("Lagos")
  const [loading, setLoading] = useState(true)
  const [error,setError] = useState("")
  const [weather,setWeather] = useState("")

  const fetchData = async () => {
    try{
      const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${query}%2&lang=en&units=imperial&mode=json`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": 'ff1954025dmsheb07b3d2fcde4c8p10826djsne67f960e587f'
        }
      })
      if(!res.ok) {
        throw Error(
          "Something went wrong, please try again"
        )
      }

      const data = await res.json()

      setWeather(data)
      setLoading(false)
    } catch (err) {
      setError(err.message)
    }
  }

  const search = (e) => {
    e.preventDefault()
    setLoading(true)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  if(error) {
    return (
      <Error error={error}/>
    )
  }
  if(loading) {
    return(
      <Loading />
    )
  }

  const unix_timestamp = weather.dt
  let date = new Date(unix_timestamp * 1000)
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  let month = months[date.getMonth()]
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  let day = days[date.getDay()]
  let today = date.getDate()
  let hour = (date.getHours() < 10 ? `0${date.getHours()}` : date.getHours())
  let minute = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes())


 return(
   <>
   <Header />
   <main>
     <div className="search">
       <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
       <button onClick={search}><FiSearch /></button>
     </div>
     {weather && (
       <div className='result'>
         <p className='date'><span>{day}</span>, {month} {today}</p>
         <p className='location'><BiMapPin /> <span>{weather.name}, {weather.sys.country}</span> | GMT{(weather.timezone / 3600) > 0 ? `+${weather.timezone / 3600}` : `${weather.timezone / 3600}`}</p>
         <p className='time'>current temperature at <span>{hour}:{minute}</span></p>
         <div className='flex'>
           <div className='temp'>
              <h1>{Math.round((weather.main.temp - 32) * (5 / 9))}&deg;</h1>
              <p>{weather.weather[0].description}</p>
           </div>
           <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="" />
         </div>
         <div className='hi-lo'>
           <p className='hi'><FiArrowUp /> Max Temp {Math.round((weather.main.temp_max - 32) * (5 / 9))}&deg;</p>
           <p className='lo'><FiArrowDown /> Min Temp {Math.round((weather.main.temp_min - 32) * (5 / 9))}&deg;</p>
         </div>
         <div className='details'>
          <div><p><FiDroplet />Humidity</p> <span>{weather.main.humidity}%</span></div>
          <div><p><ImMeter />Pressure</p> <span>{weather.main.pressure} psi</span></div>
          <div><p><FiThermometer />Feels like</p> <span>{Math.round((weather.main.feels_like - 32) * (5 / 9))}&deg;</span></div>
          <div><p><FiWind />Windspeed</p> <span>{weather.wind.speed}kmh</span></div>
         </div>
        
       </div>
     )}
     <div>
     </div>
   </main>
   <Footer />
   </>
 )
}

export default App
