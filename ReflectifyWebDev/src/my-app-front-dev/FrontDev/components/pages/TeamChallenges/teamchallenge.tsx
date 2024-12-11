import React from 'react';
import './teamchallenge.css';

const TeamChallenge: React.FC = () => {
  const email = localStorage.getItem('email') || 'No email found';

  const workoutSchedule = [
    { day: 'Monday', workout: '100 Push-ups, 50 Sit-ups, 75 Jumping Jacks' },
    { day: 'Tuesday', workout: '100 Push-ups, 50 Sit-ups, 75 Jumping Jacks' },
    { day: 'Wednesday', workout: '100 Push-ups, 50 Sit-ups, 75 Jumping Jacks' },
    { day: 'Thursday', workout: '100 Push-ups, 50 Sit-ups, 75 Jumping Jacks' },
    { day: 'Friday', workout: '100 Push-ups, 50 Sit-ups, 75 Jumping Jacks' },
    { day: 'Saturday', workout: 'Rest Day' },
    { day: 'Sunday', workout: 'Rest Day' },
  ];

  return (
    <div className="team-challenge">
      <div className="circle">
        <span className="email">{email}</span>
      </div>
      <h2> This Week Challenge: Weekly Workout </h2>
      <ul className="workout-schedule">
        {workoutSchedule.map((entry, index) => (
          <li key={index}>
            <strong>{entry.day}:</strong> {entry.workout}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamChallenge;