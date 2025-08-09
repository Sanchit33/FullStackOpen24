const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0);

export const votes = (id) => {
    return {
      type: "VOTE",
      payload: id,
    };
};

export const createAnecdote = (content) => {
    return {
      type: "ADD_ANECDOTE",
      payload: {
        content,
        votes: 0,
        id: getId(),
      },
    };
};

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
    filter: undefined
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type){
    case "VOTE":{
      const anecdoteToBeVoted = state.find(anecdote => anecdote.id === action.payload)
      if(anecdoteToBeVoted){
        const updatedAnecdote = {...anecdoteToBeVoted, votes: anecdoteToBeVoted.votes + 1}
      // console.log(updatedAnecdote)
      return state.map(anecdote => anecdote.id !== updatedAnecdote.id? anecdote: updatedAnecdote)}
      }
      return state
    case "ADD_ANECDOTE":
      const anecdoteToAdd = action.payload
      // console.log(action.payload)
      if(anecdoteToAdd){
        return state.concat(anecdoteToAdd)
      }
      return state
    default:
      return state    
  }
}

export default anecdoteReducer