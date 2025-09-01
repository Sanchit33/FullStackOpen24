import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createAnecdotes } from "../requests";
import NotificationContext from "../NotificationContext";
import { useContext } from "react";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notificationDispatch({
        type: "show",
        payload: `anecdote ${newAnecdote.content} created`,
      });
    },
  });

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
