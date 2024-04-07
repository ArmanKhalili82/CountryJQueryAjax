using CountryJQueryAjax.Models;
using Microsoft.EntityFrameworkCore;

namespace CountryJQueryAjax.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<CountryInfo> Countries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CountryInfo>().HasData(
            new CountryInfo { Id = 1, Country = "Usa", City = "New York", CapitalCity = "City", Population = 20000000 },
            new CountryInfo { Id = 2, Country = "Usa", City = "Washington", CapitalCity = "Capital City", Population = 10000000 },
            new CountryInfo { Id = 3, Country = "Germany", City = "Berlin", CapitalCity = "Capital City", Population = 7000000 });
    }
}
