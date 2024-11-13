import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import LoginPage from './my-app-front-dev/FrontDev/components/pages/LoginPage/logpage.tsx';
import ReflectifyLogo from './my-app-front-dev/FrontDev/components/assets/ReflectifyLogo.png';
import './App.css';
import HomePage from './my-app-front-dev/FrontDev/components/pages/HomePage/homepage.tsx';
//import MoodTracker from './my-app-front-dev/FrontDev/components/pages/MoodTracker/moodtrack.tsx';
import PersonalJournal from './my-app-front-dev/FrontDev/components/pages/PersonalJournal/perjournal.tsx';
import MoodStress from './my-app-front-dev/FrontDev/components/pages/MoodTracker/moodtracker.tsx';
import WellnessResources from './my-app-front-dev/FrontDev/components/pages/WellnessResources/wellnessresources.tsx';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };
    return (
      <Router>
        <div className="app">
              <header className="App-header">
                  <img src={ReflectifyLogo} alt="Reflectify Logo" className="logo" />
              </header>
              <main>
          <Routes>
              <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
              <Route path = "/personal-journal" element={isLoggedIn ? <PersonalJournal /> : <Navigate to="/login" />} /> 
              <Route path = "/mood-stress-tracker" element={isLoggedIn ? <MoodStress /> : <Navigate to="/login" />} /> 
              <Route path = "/wellness-resources" element={isLoggedIn ? <WellnessResources /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          </main>
        </div>
      </Router>
  );
};

export default App;