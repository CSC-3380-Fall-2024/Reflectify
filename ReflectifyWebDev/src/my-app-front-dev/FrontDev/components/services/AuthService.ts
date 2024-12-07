import axios from 'axios';
import { LoginCredentials, RegisterUser , AuthResponse } from '../types/AuthTypes';

const API_URL = 'http://localhost:8000/api/auth/';

export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}login/`, credentials);
        return response.data;
    },
    register: async (userData: RegisterUser ): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}register/`, userData);
        return response.data;   
    },
    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const response = await axios.post(`${API_URL}refresh/`, { refresh: refreshToken });
        return response.data;
    },
};