import React, { useState } from 'react';
import '../styles/Header.css'
import darkMode from '../../public/dark-mode.png'
import lightMode from '../../public/light-mode.png'
import '../styles/_variables.css'

const Header = () => {
    const [Mode, setMode] = useState(true);
    return (
        <>
            <div className="header-container">
                <h1>Where in the world?</h1>
                <a href="#" className="toggle" onClick={()=> setMode(!Mode)}>
                    <div className='togglediv'>
                        <img className="modeIcon" src={Mode? darkMode : lightMode} alt="" />
                        <span>{Mode ? "Dark Mode": "Light Mode"}</span>
                    </div>
                </a>
            </div>
        </>
    )
}

export default Header
