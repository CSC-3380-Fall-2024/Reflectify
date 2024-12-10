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
        password: string;
    }
    access: string;
    refresh?: string;
    }


export interface Habit {
  id: number;
  user: number;
  name: string;
  target: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  created_at: string;
  updated_at: string;
}

export interface HabitLog {
  id: number;
  habit: number;
  habit_name: string;
  date: string;
  progress: number;
}
