import React, { useState } from 'react';
import axios from 'axios';
import {AuthService} from '../../services/AuthService';
import {LoginCredentials, AuthResponse} from '../../types/AuthTypes';


const Login: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                
                const credentials: LoginCredentials = {
                    email,
                    password,
                };
        
                try {
                    const response: AuthResponse = await AuthService.login(credentials);
                    // Assuming response is successful 
                    if (response.access) { 
                        // Check access token & Store it & Handle successful login
                        // Store Refresh Token 
                        onLoginSuccess();
                    } else {
                        setError('Login failed. Please check your credentials.');
                    }
                    } catch (err) {
                  // Handle error from API
                      if (axios.isAxiosError(err) && err.response) {
                          setError(err.response.data.detail || 'An error occurred. Please try again.');
                        } else {
                        setError('An error occurred. Please try again.');
                     }
                }
           };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
        </div>
    );
};

export default Login;