using LAAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LAAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
            base(options)
        {
        }

        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Confession> Confessions { get; set; }
        public DbSet<Deanery> Deaneries { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Donor> Donors { get; set; }
        public DbSet<Mass> Masses { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Occasion> Occasions { get; set; }
        public DbSet<Parish> Parishes { get; set; }
        public DbSet<Quote> Quotes { get; set; }
        public DbSet<Reflection> Reflections { get; set; }

    }
}
