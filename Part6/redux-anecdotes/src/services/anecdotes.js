import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createAnecdote = async (anecdote) => {
    const obj = {content:anecdote, votes:0}
    const res = await axios.post(baseUrl, obj)
    return res.data
}

const addVote = async(id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    const updatedAnecdote = {...anecdote.data, votes: anecdote.data.votes + 1}

    const res = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)

    return res.data
}

export default {getAll, createAnecdote, addVote}