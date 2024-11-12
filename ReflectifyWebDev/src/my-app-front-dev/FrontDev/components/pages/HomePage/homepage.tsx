import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import ReflectifyLogo from './my-app-front-dev/FrontDev/components/assets/ReflectifyLogo.png';
import './homepage.css';

const Homepage: React.FC = () => {
    return (
        <div className="homepage">
            <div className="header">
                <h1>Welcome to Reflectify</h1>
            </div>
            <div className="button-container">
                {['Mood & Stress Tracker', 'Personal Journal', 'Habit Tracker', 'Team Challenges', 'Connect with Friends', 'Wellness Resources'].map((item, index) => (
                    //<Link to={`/${item.replace(/\s+/g, '-').toLowerCase()}`} key={index} className="circle-button-link">
                        <button className="circle-button">
                            {item}
                        </button>
                    //</Link>
                ))}
            </div>
        </div>
    );
};

export default Homepage;