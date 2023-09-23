export interface AuthenticationResponse {
    id: number,
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
    created: Date,
    updated?: Date,
    isVerified: boolean,
    jwtToken: string
}