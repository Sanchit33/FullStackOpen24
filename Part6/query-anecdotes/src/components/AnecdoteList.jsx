import Anecdote from "./Anecdote";

const AnecdoteList = ({ anecdotes }) => {
  return (
    <>
      {anecdotes &&
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} />
          ))}
    </>
  );
};

export default AnecdoteList;
