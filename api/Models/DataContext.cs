using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Week> Week { get; set; } = null!;
        public DbSet<Recipe> Recipe { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            modelBuilder.UseIdentityColumns();
            modelBuilder.Entity<Week>().HasMany(w => w.Recipes);
        }
    }
}
