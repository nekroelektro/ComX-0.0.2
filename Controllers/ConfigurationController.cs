using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Helpers;

namespace ComX_0._0._2.Controllers
{
    public class ConfigurationController : Controller
    {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        // GET: Configuration
        public ActionResult _Configuration()
        {
            return View();
        }

        public ActionResult Articles()
        {
            return View(db.Articles.OrderByDescending(x => x.DateCreated).ToList());
        }

        public ActionResult Users()
        {
            return View(db.Users.OrderByDescending(x=>x.DateOfCreation).ToList());
        }
    }
}