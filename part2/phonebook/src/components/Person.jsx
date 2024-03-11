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

export { PersonForm, Filter, Persons, Person }