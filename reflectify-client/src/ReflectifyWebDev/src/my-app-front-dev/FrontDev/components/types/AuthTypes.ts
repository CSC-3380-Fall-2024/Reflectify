export interface LoginCredentials{
    username: string;
    password: string;
}

export interface RegisterUser{
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse{
    user: {
        id: number;
        username: string;
        email: string;
        password: string;
    }
    access: string;
    refresh: string;
    }
