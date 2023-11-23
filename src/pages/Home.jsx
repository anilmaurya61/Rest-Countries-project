import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/_variables.css';
import '../styles/Home.css';
import useCountryData from '../services/api';
import Select from 'react-select';
import CountryCard from '../components/CountryCard';
import { useTheme } from '../Theme/ThemeContext';


export default function Home() {
    const options = [
        { value: 'Africa', label: 'Africa' },
        { value: 'America', label: 'America' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' },
        { value: 'Show All', label: 'Show All' },
    ];

    const [searchFilter, setSearchFilter] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [option, setOption] = useState('Show All');
    const { darkMode } = useTheme();

    let countryData = useCountryData(setSearchFilter);

    function searchFunction(text, option) {
        if (!text || option == 'Show All') {
            setSearchFilter(...countryData);
        }
        let lowercaseSearchText = text.toLowerCase();
        setSearchFilter(
            countryData.filter((country) => {
                const nameIncludesText = text ? country?.name?.common.toLowerCase().includes(lowercaseSearchText) : true;
                const regionMatches = option && option !== 'Show All' ? country?.region.includes(option) : true;
                return text ? nameIncludesText && regionMatches : regionMatches;
            })
        );
    }

    if (countryData.length === 0) {
        return <h1>Loading...</h1>;
    }

    const selectStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: darkMode ? '#fff' : 'white',
            color: darkMode ? 'white' : 'black',
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? (darkMode ? '#164240' : '#d8e1e9') : isFocused ? (darkMode ? '#2b3945' : '#e1f1f8') : null,
            color:isSelected ? 'white' : darkMode ? 'black' : 'black',
        }),
    };
    
    
    return (
        <>
            <div className={`filter-container ${darkMode ? 'dark' : 'light'}`}>                
            <input type="text"
                className="search"
                placeholder="Search for a country"
                value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                    searchFunction(e.target.value, option);
                }}
            />
                <Select 
                    className="select"
                    options={options}
                    styles={selectStyles}
                    onChange={(selectedOption) => {
                        setOption(selectedOption);
                        searchFunction(searchText, selectedOption.value);
                    }}
                />
            </div>
            <div className={`country-card-container ${darkMode ? 'dark' : 'light'}`}>
                {searchFilter?.map((country) => (
                    <Link to={{ pathname: `/country/${country.cca3}` }} key={country.cca3} style={{ textDecoration: 'none' }}>
                        <CountryCard countryData={country} />
                    </Link>
                ))}
            </div>
            <style>{`body { background-color: ${darkMode ? '#2b3945' : '#ffffff'}; Color : black}`}</style>
        </>
    );
}
