import React, { useState, useEffect } from 'react'
import { FiThermometer, FiWind, FiDroplet, FiArrowUp, FiArrowDown} from 'react-icons/fi'
import { BiMapPin } from 'react-icons/bi'
import { ImMeter } from 'react-icons/im'

import { Error, Footer, Header, Loading } from './components'
import { useSearchService } from './fetch-hook'

const App = () => {
  const [query, setQuery] = useState("Lagos")
  const [weather,setWeather] = useState("")

  const { loading, error, getWeatherData }  = useSearchService()

  const fetchData = async () => {
    try {
      const data = await getWeatherData(query)
      setWeather(data) 
    } catch (error) {}
  }

  const submitHandler = (e) => {
    e.preventDefault()
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
      <form onSubmit={submitHandler}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      </form>
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
