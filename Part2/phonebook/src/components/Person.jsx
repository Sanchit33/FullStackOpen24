function Person({ person, search, deletePerson }) {
  const filteredPersons = search
    ? person.filter((p) =>
        p.name.toLowerCase().startsWith(search.toLowerCase())
      )
    : person;

  return (
    <>
      <ul>
        {filteredPersons.map((person) => (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Person;
