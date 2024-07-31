import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = import.meta.env.VITE_API_KEY

const getAll = async() =>{
    const req = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
    const res = await req.then(res => res.data)
    return res;
}

const getWeather = async(cityName) =>{
    const req = await axios.get(`${weatherUrl}weather?q=${cityName}&appid=${apiKey}`)
    return req.data;
}

export default {getAll, getWeather}