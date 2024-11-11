import React from 'react';
import './moodtrack.css';

const MoodTracker: React.FC = () => {
    const today = new Date('2024-11-07');
    const mood = "Happy"; // Example mood
    const mentalSymptomScore = 3; // Example score
    const physicalSymptomScore = 2; // Example score

    return (
        <div className="mood-tracker">
            <h1>How Am I Feeling Today?</h1>
            <div className="mood-info">
                <div className="mood-box">
                    <h2>Today's Mood: {mood}</h2>
                </div>
                <div className="scores-box">
                    <h3>Mental Symptom Score: {mentalSymptomScore}</h3>
                    <h3>Physical Symptom Score: {physicalSymptomScore}</h3>
                </div>
            </div>
        </div>
    );
};

export default MoodTracker;