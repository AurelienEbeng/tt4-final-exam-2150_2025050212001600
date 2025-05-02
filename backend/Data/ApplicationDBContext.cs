

namespace backend.Data {
    using backend.Models;
    using Microsoft.EntityFrameworkCore;
    public class ApplicationDBContext : DbContext{
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options){

        }

        public DbSet<Bug> Bugs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            
        }

    }
}