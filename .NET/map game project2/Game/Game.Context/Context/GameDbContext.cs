using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Game.Models;
using Microsoft.AspNetCore.Identity;

namespace Game.Context.Context
{
    public class GameDbContext : IdentityDbContext<User>
    {
        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options) { }

        public  DbSet<Games> Games { get; set; }
        public  DbSet<UsersScores> UsersScores { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Add unique constraint on Email for the User entity
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Define relationships and other configurations
            modelBuilder.Entity<User>()
                .HasMany(u => u.UsersScores)
                .WithOne(us => us.User)
                .HasForeignKey(us => us.UserId);

            modelBuilder.Entity<Games>()
                .HasMany(g => g.UsersScores)
                .WithOne(us => us.Games)
                .HasForeignKey(us => us.GamesId);
        }
    }
}
