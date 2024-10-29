import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import ReflectifyLogo from './my-app-front-dev/FrontDev/components/assets/ReflectifyLogo.png';
import './App.css';
import HomePage from './my-app-front-dev/FrontDev/components/pages/HomePage/homepage.tsx';
import PersonalJournal from './my-app-front-dev/FrontDev/components/pages/PersonalJournal/perjournal.tsx';

function App() {
  return (
      <div className="App">
          <img src={ReflectifyLogo} alt="logo" />
          <HomePage />
      </div>
  );
}

export default App;