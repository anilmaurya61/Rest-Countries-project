import React, { useEffect, useState } from 'react';
import '../styles/_variables.css'
import '../styles/CountryCard.css'
import { useTheme } from '../Theme/ThemeContext';


export default function CountryCard(props) {
  
  const {name: {common}, population, region, capital, flags:{png}} = props.countryData;
  const { darkMode } = useTheme();
  return (
    <>
        <div className={`card-container ${darkMode ? 'dark' : 'light'}`}>
          <div className='flag'><img src={png} alt="country-flag" /></div>
          <h1>{common}</h1>
          <div className="description">
            <p><b>Population:</b>{population}</p>
            <p><b>Region:</b>{region}</p>
            <p><b>Capital:</b>{capital}</p>
          </div>
        </div>
    </>
  );
}

