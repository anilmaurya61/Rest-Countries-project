import React from 'react';
import '../styles/Header.css';
import darkModeIcon from '../../public/dark-mode.png';
import lightModeIcon from '../../public/light-mode.png';
import '../styles/_variables.css';
import { useTheme } from '../Theme/ThemeContext'; 

const Header = () => {
  const { darkMode, toggleTheme } = useTheme(); 

  return (
    <>
      <div className={`header-container ${darkMode ? 'dark' : 'light'}`}>
        <h1>Where in the world?</h1>
        <a href="#" className="toggle" onClick={toggleTheme}>
          <div className="togglediv">
            <img className="modeIcon" src={darkMode ? lightModeIcon : darkModeIcon } alt="" />
            <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
        </a>
      </div>
    </>
  );
};

export default Header;
