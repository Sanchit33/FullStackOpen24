import { useEffect, useState } from "react";
import countries from "./services/countries";
import CountryDetails from "./components/CountryDetails";
import CountriesList from "./components/CountriesList";

function App() {
  const [value, setValue] = useState("");
  const [country, setCountry] = useState([]);
  const [show, setShow] = useState(null);

  useEffect(() => {
    countries.getAll().then((res) => setCountry(res));
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setShow(null);
  };

  const handleShow = (item) => {
    setShow(item);
  };

  const filter = value
    ? country.filter((item) =>
        item.name.common.toLowerCase().startsWith(value.toLowerCase())
      )
    : [];

  return (
    <>
      find countries
      <input type="text" value={value} onChange={handleChange} />
      {filter.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : filter.length === 1 ? (
        <CountryDetails country={filter[0]} />
      ) : (
        <CountriesList country={filter} handleShow={handleShow} />
      )}
      {show ? <CountryDetails country={show} /> : null}
    </>
  );
}

export default App;
