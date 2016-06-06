﻿using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Controllers {
    public class ArticlesController : Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();
        // GET: Articles
        public ActionResult Index() {
            var publishedArticles = db.Articles.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).ToList();
            return View(publishedArticles);
        }

        // GET: Articles/Details/5
        [ValidateInput(false)]
        public ActionResult Details(Guid? id) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Articles.Find(id);
            if (articles == null) {
                return HttpNotFound();
            }
            ViewBag.ReturnArticleId = id;
            return View(articles);
        }

        // GET: Articles/Create
        public ActionResult Create() {
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            ViewBag.SubCategoryList = articleHelper.GetSubCategoriesToCombo();
            return View();
        }

        // POST: Articles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(
            [Bind(Include = "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited,IsPublished,SubCategoryId")] Articles article,
            HttpPostedFileBase upload) {
            var articleIdentifier = Guid.NewGuid();
            if (upload != null) {
                var validImageTypes = new[] {
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (!validImageTypes.Contains(upload.ContentType)) {
                    ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
                }
                else {
                    articleHelper.UploadImageForArticle(articleIdentifier, upload);
                }
            }

            if (ModelState.IsValid) {
                article.Id = articleIdentifier;
                article.DateCreated = DateTime.Now;
                article.DateEdited = DateTime.Now;
                article.UserId = userHelper.GetCurrentLoggedUserId();
                db.Articles.Add(article);

                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            ViewBag.SubCategoryList = articleHelper.GetSubCategoriesToCombo();
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
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            ViewBag.SubCategoryList = articleHelper.GetSubCategoriesToCombo();
            ViewBag.ArticleIdentificator = id;
            return View(articles);
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(
            [Bind(Include = "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited,IsPublished,SubCategoryId")] Articles article,
            HttpPostedFileBase upload) {
            if (upload != null) {
                var validImageTypes = new[] {
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (!validImageTypes.Contains(upload.ContentType)) {
                    ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
                }
                else {
                    articleHelper.UploadImageForArticle(article.Id, upload);
                }
            }
            if (ModelState.IsValid) {
                //Do poprawki, bo chujowizna straszna
                var entity = db.Articles.Where(c => c.Id == article.Id).AsQueryable().FirstOrDefault();
                if (entity != null) {
                    entity.Name = article.Name;
                    entity.Body = article.Body;
                    entity.Prelude = article.Prelude;
                    entity.DateEdited = DateTime.Now;
                    entity.CategoryId = article.CategoryId;
                    entity.SubCategoryId = article.SubCategoryId;
                    if (entity.IsPublished != article.IsPublished) {
                        entity.IsPublished = article.IsPublished;
                        entity.DateCreated = DateTime.Now;
                    }
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

        public ActionResult _LastFromCategory(int amount, Guid categoryId, Guid articleId) {
            var articles = articleHelper.GetLastArticlesFromCategory(amount, categoryId, articleId);
            return PartialView(articles);
        }

        public ActionResult _Comments(Guid? id, Guid? artId) {
            Comments comments = new Comments();
            if (id != null) {
                comments = db.Comments.Find(id);
            }
            ViewBag.ReturnArticleId = artId;
            return PartialView("_Comments", comments);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult _Comments(Comments comment) {
            //var currentArticle = Request.Params["Id"];
            var artId = comment.ArticleId;
            var userId = userHelper.GetCurrentLoggedUserId();
            if (string.IsNullOrEmpty(comment.Body)) {
                ModelState.AddModelError("EmptyComment", "Oszalałeś? Nie możesz dodać pustego komentarza...");
            }
            //if (userHelper.CheckIfLastCommentWasSameUser(userId, artId)) {
            //    ModelState.AddModelError("TwoComments", "You cannot add two comments in the row, douche!");
            //}
            else if (ModelState.IsValid) {
                comment.Id = Guid.NewGuid();
                comment.UserId = userId;
                comment.DateOfCreation = DateTime.Now;


                comment.ArticleId = artId;

                db.Comments.Add(comment);
                db.SaveChanges();
                return PartialView();
            }
            return PartialView();
        }

        public ActionResult CommentEdit(Guid? id, Guid? articleId) {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Comments.Find(id);
            if (articles == null)
            {
                return HttpNotFound();
            }
            ViewBag.ReturnArticleId = articleId;
            return PartialView(articles);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CommentEdit(Comments comment)
        {
            if (ModelState.IsValid) {
                var commentToChange = db.Comments.Find(comment.Id);
                commentToChange.Body = comment.Body;
                db.Entry(commentToChange).State = EntityState.Modified;
                db.SaveChanges();
            }
            return RedirectToAction("Details", new {id = comment.ArticleId});
        }

        public ActionResult _IndexSlider() {
            return PartialView("_IndexSlider");
        }

        public ActionResult DeleteComment(string commentId, string articleId) {
            var commentToDelete = db.Comments.Find(new Guid(commentId));
            db.Comments.Remove(commentToDelete);
            db.SaveChanges();
            return Redirect(Request.UrlReferrer.ToString());
        }

        public ActionResult DeleteImage(Guid articleId) {
            articleHelper.DeleteImageForGivenArticle(articleId);
            ViewBag.ArticleId = articleId;
            return RedirectToAction("Edit", new {id = articleId});
        }

        public ActionResult GetCategoryName(Guid categoryId) {
            var cat = articleHelper.GetCategoryById(categoryId);
            return Content(cat.Name);
        }

        public ActionResult Categories(Guid? id) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articlesByCategory =
                db.Articles.Where(x => x.IsPublished && x.CategoryId == id)
                    .OrderByDescending(x => x.DateCreated)
                    .ToList();
            if (articlesByCategory == null) {
                return HttpNotFound();
            }
            return View(articlesByCategory);
        }
    }
}