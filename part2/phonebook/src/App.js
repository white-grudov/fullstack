import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './PersonService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000) // Clear the notification after 5 seconds
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const personExists = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
  
    if (personExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Replace the old number with a new one?`
      )
  
      if (confirmUpdate) {
        const updatedPerson = { ...personExists, number: newNumber }
  
        personService
          .update(personExists.id, updatedPerson)
          .then((updatedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            )
            setNewName('')
            setNewNumber('')
            showNotification(`${updatedPerson.name}'s number updated successfully.`, 'success')
          })
          .catch((error) => {
            showNotification(`Error updating ${personExists.name}'s number: ${error.message}`, 'error')
            console.log(error.response.data.error)
          })
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
  
      personService
        .create(newPerson)
        .then((createdPerson) => {
          setPersons([...persons, createdPerson])
          setNewName('')
          setNewNumber('')
          showNotification(`${createdPerson.name} added successfully.`, 'success')
        })
        .catch((error) => {
          showNotification(`Error adding ${newPerson.name}: ${error.message}`, 'error')
          console.log(error.response.data.error)
        })
    }
  }
  
  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
  
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          showNotification(`${personToDelete.name} deleted successfully.`, 'success')
        })
        .catch((error) => {
          showNotification(`Error deleting ${personToDelete.name}: ${error.message}`, 'error')
          console.log(error.response.data.error)
        })
    }
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      {notification && <div className="notification">{notification}</div>}

      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
