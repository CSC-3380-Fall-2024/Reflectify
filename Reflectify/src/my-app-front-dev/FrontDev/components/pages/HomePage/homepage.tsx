import React from 'react';
import './HomePage.css'; // Import the CSS file for styling

const HomePage: React.FC = () => {
  const features = [
    'Mood & Stress Tracker',
    'Personal Journal',
    'Habit Tracker',
    'Team Challenges',
    'Connect with Friends',
    'Wellness Resources',
  ];

  return (
    <div className="homepage">
      <h1>Welcome to Reflectify</h1>
      <div className="circle-container">
        {features.map((feature, index) => (
          <button key={index} className="circle-button">
            {feature}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;