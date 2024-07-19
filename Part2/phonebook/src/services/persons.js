import axios from "axios"

const baseUrl = "http://localhost:3001/persons"

const getAll = async () => {
  const req = axios.get(baseUrl)
  const res = await req
  return res;
}

const create = async (newData) => {
    const req = axios.post(baseUrl,newData)
    const res = await req 
    return res;
}
export default {getAll, create}