import { useState } from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Person from "./components/Person.jsx";

function App() {
  const [person, setPerson] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();

    const nameList = person.map((item) => item.name);
    // console.log(nameList);

    // console.log(event.target);
    if (comparingObj(nameList, name)) {
      alert(`${name} is already added to phonebook`);
      return;
    } else {
      const newObj = {
        name: name,
        number: number,
      };
      setPerson(person.concat(newObj));
      // console.log(newObj);
    }
    // console.log(person);
  };

  const comparingObj = (array, newName) => {
    return array.includes(newName);
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    const name = event.target.value;
    setName(name);
  };

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
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
