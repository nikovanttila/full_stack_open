import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
          <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.total}</p>
        <p>average {(props.good - props.bad) / props.total}</p>
        <p>positive {props.good / props.total}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    // console.log("Good before click: ", good)
    const updatedGood = good + 1
    setGood(updatedGood)
    setTotal(updatedGood + neutral + bad)
    // console.log("Good after click: ", good)
  }

  const handleNeutralClick = () => {
    // console.log("Neutral before click: ", neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setTotal(good + updatedNeutral + bad)
    // console.log("Neutral after click: ", neutral)
  }

  const handleBadClick = () => {
    // console.log("Bad before click: ", bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    setTotal(good + neutral + updatedBad)
    // console.log("Bad after click: ", bad)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
  )
}

export default App