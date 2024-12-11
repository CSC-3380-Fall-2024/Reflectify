import React from 'react';
import ProfileLogo from '../../assets/MyProfileLogo.png';
import './myprofile.css'; 

const Profile: React.FC = () => {
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    return (
        <div className="profile-container">
            <img src={ProfileLogo} alt="User  Icon" className="profile-image" />
            <h2 className="profile-header">Account Information</h2>
            <div className="profile-info">
                <strong>Username:</strong> {username || 'Not set'}
            </div>
            <div className="profile-info">
                <strong>Email:</strong> {email || 'Not set'}
            </div>
        </div>
    );
};

export default Profile;