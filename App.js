import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { shoeSalesData } from './data/shoeData';
import FreshKicks from './components/FreshKicks';
import SummaryCards from './components/SummaryCards';
import SalesChart from './components/SalesChart';
import AgeGroupChart from './components/AgeGroupChart';
import ShoeTypesTable from './components/ShoeTypesTable';
import FeedbackSection from './components/FeedbackSection';
import LocalVendors from './components/LocalVendors';
import Tilt from 'react-parallax-tilt';
import './styles.css';

function Dashboard({ darkMode, toggleDarkMode, salesData }) {
  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <Link to="/" className="home-link">← Back to FreshKicks</Link>
        <h1>Shoe Sales Dashboard</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          <div className={`toggle-circle ${darkMode ? 'dark' : 'light'}`} />
          {darkMode ? (
            <span className="toggle-icon">☀️</span>
          ) : (
            <span className="toggle-icon">🌙</span>
          )}
        </button>
      </div>
      
      <Tilt tiltReverse={true} glareEnable={true} glareMaxOpacity={0.1}>
        <SummaryCards totalSales={salesData.totalSales} />
      </Tilt>
      
      <div className="chart-row">
        <Tilt tiltReverse={true} glareEnable={true} glareMaxOpacity={0.1}>
          <div className="chart-container">
            <SalesChart monthlySales={salesData.monthlySales} darkMode={darkMode} />
          </div>
        </Tilt>
        <Tilt tiltReverse={true} glareEnable={true} glareMaxOpacity={0.1}>
          <div className="chart-container">
            <AgeGroupChart ageGroupData={salesData.ageGroupData} darkMode={darkMode} />
          </div>
        </Tilt>
      </div>
      
      <Tilt tiltReverse={true} glareEnable={true} glareMaxOpacity={0.1}>
        <div className="table-container">
          <ShoeTypesTable topSelling={salesData.topSelling} />
        </div>
      </Tilt>

      <LocalVendors 
        vendors={salesData.localVendors} 
        darkMode={darkMode} 
      />

      <FeedbackSection 
        feedback={salesData.customerFeedback} 
        darkMode={darkMode} 
      />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [salesData, setSalesData] = useState(shoeSalesData);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSalesData(prev => ({
        ...prev,
        totalSales: prev.totalSales + Math.floor(Math.random() * 10),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FreshKicks darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              darkMode={darkMode} 
              toggleDarkMode={toggleDarkMode} 
              salesData={salesData} 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;