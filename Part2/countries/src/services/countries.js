import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = async() =>{
    const req = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`);
    const res = await req.then(res => res.data)
    return res;
}

export default {getOne, getAll}