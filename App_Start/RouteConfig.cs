﻿using System.Web.Mvc;
using System.Web.Routing;

namespace ComX_0._0._2 {
    public class RouteConfig {
        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute("Categories", "Categories/{id}",
                new { controller = "Articles", action = "Categories" }
                );

            routes.MapRoute("Details", "{id}",
                new { controller = "Articles", action = "Details"}
                );           

            routes.MapRoute("Default", "{controller}/{action}/{id}",
                new {controller = "Articles", action = "Index", id = UrlParameter.Optional}
                );
        }
    }
}