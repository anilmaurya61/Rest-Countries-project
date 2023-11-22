import CountryCard from "../components/CountryCard";
import React, { useState } from 'react';
import '../styles/_variables.css'
import '../styles/Home.css'
import useCountryData from '../services/api'
import Header from '../components/Header'
import Select from 'react-select'

export default function Home() {
    const options = [
        { value: 'Africa', label: 'Africa' },
        { value: 'America', label: 'America' },
        { value: 'Asia', label: 'Asia' },
        { value: 'Europe', label: 'Europe' },
        { value: 'Oceania', label: 'Oceania' },
        { value: 'Show All', label: 'Show All' }
    ]
    
    const [searchFilter, setSearchFilter] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [option, setOption] = useState("Show All");

    let countryData = useCountryData(setSearchFilter);
    
    function searchFunction(text, option) {
        if (!text && !option) {
            setSearchFilter(countryData);
        }
        let lowercaseSearchText = text.toLowerCase();
        setSearchFilter(
            countryData.filter((country) => {
                const regionMatches = option && option !== "Show All" ? country?.region.includes(option) : true;
                const nameIncludesText = text ? country?.name?.common.toLowerCase().includes(lowercaseSearchText) : true;
                return text ? nameIncludesText && regionMatches : regionMatches;
            })
        );
    }

    if(countryData.length == 0){
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Header />
            <div className="filter-container">
                <input type="text" className="search" placeholder="Search for a country"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        searchFunction(e.target.value, option);
                    }} />
                <Select
                    className="select"
                    options={options}
                    onChange={(selectedOption) => {
                        setOption(selectedOption);
                        searchFunction(searchText, selectedOption.value);
                    }}
                />
            </div>
            <div className="country-card-container">
                {searchFilter?.map((country, index) => (
                    <CountryCard key={country.cca2} countryData={country} />
                ))}
            </div>
        </>
    );
}
