import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Person from "./components/Person.jsx";
import persons from "./services/persons.js";
import Notification from "./components/Notification.jsx";

function App() {
  const [person, setPerson] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    message: null,
    color: null,
  });

  useEffect(() => {
    console.log("effect!");
    persons.getAll().then((res) => setPerson(res.data));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const nameList = person.map((item) => item.name);
    const numberList = person.map((item) => item.number);

    if (comparingObj(nameList, name)) {
      if (comparingObj(numberList, number)) {
        alert(`${name} is already added to phonebook`);
        return;
      } else {
        if (
          window.confirm(
            `${name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          const n = person.find((item) => item.name === name);
          const newObj = { ...n, number: number };
          persons
            .update(n.id, newObj)
            .then((res) => {
              setErrorMessage({
                message: `${name} changed number to ${number}`,
                color: "green",
              });
              setPerson(
                person.map((item) => (item.id !== n.id ? item : res.data))
              );
            })
            .catch((error) => {
              setErrorMessage({
                message: `Information of ${name} has already been removed from server`,
                color: "red",
              });
              setPerson(person.filter((item) => item.id !== n.id));
            });
          setTimeout(() => {
            setErrorMessage({ message: null, color: null });
          }, 5000);
        } else {
          return;
        }
      }
    } else {
      const newObj = {
        name: name,
        number: number,
      };

      persons.create(newObj).then((res) => setPerson(person.concat(res.data)));
      setErrorMessage({ message: `Added ${newObj.name}`, color: "green" });
      setTimeout(() => {
        setErrorMessage({ message: null, color: null });
      }, 5000);
    }
  };

  const comparingObj = (array, newName) => {
    return array.includes(newName);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setName(name);
  };

  const handleNumberChange = (event) => {
    const number = event.target.value;
    setNumber(number);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const deletePerson = (id) => {
    if (window.confirm("Are You Sure!")) {
      persons.deletePerson(id);
      setPerson(person.filter((p) => p.id !== id));
    } else {
      return;
    }
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={errorMessage.message} color={errorMessage.color} />
      <Filter handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Person person={person} search={search} deletePerson={deletePerson} />
    </>
  );
}

export default App;
