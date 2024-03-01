const Course = (props) => {
    return (
        <Header course={course} />
        <Content
          part1={part1}
          exercises1={exercises1}
          part2={part2}
          exercises2={exercises2}
          part3={part3}
          exercises3={exercises3}
        />
        <Total sumOfExercises={exercises1 + exercises2 + exercises3} />
    )
}

const Header = (props) => {
    return <h1>{props.course}</h1>
}
  
const Total = (props) => {
    return <p>Number of exercises {props.sumOfExercises}</p>
}
  
const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
}
  
const Content = (props) => {
    return (
      <div>
        <Part part={props.part1} exercises={props.exercises1} />
        <Part part={props.part2} exercises={props.exercises2} />
        <Part part={props.part3} exercises={props.exercises3} />
      </div>
    )
}
  
const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }
    
      return <Course course={course} />
}
  
export default App