const Course = ({ name, id, parts }) => {
    return (
        <div>
          <Header name={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return <h2>{name}</h2>
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

export default Course