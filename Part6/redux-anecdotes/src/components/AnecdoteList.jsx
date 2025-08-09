import { useSelector, useDispatch } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";

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

  const voting = (id) => {
    dispatch(votes(id));
  };
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voting(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteForm;
