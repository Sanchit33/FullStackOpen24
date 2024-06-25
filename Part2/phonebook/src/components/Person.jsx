function Person({ person, search }) {
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
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Person;
