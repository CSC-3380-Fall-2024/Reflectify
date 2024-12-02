export interface LoginCredentials{
    email: string;
    password: string;
}

export interface RegisterUser{
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse{
    access: string;
    refresh: string;
    }
