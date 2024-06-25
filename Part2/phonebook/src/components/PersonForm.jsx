import Person from "./Person.jsx";

function PersonForm({ addName, handleNameChange, handleNumberChange }) {
  return (
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
  );
}

export default PersonForm;
