using BackendGuitar.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendGuitar.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Guitar> Guitars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Guitar>(e =>
            {
                e.HasKey("Id");
            });
        }

    }
}
