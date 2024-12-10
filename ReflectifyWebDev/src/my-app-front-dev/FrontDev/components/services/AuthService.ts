import axios from 'axios';
import { LoginCredentials, RegisterUser, AuthResponse } from '../types/AuthTypes';

const API_URL = 'http://localhost:8000/api/auth/';

export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        console.log('Sending credentials:', credentials);  // Log credentials for debugging
        
        try {
            const response = await axios.post(`${API_URL}login/`, credentials, {
                headers: {
                    'Content-Type': 'application/json',  // Make sure content type is correct
                }
            });
            console.log('Login response:', response);  // Log response for debugging
            return response.data;  // Return the response data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);  // Log the full error response for debugging
                throw new Error(error.response.data.detail || 'An error occurred during login.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },

    register: async (userData: RegisterUser): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`${API_URL}register/`, userData, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure content type is correct
                }
            });
            console.log('Registration response:', response);  // Log response for debugging
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);  // Log the error response
                throw new Error(error.response.data.detail || 'An error occurred during registration.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken }, {
                headers: {
                    'Content-Type': 'application/json',  // Ensure content type is correct
                }
            });
            console.log('Refresh token response:', response);  // Log response for debugging
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);  // Log the error response
                throw new Error(error.response.data.detail || 'An error occurred while refreshing the token.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },
};
