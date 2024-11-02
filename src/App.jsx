import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landingpage';


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500); // Show loader for 3 seconds
  
      return () => clearTimeout(timer); // Clean up the timer
    
  }, []);

  return (
    <>

     <Router>
            <Routes>
              
              <Route path="/" element={<LandingPage/>} />
         
            </Routes>
    </Router>   
    </>
  );
}

export default App;