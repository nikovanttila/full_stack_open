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
  
const Persons = ({ persons, deletePerson }) => {
    return (
      <ul>
        {persons.map(person => <Person key={person.id} name={person.name} number={person.number} id={person.id} deletePerson={deletePerson} />)}
      </ul>
    )
}
  
const Person = ({ name, number, id, deletePerson }) => {
    return (
      <li>
        {name} {number} <button onClick={() => deletePerson(id)}> delete</button>
      </li>
    )
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

export { PersonForm, Filter, Persons, Person, ErrorNotification, SuccessNotification }