using AngularKeep.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularKeep
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<NoteModel> Notes { get; set; }
        public DbSet<TaskModel> Tasks { get; set; }
    }
}
