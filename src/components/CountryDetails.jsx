import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/CountryDetails.css';
import '../styles/_variables.css';
import { useTheme } from '../Theme/ThemeContext';


const CountryDetails = () => {
    const { id } = useParams();
    const [country, setCountry] = useState();
    const { darkMode } = useTheme();

    useEffect(() => {
        getCountryDetails(id);
    }, [id]);

    async function getCountryDetails(id) {
        try {
            let countryData = await fetch(`https://restcountries.com/v3.1/all`);
            countryData = await countryData.json();
            countryData = countryData.find((country) => country.cca3 === id);
            setCountry(countryData);
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    }

    if (!country) {
        return <div>Loading...</div>;
    }

    const {
        name: { common, nativeName },
        flags: { png },
        population,
        region,
        subregion,
        capital,
        tld,
        currencies,
        languages,
        borders,
    } = country;

    return (
        <>
            <div className={`container ${darkMode ? 'dark' : 'light'}`}>
                <Link to="/" className="backtohome">
                    <button>Back To Home</button>
                </Link>
                <section className="country-details">
                    <div className="country-flag">
                        <img src={png || "#"} alt={`${common || "N/A"} Flag`} />
                    </div>
                    <div className="country-info">
                        <div className="country-title-container">
                            <h1 className="country-title">{common || "N/A"}</h1>
                        </div>
                        <div className="details-container">
                            <div className="details-col">
                                <ul>
                                    <li>
                                        <strong>native name: </strong> {Object.values(nativeName)[0].common || "N/A"}
                                    </li>
                                    <li>
                                        <strong>population: </strong> {population || "N/A"}
                                    </li>
                                    <li>
                                        <strong>region: </strong> {region || "N/A"}
                                    </li>
                                    <li>
                                        <strong>sub region: </strong> {subregion || "N/A"}
                                    </li>
                                    <li>
                                        <strong>capital: </strong> {capital || "N/A"}
                                    </li>
                                </ul>
                            </div>
                            <div className="details-col">
                                <ul>
                                    <li>
                                        <strong>top-level domain: </strong> {tld.join(", ") || "N/A"}
                                    </li>
                                    <li>
                                        <strong>currencies: </strong> {Object.values(currencies)[0].name || "N/A"}
                                    </li>
                                    <li>
                                        <strong>languages: </strong> {Object.values(languages).join(", ") || "N/A"}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-countries">
                            <strong>border countries:</strong>
                            <ul>
                                {borders?.map((border) => (
                                    <Link to={`/country/${border}`} key={border} data-border={border}>
                                        <button className="btn" data-country-name={common}>
                                            {border}
                                        </button>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <style>{`body { background-color: ${darkMode ? '#2b3945' : '#ffffff'}; }`}</style>
        </>
    );
};

export default CountryDetails;
