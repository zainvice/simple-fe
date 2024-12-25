import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import LandingPage from './pages/landingpage';
import PatientAuthPage from './pages/patient/auth/auth';
import ProviderAuthPage from './pages/provider/auth/auth';
import Dashboard from './pages/dashboard';


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500); 
  
      return () => clearTimeout(timer);
    
  }, []);

  return (
    <>

     <Router>
            <Routes>
              
              <Route path="/" element={<LandingPage/>} />
              <Route path="/auth/patient/signup" element={<PatientAuthPage/>} />
              <Route path="/auth/provider/:type" element={<ProviderAuthPage/>} />
              <Route path="/:userType" element={<Dashboard/>} />
              <Route path="/:userType/:selectedPath" element={<Dashboard/>} />
              <Route path="/:userType/:selectedPath/:more" element={<Dashboard/>} />
         
            </Routes>
    </Router>   
    </>
  );
}

export default App;