using System.Text.Json.Serialization;

namespace RadarVoluntario.Domain.Helpers
{
    public class PublicAppSettings
    {
        public PublicAppSettings()
        {
            AMBIENTE = Environment.GetEnvironmentVariable("AMBIENTE");
            APP_URL = Environment.GetEnvironmentVariable("APP_URL");
        }
        [JsonPropertyName("AMBIENTE")]
        public string AMBIENTE { get; set; }

        [JsonPropertyName("APP_URL")]
        public string APP_URL { get; set; }
    }

    public class AppSettings : PublicAppSettings
    {
        private static readonly Lazy<AppSettings> lazyInstance = new Lazy<AppSettings>(() => new AppSettings());
        public static AppSettings Instance => lazyInstance.Value;
        public AppSettings() : base()
        {
            DISABLE_CACHE = bool.Parse(Environment.GetEnvironmentVariable("DISABLE_CACHE"));
            DATABASE_CONN_STRING = Environment.GetEnvironmentVariable("DATABASE_CONN_STRING");
            SECRET = Environment.GetEnvironmentVariable("SECRET");
            REDIS_OPTIONS = new REDIS_OPTIONS();
            EMAIL_FROM = Environment.GetEnvironmentVariable("EMAIL_FROM");
            //SMTP_OPTIONS = new SMTP_OPTIONS();
        }
        public REDIS_OPTIONS REDIS_OPTIONS { get; set; }
        public SMTP_OPTIONS SMTP_OPTIONS { get; set; }
        public string SECRET { get; set; }
        public string EMAIL_FROM { get; set; }
        public string DATABASE_CONN_STRING { get; set; }
        public int RefreshTokenTTL { get; set; }
        public bool DISABLE_CACHE { get; set; }
    }
    public class REDIS_OPTIONS
    {
        public REDIS_OPTIONS()
        {
            REDIS_HOST = Environment.GetEnvironmentVariable("REDIS_HOST");
            REDIS_PORT = Environment.GetEnvironmentVariable("REDIS_PORT");
            REDIS_PASS = Environment.GetEnvironmentVariable("REDIS_PASS");
        }
        public string REDIS_HOST { get; set; }
        public string REDIS_PORT { get; set; }
        public string REDIS_PASS { get; set; }

    }
    public class SMTP_OPTIONS
    {
        public SMTP_OPTIONS()
        {
            SMTP_HOST = Environment.GetEnvironmentVariable("SMTP_HOST");
            SMTP_PORT = int.Parse(Environment.GetEnvironmentVariable("SMTP_PORT"));
            SMTP_USER = Environment.GetEnvironmentVariable("SMTP_USER");
            SMTP_PASS = Environment.GetEnvironmentVariable("SMTP_PASS");
            SMTP_SSL = bool.Parse(Environment.GetEnvironmentVariable("SMTP_PASS"));
        }
        public string SMTP_HOST { get; set; }
        public int SMTP_PORT { get; set; }
        public string SMTP_USER { get; set; }
        public string SMTP_PASS { get; set; }
        public bool SMTP_SSL { get; set; }

    }
}
