import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (event) => {
    event.preventDefault();
    console.log(event.target.anecdote.value);
    const content = {
      content: event.target.anecdote.value,
      id: generateId(),
      vote: 0,
    };

    dispatch(createAnecdote(content));
    dispatch(createNotification(`successfully created ${content}`));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
