export interface UserAccount{
    id: number;
    username: string;
    email: string;
}

export interface UpdateAccount{
    username?: string;
    email?: string;
}
