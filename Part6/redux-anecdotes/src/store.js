import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import anecdoteReducer, {appendAnecdote} from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer"
import anecdoteService from "./services/anecdotes";

const store = configureStore({reducer: {
    anecdote: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  },})

anecdoteService.getAll().then(notes => notes.forEach(note => {
  store.dispatch(appendAnecdote(note))
}))

export default store  