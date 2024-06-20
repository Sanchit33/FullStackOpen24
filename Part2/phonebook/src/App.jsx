import { useState } from "react";

function App() {
  const [person, setPerson] = useState([{ name: "Arto Hellas" }]);
  const [name, setName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    // console.log(event.target);
    const newObj = {
      name: name,
    };
    setPerson(person.concat(newObj));
    // console.log(person);
  };

  const handleNameChange = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

  return (
    <>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input type={name} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* {<div>debug: {person[0].name}</div>} */}
      <ul>
        {person.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
