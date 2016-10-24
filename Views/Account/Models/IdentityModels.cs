using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Configuration.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ComX_0._0._2.Views.Account.Models {
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager) {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser> {
        public DbSet<Articles.Models.Articles> Articles { get; set; }
        //public DbSet<Users> Users { get; set; }
        //public DbSet<Roles> Roles { get; set; }
        public DbSet<ArticleCategories> Categories { get; set; }
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<ArticleSubCategories> SubCategories { get; set; }
        public DbSet<ImagesGallery> ImagesGallery { get; set; }
        public DbSet<UserProfileInfo> UserProfileInfo { get; set; }
        public DbSet<Series> Series { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; } 
        public DbSet<Diary> Diary { get; set; }

        public ApplicationDbContext(): base("DefaultConnection", false) {
        }

        public static ApplicationDbContext Create() {
            return new ApplicationDbContext();
        }
    }
}