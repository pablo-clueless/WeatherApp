import { useState } from 'react'

export const useSearchService = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const api_key = process.env.REACT_APP_API_KEY

    const getWeatherData = async (query) => {
        setLoading(true)
        try {
            const res = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${query}%2&lang=en&units=imperial&mode=json`, {
                method: 'GET',
                "headers": {
                    "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                    "x-rapidapi-key": api_key
                }
            })
            if(!res.ok) {
                throw new Error('Something went wrong')
            }
            const data = await res.json()
            setLoading(false)
            console.log(data)
            return data
        } catch (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return { loading, error, getWeatherData }
}