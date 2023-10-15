export interface AuthenticationResponse {
    token: string;
    user: IUser;
}

interface IUser {
    id: string;
    name: string;
    email: string;
}