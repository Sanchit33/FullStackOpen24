import { useEffect, useState } from "react";
import countries from "../services/countries";
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countries.getWeather(country.capital).then((res) => setWeather(res));
  }, []);
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
        <h1>Weather in {country.capital}</h1>
        {weather ? (
          <div>
            <div>temperature {(weather.main.temp - 273.15).toFixed(2)} °C</div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather image"
            />
            <div>{weather.wind.speed.toFixed(2)} m/s</div>
          </div>
        ) : (
          <div>Loading weather data...</div>
        )}
      </div>
    </>
  );
};

export default CountryDetails;
