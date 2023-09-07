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
        var connectionString = "Server=127.0.0.1;Database=IW4MAdmin_Migration;Uid=root;Pwd=password;";
        options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            .EnableDetailedErrors()
            .EnableSensitiveDataLogging();
    }
}