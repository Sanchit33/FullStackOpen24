import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const req = axios.get(baseUrl)
  const res = await req
  // console.log("Response Data:", res.data)
  return res.data
}

const create = async ({title, author, url, }) => {
  const config = {
    headers: { Authorization: token },
  }
  const newBlog = { title, author, url }
  const res =  await axios.post(baseUrl, newBlog, config)
  console.log(newBlog)
  return res.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const res = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return res.data
}

export default { getAll, create, update, setToken }