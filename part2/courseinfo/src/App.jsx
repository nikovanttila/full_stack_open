const Course = ({ course }) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return <h1>{name}</h1>
}
  
const Total = ({ parts }) => {
    const total = parts.reduce((previous, current) => {
      return previous + current.exercises
    }, 0)
    return <b>total of {total} exercises</b>
}
  
const Part = ({ name, exercises }) => {
    return (
      <p>{name} {exercises}</p>
    )
}
  
const Content = ({ parts }) => {
    return (
      parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
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