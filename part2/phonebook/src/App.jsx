import { useState } from 'react'

const PersonForm = ({ onSubmit, onNameChange, nameValue, onNumberChange, numberValue }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>name: <input value={nameValue} onChange={onNameChange} /></div>
      <div>number: <input value={numberValue} onChange={onNumberChange} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ text, onChange }) => {
  return (
    <div>{text} <input onChange={onChange} /></div>
  )
}

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => <Person key={person.id} name={person.name} number={person.number} />)}
    </ul>
  )
}

const Person = ({ name, number }) => {
  return (
    <li>{name} {number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState(persons);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const found = persons.find((person) => person.name === newName);
    if (found) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

const filterPersonsToShow = (event) => {
    event.preventDefault()
    const filter = event.target.value.toLowerCase()
    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
    setPersonsToShow(filteredPersons)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"filter shown with"} onChange={filterPersonsToShow} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App