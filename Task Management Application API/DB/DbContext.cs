using Microsoft.EntityFrameworkCore;
using System;

namespace Task_Management_Application_API.DB
{
    public class AppliccationDbContext: DbContext
    {
        public AppliccationDbContext(DbContextOptions<AppliccationDbContext> options) : base(options) { }
        public DbSet<task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(pc => new { pc.UserName, pc.Password });
        }
    }
}
