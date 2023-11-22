import React, {useState, useEffect} from 'react';

export default function useCouuntryData(setSearchFilter) {
    const [Country, setCountry] = useState([]);
    useEffect(()=>{
      fetchCountry();
    },[])
    async function fetchCountry(){
      let countryData = await fetch("https://restcountries.com/v3.1/all");
      countryData = await countryData.json();
      setCountry(countryData)
      setSearchFilter(countryData);
    }
    return Country;
}
