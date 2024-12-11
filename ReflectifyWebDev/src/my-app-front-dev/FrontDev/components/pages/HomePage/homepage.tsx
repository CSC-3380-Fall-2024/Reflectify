import React from 'react';
import { Link } from 'react-router-dom'; 
import './homepage.css';

const Homepage: React.FC = () => {
    return (
        <div className="homepage">
            <div className="header">
                <h1>Welcome to Reflectify</h1>
            </div>
            <div className="button-container">
                <Link to="/mood-stress-tracker" className="circle-button-link">
                    <button className="circle-button">
                        Mood & Stress Tracker
                    </button>
                </Link>

                <Link to="/personal-journal" className="circle-button-link">
                    <button className="circle-button">
                        Personal Journal
                    </button>
                </Link>
                
                <Link to="/habit-tracker" className="circle-button-link">
                    <button className="circle-button">
                        Habit Tracker
                    </button>
                </Link>

                <Link to="/connect-friends" className="circle-button-link">
                    <button className="circle-button">
                        Connect With Friends
                    </button>
                </Link>

                <Link to="/team-challenges" className="circle-button-link">
                    <button className="circle-button">
                        Weekly Challenges
                    </button>
                </Link>

                <Link to="/wellness-resources" className="circle-button-link">
                    <button className="circle-button">
                        Wellness Resources
                    </button>
                </Link>
            </div>


            <div className="emergency-container">
                <Link to="/emergency-contacts" className="rectangle-button-link">
                    <button className="rectangle-button emergency-button">
                        Emergency Resources
                    </button>
                </Link>

                <Link to="/my-profile" className="rectangle-button-link">
                    <button className="rectangle-button profile-button">
                        My Profile
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Homepage;