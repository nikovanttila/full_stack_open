import { useState, useEffect } from 'react'
import axios from 'axios'
import { PersonForm, Filter, Persons, Person } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const found = persons.find((person) => person.name === newName);
    if (found) {
      alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(personObject))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersonsToShow = (event) => {
    event.preventDefault()
    setPersonsToShow(event.target.value.toLowerCase())
  }

  const personsToShowNew = (personsToShow === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(personsToShow))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={"filter shown with"} onChange={filterPersonsToShow} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShowNew} />
    </div>
  )
}

export default App