import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
}
)

export const {updateAnecdote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    const anecdotes = await anecdoteService.getAll()
    const newAnecdote = anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id? anecdote: updatedAnecdote)

    dispatch(setAnecdotes(newAnecdote))
  }
}

export default anecdoteSlice.reducer
