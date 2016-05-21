using System;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Controllers {
    public class ConfigurationController : Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public ActionResult Articles() {
            return View(db.Articles.OrderByDescending(x => x.DateCreated).ToList());
        }

        public ActionResult Users() {
            return View(db.Users.OrderByDescending(x => x.DateOfCreation).ToList());
        }

        public ActionResult Roles() {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Roles(Roles role) {
            if (ModelState.IsValid) {
                role.Id = Guid.NewGuid();
                db.Roles.Add(role);
                db.SaveChanges();
                return RedirectToAction("Users");
            }
            return View();
        }

        public ActionResult Categories() {
            var categories = db.Categories.ToList();
            return View(categories);
        }

        public ActionResult CategoriesCreate() {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CategoriesCreate(ArticleCategories category) {
            if (ModelState.IsValid) {
                category.Id = Guid.NewGuid();
                db.Categories.Add(category);
                db.SaveChanges();
                return RedirectToAction("Categories");
            }
            return View();
        }

        public ActionResult CategoriesDetails(Guid? categoryId) {
            if (categoryId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var category = db.Categories.Find(categoryId);
            if (category == null) {
                return HttpNotFound();
            }
            return View(category);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CategoriesDetails(ArticleCategories category) {
            if (ModelState.IsValid) {
                articleHelper.ChangeCategoryDetails(category);
                return RedirectToAction("Categories");
            }
            return View();
        }

        public ActionResult DeleteCategory(string categoryId) {
            var categoryToDelete = db.Categories.Find(new Guid(categoryId));
            articleHelper.ChangeArticleCategoryIfCategoryDeleted(new Guid(categoryId));
            db.Categories.Remove(categoryToDelete);
            db.SaveChanges();
            return RedirectToAction("Categories");
        }
    }
}