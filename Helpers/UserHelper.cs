using System;
using System.Web.Mvc;
using System.Web.Security;

namespace ComX_0._0._2.Helpers {
    public class UserHelper : Controller {
        public Guid GetCurrentLoggedUserId() {
            var membershipUser = Membership.GetUser();
            var user = membershipUser.ProviderUserKey.ToString();
            var userId = new Guid(user);
            return userId;
        }
    }
}