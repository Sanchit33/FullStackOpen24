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

const update = async (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj);
  const res = await req
  return res;
}

const deletePerson = async (id) => {
  axios.delete(`${baseUrl}/${id}`)
}
export default {getAll, create, deletePerson, update}