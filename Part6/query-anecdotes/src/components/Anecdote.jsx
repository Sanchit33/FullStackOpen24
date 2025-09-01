import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateVote } from "../requests";
import NotificationContext from "../NotificationContext";
import { useContext } from "react";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateVote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      notificationDispatch({
        type: "show",
        payload: `you voted: ${updatedAnecdote.content}`,
      });
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
