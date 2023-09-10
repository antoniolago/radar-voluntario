export interface AppSettings {
    ENVIRONMENT: "main" | "dev" | "local";
    APP_URL: string;
    GOOGLE_OAUTH_CLIENT_ID: string;
}