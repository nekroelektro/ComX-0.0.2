using System;
using System.Data.Entity;
using System.Linq;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Database {
    public class SiteDbContext : DbContext {
        public DbSet<Articles> Articles { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<ArticleCategories> Categories { get; set; } 
        public DbSet<Comments> Comments { get; set; }
        public DbSet<Images> Images { get; set; }

        public void AddUser(Users user) {
            user.Id = Guid.NewGuid();
            Users.Add(user);
            SaveChanges();
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

        public void AddUserRole(UserRoles userRole) {
            var roleEntry = UserRoles.SingleOrDefault(r => r.UserId == userRole.UserId);
            if (roleEntry != null) {
                UserRoles.Remove(roleEntry);
                SaveChanges();
            }
            UserRoles.Add(userRole);
            SaveChanges();
        }
    }
}