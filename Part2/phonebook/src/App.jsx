import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Person from "./components/Person.jsx";
import persons from "./services/persons.js";

function App() {
  const [person, setPerson] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect!");
    persons.getAll().then((res) => setPerson(res.data));
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const nameList = person.map((item) => item.name);

    if (comparingObj(nameList, name)) {
      alert(`${name} is already added to phonebook`);
      return;
    } else {
      const newObj = {
        name: name,
        number: number,
      };

      persons.create(newObj).then((res) => setPerson(person.concat(res.data)));
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

  return (
    <>
      <h1>Phonebook</h1>
      <Filter handleSearch={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Person person={person} search={search} />
    </>
  );
}

export default App;
