import { useState, useEffect } from 'react'
import personService from './services/persons'
import { PersonForm, Filter, Persons, ErrorNotification, SuccessNotification } from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }
    const personExists = persons.find((person) => person.name === newName && person.number === newNumber);
    const personModifiable = persons.find((person) => person.name === newName && person.number != newNumber);
    if (personExists) {
      alert(`${newName} is already added to phonebook.`)
    }
    else if (personModifiable) {
      alert(`${newName} is already added to phonebook, replace the old number with the new one?`)
      const personObject = {
        name: newName,
        number: newNumber,
        id: personModifiable.id
      }
      personService
        .update(personObject)
        .then(returnedPerson => {
          setSuccessMessage(
            `Phone number of ${newName} is modified.`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== personObject.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(
            `The person ${newName} was already deleted from server.`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== personObject.id))
        })
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setSuccessMessage(
            `Added ${newName}.`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
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
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <Filter text={"filter shown with"} onChange={filterPersonsToShow} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} nameValue={newName} onNumberChange={handleNumberChange} numberValue={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={personsToShowNew} deletePerson={deletePerson} />
    </div>
  )
}

export default App