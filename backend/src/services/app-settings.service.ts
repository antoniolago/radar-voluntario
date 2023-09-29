export class AppSettingsService {
  public getSettings() {
    return {
      GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      ENVIRONMENT: "main",
      APP_URL: process.env.APP_URL,
    };
  }
}
