import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    voteAnecdote(state, action){
      const anecdoteToBeVoted = state.find(anecdote => anecdote.id === action.payload)
      if(anecdoteToBeVoted){
        const updatedAnecdote = {...anecdoteToBeVoted, votes: anecdoteToBeVoted.votes + 1}
      // console.log(updatedAnecdote)
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id? anecdote: updatedAnecdote)}
      return state
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
}
)

export const {createAnecdote, voteAnecdote, appendAnecdote, setAnecdote} = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
