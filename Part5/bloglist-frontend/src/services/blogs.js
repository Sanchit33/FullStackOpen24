import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = axios.get(baseUrl)
  const res = await request
  // console.log("Response Data:", res.data)
  return res.data
}

export default { getAll }