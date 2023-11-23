import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CountryCardDetails from './components/CountryDetails';
import Header from './components/Header';
import { ThemeProvider } from './Theme/ThemeContext'; 

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:id" element={<CountryCardDetails />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
