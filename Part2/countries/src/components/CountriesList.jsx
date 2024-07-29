const CountriesList = ({ country, handleShow }) => {
  return (
    <>
      {country.map((item) => (
        <div key={item.name.common}>
          {item.name.common}{" "}
          <button onClick={() => handleShow(item)}>show</button>
        </div>
      ))}
    </>
  );
};

export default CountriesList;
