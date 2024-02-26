import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    // console.log("Good before click: ", good)
    const updatedGood = good + 1
    setGood(updatedGood)
    // console.log("Good after click: ", good)
  }

  const handleNeutralClick = () => {
    // console.log("Neutral before click: ", neutral)
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    // console.log("Neutral after click: ", neutral)
  }

  const handleBadClick = () => {
    // console.log("Bad before click: ", bad)
    const updatedBad = bad + 1
    setBad(updatedBad)
    // console.log("Bad after click: ", bad)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
    </div>
  )
}

export default App