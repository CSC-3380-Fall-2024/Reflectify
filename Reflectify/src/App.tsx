import React from 'react';
import ReflectifyLogo from './my-app-front-dev/FrontDev/components/assets/ReflectifyLogo.png';
import './App.css';
import PersonalJournal from './my-app-front-dev/FrontDev/components/pages/PersonalJournal/perjournal.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ReflectifyLogo} alt="logo" />
        <h1> My Personal Journal </h1>
        </header>
        <main>
        <PersonalJournal />
      </main>
    </div>
  );
}

export default App;
