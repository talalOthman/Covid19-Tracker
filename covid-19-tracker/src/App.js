import React, {useState, useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import './App.css';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");

  useEffect(() => {

    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }));

          setCountries(countries);
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    
  }

  return (
    <div className="app">
      <div className= "app__header">
      <h1>Covid 19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          onChange={onCountryChange}
          value={country}
        >
          <MenuItem value="WorldWide">Worldwide</MenuItem>
          {
            countries.map(country =>(
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }

        </Select>
      </FormControl>
      </div>
      


    </div>
  );
}

export default App;
