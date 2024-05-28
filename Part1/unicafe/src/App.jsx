import { useState } from "react";

const Button = ({ handleClick, text }) => {
  // console.log(props);
  return <button onClick={handleClick}>{text}</button>;
};

const Statistic = ({
  good,
  neutral,
  bad,
  all,
  average,
  positive,
  isFeedback,
}) => {
  if (!isFeedback) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              {text} {value}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let all = good + neutral + bad;
  let average = (good - bad) / all;
  let positive = (good / all) * 100;
  const isFeedback = all > 0;

  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
        isFeedback={isFeedback}
      />
    </>
  );
}

export default App;
