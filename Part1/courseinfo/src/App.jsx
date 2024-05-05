// Header Component
const Header = (props) => {
  return <h1>{props.course}</h1>;
};

// Part Component
const Part = (props) => {
  const part = props.parts;
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Content Component
const Content = (props) => {
  return (
    <>
      {props.parts.map((item) => (
        <Part parts={item} />
      ))}
    </>
  );
};

//Total Component
const Total = (props) => {
  const list = props.parts;
  let total = 0;
  list.forEach((item) => {
    total += item.exercises;
  });
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default App;
