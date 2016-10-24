using System.Web.Mvc;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;

namespace ComX_0._0._2.Views.Nekropedia.Controller {
    public class NekropediaController : System.Web.Mvc.Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();
        // GET: Nekropedia
        public ActionResult Index() {
            return View();
        }
    }
}