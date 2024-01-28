import {useEffect, useState} from "react";
import './App.css';

function App() {
const [countries,setCountries]=useState([])
const [filteredCountries, setFilteredCountries] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(()=>{
  fetch("https://restcountries.com/v3.1/all")
  .then((res)=>res.json())
  .then((data)=>{setCountries(data)
    setFilteredCountries(data)})
  .catch((err)=>console.error("error fetching data:",err))
},[]);

const handleSearch = (e) => {
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);

  // Filter countries based on the search term
  const filtered = countries.filter(country =>
    country.name.common.toLowerCase().includes(term)
  );

  setFilteredCountries(filtered);
};

return (
  <div> <input
  className="txtt"
  type="text"
  placeholder="Search for a country"
  value={searchTerm}
  onChange={handleSearch}
/>
{searchTerm==="" ?
   (<div className="containerStyle">
    {countries.map((country)=>(
      <div key={country.cca3} className="cardStyle">
        <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        className="imageStyle"
        />
        <h2>{country.name.common}</h2>
        </div>
    ))}
   </div>):(
    filteredCountries.length === 0 ?(
      ""):(
        <ul>
          <div className="cardStyles">
        {filteredCountries.map(country => (
          
         <div key={country.cca3} className="cardStyle">
         <img
         src={country.flags.png}
         alt={`Flag of ${country.name.common}`}
         className="imageStyle"
         />
         <h2>{country.name.common}</h2>
         </div>
        
        ))}
         </div>
      </ul>
      )
   )}
   </div>
  );
}

export default App;