import { useEffect, useState } from "react";
import countries from "./services/countries";

function App() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState([]);
  const [con, setCon] = useState([]);

  useEffect(() => {
    countries.getAll().then((res) => setCountry(res));
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    const filter = country.filter((item) =>
      item.name.common
        .toLowerCase()
        .startsWith(event.target.value.toLowerCase())
    );
    setCon(filter);
  };

  return (
    <>
      find countries
      <input type="text" value={value} onChange={handleChange} />
      {con.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : con.length === 1 ? (
        con.map((item) => (
          <div key={item.name.common}>
            <h1>{item.name.common}</h1>
            <div>capital {item.capital}</div>
            <div>area {item.area}</div>
            <h2>languages</h2>
            <ul>
              {Object.values(item.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={item.flags.png} alt={`${item.name.common} flag`} />
          </div>
        ))
      ) : (
        con.map((item) => <div key={item.name.common}>{item.name.common}</div>)
      )}
    </>
  );
}

export default App;
