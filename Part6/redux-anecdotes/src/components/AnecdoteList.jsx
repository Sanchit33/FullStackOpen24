import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const searchFilter = (a, b) => {
    return a.content.toLowerCase().includes(b.toLowerCase());
  };

  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdote.filter((a) => searchFilter(a, state.filter));
    }
    return state.anecdote;
  });

  const voting = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id));
    dispatch(createNotification(`you voted: ${anecdote.content}`));
  };
  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voting(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteForm;
