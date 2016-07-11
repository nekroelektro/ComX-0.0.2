using System.Web.Mvc;
using System.Web.Routing;

namespace ComX_0._0._2 {
    public class RouteConfig {
        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            
            routes.MapRoute("Default", "{controller}/{action}/{id}",
                new {controller = "Articles", action = "Index", id = UrlParameter.Optional}
                );

            routes.MapRoute("Custom", "{controller}/{name}",
                new { controller = "Articles", action = "Details", name = UrlParameter.Optional }
                );
        }
    }
}