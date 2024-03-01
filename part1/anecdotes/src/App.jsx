import { useState } from 'react'

const Anecdote = (props) => {
  return (
    <div>
      {props.anecdote}
    </div>
  )
}

const Votes = (props) => {
  return (
    <div>
      has {props.votes} votes
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))
  const [votes, setVotes] = useState(0)
  const [topAnecdote, setTopAnecdote] = useState(0)

  const handleAnecdoteClick = () => {
    const updatedSelected = Math.floor(Math.random() * 8)
    setSelected(updatedSelected)
    setVotes(points[updatedSelected])
  }

  const voteAnecdoteClick = (anecdote) => {
    const updatedPoints = points
    updatedPoints[anecdote] += 1
    setPoints(updatedPoints)
    setVotes(updatedPoints[anecdote])
    anecdoteWithMostVotes()
  }

  const anecdoteWithMostVotes = () => {
    let max = 0
    let index = 0
    for (let i = 0; i < points.length; i++) { 
      if (points[i] > max) { 
          max = points[i]
          index = i
      }
    setTopAnecdote(index)
   }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
        <Anecdote anecdote={anecdotes[selected]} />
        <Votes votes={votes} />
        <Button handleClick={() => voteAnecdoteClick(selected)} text="vote" />
        <Button handleClick={handleAnecdoteClick} text="next anecdote" />

        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[topAnecdote]} />
        <Votes votes={points[topAnecdote]} />
    </div>
  )
}

export default App