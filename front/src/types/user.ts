export interface User {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    created: Date;
    updated: Date;
    IsVerified: boolean;
}