import React, { useState } from 'react';
//import ReflectifyLogo from './my-app-front-dev/FrontDev//components/assets/ReflectifyLogo.png'; 
const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (username === 'user' && password === 'password') {
            onLoginSuccess(); // Call the success function passed as a prop
        } else {
            setError('Incorrect credentials. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;