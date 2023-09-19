using System.Text.Json.Serialization;
using RadarVoluntario.Domain.Helpers;
using RadarVoluntario.Business.Services;
using RadarVoluntario.Domain.Authorization;
using RadarVoluntario.API.Services;
using Microsoft.EntityFrameworkCore;
using dotenv.net;
using Microsoft.AspNetCore.Builder;

var envFiles = new List<string>
{
    "../../.env",
    "../../secrets.env"
};
DotEnv.Load(options: new DotEnvOptions(envFilePaths: envFiles));

var builder = WebApplication.CreateBuilder(args);

// add services to DI container
{
    var services = builder.Services;
    var env = builder.Environment;
 
    services.AddDbContext<DataContext>();
    services.AddCors();
    services.AddControllers().AddJsonOptions(x => 
    {
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
    services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    services.AddSwaggerGen();

    // configure strongly typed settings object
    //services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

    // configure DI for application services
    services.AddScoped<IJwtUtils, JwtUtils>();
    services.AddScoped<AccountService>();
    services.AddScoped<IEmailService, EmailService>();
}

var app = builder.Build();

// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();    
    dataContext.Database.Migrate();
}

// configure HTTP request pipeline
{
    // generated swagger json and swagger ui middleware
    app.UseSwagger();
    app.UseSwaggerUI(x => x.SwaggerEndpoint("/swagger/v1/swagger.json", "Radar Voluntario API"));

    // global cors policy
    app.UseCors(x => x
        .SetIsOriginAllowed(origin => true)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

    app.UseStaticFiles("/api");
    app.UsePathBase("/api");
    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();
    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();
    app.MapControllers();
}

app.Run();