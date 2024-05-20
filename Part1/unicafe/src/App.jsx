import { useState } from "react";

const Button = (props) => {
  // console.log(props);
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  // console.log(props);
  return (
    <>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.all}</p>
      <p>average {(props.good - props.bad) / props.all}</p>
      <p>positive {(props.good / props.all) * 100}</p>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;

  const isFeedback = good !== 0 || bad !== 0 || neutral !== 0;

  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      {isFeedback ? (
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
