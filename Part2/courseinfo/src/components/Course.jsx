const Header = ({ name }) => <h1>{name}</h1>;

const Total = ({ parts }) => {
  const sum = parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <>
      <h3>total of {sum} exercises</h3>
    </>
  );
};

const Part = ({ name, exercise }) => (
  <p>
    {name} {exercise}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercise={part.exercises} />
      ))}
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
