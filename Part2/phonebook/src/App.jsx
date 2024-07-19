import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm.jsx";
import Filter from "./components/Filter.jsx";
import Person from "./components/Person.jsx";
import axios from "axios";

function App() {
  const [person, setPerson] = useState([]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect!");
    axios.get("http://localhost:3001/persons").then((res) => {
      console.log("Promise fulfilled!");
      setPerson(res.data);
    });
  }, []);

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

      axios
        .post("http://localhost:3001/persons", newObj)
        .then((res) => console.log(res));
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
