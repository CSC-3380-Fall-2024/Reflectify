import React, { useState } from 'react';
import axios from 'axios';
import { AuthService } from '../../services/AuthService';
import { LoginCredentials, AuthResponse } from '../../types/AuthTypes';
import { useNavigate } from 'react-router-dom';

const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const credentials: LoginCredentials = {
            username: identifier, 
            password,
        };

        console.log('Logging in with credentials:', credentials);

        try {
            const response: AuthResponse = await AuthService.login(credentials);
            if (response.access) { 
                localStorage.setItem('accessToken', response.access); 
                if (response.refresh) {
                    localStorage.setItem('refreshToken', response.refresh);
                }
                onLoginSuccess(); 
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error("Axios error: ", err.response);
                setError(err.response.data.detail || 'An error occurred. Please try again.');
            } else {
                console.error('Error: ', err);
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <input
                        type="text"
                        placeholder="Username or Email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input-field"
                        required
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="login-button">Login</button>
            </form>
            <button onClick={handleRegister} className="register-button">Register</button>
        </div>
    );
};

export default Login;