using System;
using System.Security.Principal;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using ComX_0._0._2.Views.Account.Models;

namespace ComX_0._0._2 {
    public class Global : HttpApplication {
        private void Application_Start(object sender, EventArgs e) {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        public override void Init() {
            PostAuthenticateRequest += MvcApplication_PostAuthenticateRequest;
            base.Init();
        }

        private void MvcApplication_PostAuthenticateRequest(object sender, EventArgs e) {
            var authCookie = HttpContext.Current.Request.Cookies[FormsAuthentication.FormsCookieName];
            if (authCookie != null) {
                var encTicket = authCookie.Value;
                if (!string.IsNullOrEmpty(encTicket)) {
                    var ticket = FormsAuthentication.Decrypt(encTicket);
                    var id = new UserIdentity(ticket);
                    var userRoles = Roles.GetRolesForUser(id.Name);
                    var prin = new GenericPrincipal(id, userRoles);
                    HttpContext.Current.User = prin;
                }
            }
        }
    }
}