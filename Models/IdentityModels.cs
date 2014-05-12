using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Security.AccessControl;
using Microsoft.AspNet.Identity.EntityFramework;

namespace WebLife.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Email { get; set; }
        public string ConfirmationToken { get; set; }
        public bool IsConfirmed { get; set; }
        public string Theme { get; set; }
        public int Role { get; set; }
    }

    public class Config
    {
        [Key]
        public string  ConfigId { get; set; }
        public string Name { get; set; }
        public string UiserId { get; set; }
        public int CellSize { get; set; }
        public int Min  { get; set; }
        public int Max { get; set; }
        public int Spawn { get; set; }
    }

    public class Cell
    {
        [Key]
        public string Id { get; set; }
        public string ConfigId { get; set; }
        public int  X { get; set; }
        public int Y { get; set; }
    }
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        public DbSet<Config> Configs { get; set; }
        public DbSet<Cell> Cells { get; set; }
    }
}