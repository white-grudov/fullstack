const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    console.log(props);
    return <h1>{props.course.name}</h1>;
  };

  const Part = (props) => {
    console.log(props);
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    );
  };

  const Content = (props) => {
    console.log(props);
    return (
      <div>
        {props.course.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    );
  };

  const Total = (props) => {
    console.log(props);
    const totalExercises = props.course.parts.reduce(
      (total, part) => total + part.exercises,
      0
    );
    return <p>Number of exercises {totalExercises}</p>;
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
