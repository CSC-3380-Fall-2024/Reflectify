import axios from 'axios';
import { LoginCredentials, RegisterUser , AuthResponse } from '../types/AuthTypes';

const API_URL = 'http://localhost:8000/api/auth/';
const TOKEN_KEY = 'access_token'; 
const REFRESH_TOKEN_KEY = 'refresh_token'; 

 export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {

        console.log('Sending credentials:', credentials);

        
        try {
            const response = await axios.post(`${API_URL}login/`, credentials, {
                headers: {

                    'Content-Type': 'application/json',
                }
            });
            console.log('Login response:', response);
            
            localStorage.setItem(TOKEN_KEY, response.data.access);
            if (response.data.refresh) {
                localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);

                throw new Error(error.response.data.detail || 'An error occurred during login.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },

    register: async (userData: RegisterUser ): Promise<AuthResponse> => {
        try {
            const response = await axios.post(`${API_URL}register/`, userData, {
                headers: {

                    'Content-Type': 'application/json',
                }
            });
            console.log('Registration response:', response);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);

                throw new Error(error.response.data.detail || 'An error occurred during registration.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) {
            throw new Error('No refresh token available.');
        }

        try {
            const response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken }, {
                headers: {

                    'Content-Type': 'application/json',
                }
            });
            console.log('Refresh token response:', response);
            
            localStorage.setItem(TOKEN_KEY, response.data.access);
            if (response.data.refresh) {
                localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);
            }
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error response:', error.response);

                throw new Error(error.response.data.detail || 'An error occurred while refreshing the token.');
            } else {
                console.error('Unexpected error:', error);
                throw new Error('An unexpected error occurred. Please try again.');
            }
        }
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY); 
    },

    setupInterceptors: () => {
        axios.interceptors.request.use(config => {
            const token = AuthService.getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`; // Attach the token to the request
            }
            return config;
        }, error => {
            return Promise.reject(error);
        });
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
};