namespace RadarVoluntario.Domain.Helpers;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using RadarVoluntario.Domain.Entities;

public class DataContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    
    public DataContext()
    {}

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to sqlite database
        var connectionString = AppSettings.Instance.DATABASE_CONN_STRING;
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            .EnableDetailedErrors()
            .EnableSensitiveDataLogging();
    }
}