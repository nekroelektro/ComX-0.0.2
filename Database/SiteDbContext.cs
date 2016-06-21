using System;
using System.Data.Entity;
using System.Linq;
using ComX_0._0._2.Controllers;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Models;
using ComX_0._0._2.Models.AccountModels;

namespace ComX_0._0._2.Database {
    public class SiteDbContext : DbContext {
        public DbSet<Articles> Articles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<ArticleCategories> Categories { get; set; } 
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<ArticleSubCategories> SubCategories { get; set; }
        public DbSet<ImagesGallery> ImagesGallery { get; set; }
        public DbSet<UserProfileInfo> UserProfileInfo { get; set; }

        public void AddUser(Users user) {
            //UserHelper userHelper = new UserHelper();
            //user.Id = Guid.NewGuid();
            //user.Role = userHelper.GetAllRoles().First(x=>x.Name == "User").Id;
            //Users.Add(user);
            //SaveChanges();
        }

        public Users GetUser(string userName) {
            var user = Users.SingleOrDefault(u => u.UserName == userName);
            return user;
        }

        public Users GetUser(string userName, string password) {
            var user = Users.SingleOrDefault(u => u.UserName ==
                                                  userName && u.Password == password);
            return user;
        }
    }
}