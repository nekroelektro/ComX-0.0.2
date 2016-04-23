using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using System.Web.Security;
using ComX_0._0._2.Database;
using ComX_0._0._2.Interfaces;
using ComX_0._0._2.Models;
using Microsoft.AspNet.Identity;

namespace ComX_0._0._2.Controllers {
    public class ArticlesController : Controller {
        private readonly SiteDbContext db = new SiteDbContext();

        // GET: Articles
        public ActionResult Index() {
            return View(db.Articles.ToList());
        }

        // GET: Articles/Details/5
        public ActionResult Details(Guid? id) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Articles.Find(id);
            if (articles == null) {
                return HttpNotFound();
            }
            return View(articles);
        }

        // GET: Articles/Create
        public ActionResult Create() {
            var categoryList = db.Categories.ToList();
            ViewBag.CategoryList = categoryList;
            return View();
        }

        // POST: Articles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(
            [Bind(Include = "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited")] Articles article) {
            var currentUser = Membership.GetUser().ProviderUserKey.ToString();
            var currentUserId = User.Identity;
            if (ModelState.IsValid) {
                article.Id = Guid.NewGuid();
                article.DateCreated = DateTime.Now;
                article.DateEdited = DateTime.Now;
                if (!string.IsNullOrEmpty(currentUser)){
                    article.UserId = new Guid(currentUser);
                }
                db.Articles.Add(article);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(article);
        }

        // GET: Articles/Edit/5
        public ActionResult Edit(Guid? id) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Articles.Find(id);
            if (articles == null) {
                return HttpNotFound();
            }
            return View(articles);
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit([Bind(Include = "Id,Name,Prelude,Body,Category,DateCreated,DateEdited")] Articles article) {
            if (ModelState.IsValid) {
                //Do poprawki, bo chujowizna straszna
                var entity = db.Articles.Where(c => c.Id == article.Id).AsQueryable().FirstOrDefault();
                if (entity != null) {
                    entity.Name = article.Name;
                    entity.Body = article.Body;
                    entity.Prelude = article.Prelude;
                    entity.DateEdited = DateTime.Now;
                }
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(article);
        }

        // GET: Articles/Delete/5
        public ActionResult Delete(Guid? id) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Articles.Find(id);
            if (articles == null) {
                return HttpNotFound();
            }
            return View(articles);
        }

        // POST: Articles/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id) {
            var articles = db.Articles.Find(id);
            db.Articles.Remove(articles);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult Categories() {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Categories(ArticleCategories category) {
            if (ModelState.IsValid) {
                category.Id = Guid.NewGuid();
                db.Categories.Add(category);
                db.SaveChanges();
                return View();
            }
            return View();
        }
    }
}