import React, {useState, useEffect} from 'react';
import FormControl from '@material-ui/core/FormControl';
import './App.css';
import { Select, Card, CardContent } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';

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
    setCountry(countryCode);
    
  }

  return (
    <div className="app">

      <div className="app__left">
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


      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases="123" total="2000"/>
        <InfoBox title="Coronavirus Cases" cases="1234" total="12"/>
        <InfoBox title="Coronavirus Cases" cases= "69" total= "69"/>
      </div>

      <Map />
      </div>
      


      <Card className="app__right">
      <CardContent> 
        <h3>Live Cases by Country</h3>
        <h3>Worldwide new cases</h3>
      </CardContent>
      </Card>
      


    </div>
  );
}

export default App;
