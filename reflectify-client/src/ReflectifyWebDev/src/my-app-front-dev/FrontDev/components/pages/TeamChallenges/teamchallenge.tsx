import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import './teamchallenge.css';

interface Friend {
  id: string;
  name: string;
  progress: number; 
}

interface TeamChallengesProps {
  friends: Friend[];
  weeklyChallenge: string;
  previousWeeksRecap: string[];
}

const TeamChallenges: React.FC<TeamChallengesProps> = ({ friends, weeklyChallenge, previousWeeksRecap }) => {
  return (
    <div className="team-challenges-container">
      <div className="trophy-circle">
        <FaTrophy className="trophy-icon" />
      </div>
      <h2 className="challenge-title">This Week's Challenge</h2>
      <p className="challenge-description">{weeklyChallenge}</p>

      <div className="challenges-grid">
        <div className="leaderboard">
          <h3 className="leaderboard-title">Leaderboard</h3>
          <ul className="leaderboard-list">
            {friends.map(friend => (
              <li key={friend.id} className="leaderboard-item">
                {friend.name}: {friend.progress}%
              </li>
            ))}
          </ul>
        </div>

        <div className="recap">
          <h3 className="recap-title">Previous Weeks' Recap</h3>
          <ul className="recap-list">
            {previousWeeksRecap.map((recap, index) => (
              <li key={index} className="recap-item">
                {recap}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamChallenges;