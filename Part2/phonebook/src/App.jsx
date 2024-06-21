import { useState } from "react";

function App() {
  const [person, setPerson] = useState([
    { name: "Arto Hellas", number: "1234556789" },
  ]);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

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

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type="text" onChange={handleNameChange} />
        </div>
        <div>
          number: <input type="number" onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {person.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
