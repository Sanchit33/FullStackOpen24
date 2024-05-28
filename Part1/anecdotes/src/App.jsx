import { useState } from "react";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {vote} votes</div>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState({});

  const getRandomIndex = () => Math.floor(Math.random() * anecdotes.length);

  const updateValue = (index) => {
    const copy = { ...votes };
    copy[index] = (copy[index] || 0) + 1;
    setVote(copy);
    console.log(votes);
  };
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected] || 0} />
      <Button
        handleClick={() => setSelected(getRandomIndex())}
        text="next anecdote"
      />
      <Button handleClick={() => updateValue(selected)} text="vote" />
    </div>
  );
};

export default App;
