const CountryDetails = ({ country }) => {
  return (
    <>
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
    </>
  );
};

export default CountryDetails;
