using System;
using System.Web.Mvc;
using System.Web.Security;
using ComX_0._0._2.Database;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Helpers {
    public class UserHelper : Controller {
        private readonly SiteDbContext db = new SiteDbContext();

        public Guid GetCurrentLoggedUserId() {
            var membershipUser = Membership.GetUser();
            var user = membershipUser.ProviderUserKey.ToString();
            var userId = new Guid(user);
            return userId;
        }

        public Users GetUserById(Guid id) {
            var user = db.Users.Find(id);
            return user;
        }
    }
}