using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;
using ComX_0._0._2.Views.Articles.Services;

namespace ComX_0._0._2.Views.Articles.Controller {
    public class ArticlesController : System.Web.Mvc.Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly IDocumentService documentService = new DocumentService();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public ActionResult Index() {
            var publishedArticles = documentService.GetDocumentForIndex(true);
            for (var i = 0; i < 7; i++) {
                publishedArticles.RemoveAt(0);
            }
            return PartialView("Index", publishedArticles);
        }

        [ValidateInput(false)]
        public ActionResult Details(string id, bool isDiary = false) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var documentFullName = generalHelper.AddSpecialCharsForString(id);
            //var document = articleHelper.GetDocumentByName(documentFullName, isDiary);
            var document = documentService.GetDocumentForDetails(documentFullName, isDiary, false);
            if (document == null) {
                return HttpNotFound();
            }
            ViewBag.ReturnArticleId = id;
            return View(document);
        }

        public ActionResult DetailDiaryHelper(string id) {
            return RedirectToAction("Details",
                new {
                    id,
                    isDiary = true
                });
        }

        public ActionResult Create() {
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            ViewBag.SubCategoryList = articleHelper.GetSubCategoriesToCombo();
            ViewBag.SeriesList = articleHelper.GetSeriesToCombo();
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(CreateModelDto document, HttpPostedFileBase upload) {
            var documentIdentifier = Guid.NewGuid();
            var isDiary = false;
            var documentName = document.Name;

            if (ModelState.IsValid) {
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
                        documentService.UploadImageForArticle(documentIdentifier, upload, document.IsDiary);
                    }
                }
                if (document.IsDiary) {
                    var diaryObject = new Diary {
                        Id = documentIdentifier,
                        Name = document.Name,
                        Body = document.Body,
                        DateCreated = DateTime.Now,
                        Label = document.Label,
                        ReleaseYear = Convert.ToInt32(document.ReleaseYear),
                        AlbumYear = Convert.ToInt32(document.AlbumYear),
                        Genre = document.Genre,
                        CatalogueNumber = document.CatalogueNumber,
                        IsPublished = document.IsPublished,
                        UserId = userHelper.GetCurrentLoggedUserId()
                    };
                    db.Diary.Add(diaryObject);
                    isDiary = true;
                }
                else {
                    var articleObject = new Models.Articles {
                        Id = documentIdentifier,
                        Name = document.Name,
                        IndexDescription = document.IndexDescription,
                        Prelude = document.Prelude,
                        Body = document.Body,
                        CategoryId = document.CategoryId.Value,
                        SubCategoryId = document.SubCategoryId.Value,
                        Series = document.Series.Value,
                        DateCreated = DateTime.Now,
                        DateEdited = DateTime.Now,
                        UserId = userHelper.GetCurrentLoggedUserId()
                    };
                    db.Articles.Add(articleObject);
                }
                db.SaveChanges();
                return RedirectToAction("Details",
                    new {
                        id = documentName,
                        isDiary
                    });
            }
            return View(document);
        }

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
            ViewBag.SeriesList = articleHelper.GetSeriesToCombo();
            ViewBag.ArticleIdentificator = id;
            return View(articles);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(
            [Bind(
                Include =
                    "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited,IsPublished,SubCategoryId,Series,IndexDescription"
                )] Models.Articles article,
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
                    documentService.UploadImageForArticle(article.Id, upload, false);
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
                    entity.Series = article.Series;
                    entity.IndexDescription = article.IndexDescription;
                    if (entity.IsPublished != article.IsPublished) {
                        entity.IsPublished = article.IsPublished;
                        entity.DateCreated = DateTime.Now;
                    }
                }
                db.Entry(entity).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Details",
                    new {id = generalHelper.RemoveSpecialCharsFromString(articleHelper.GetArticleById(article.Id).Name)});
            }
            return View(article);
        }

        public ActionResult Delete(Guid? id, bool isDiary = false) {
            var document = documentService.GetDocument(id.Value, isDiary);
            return View(document);
        }

        // POST: Articles/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id, bool isDiary) {
            documentService.DeleteDocument(id, isDiary);
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
            var comments = new Comments();
            if (id != null) {
                comments = db.Comments.Find(id);
            }
            ViewBag.ReturnArticleId = artId;
            return PartialView("_Comments", comments);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult _Comments([Bind(Include = "Id,Body,ArticleId")] Comments comment) {
            var artId = comment.ArticleId;
            var userId = userHelper.GetCurrentLoggedUserId();
            if (string.IsNullOrEmpty(comment.Body)) {
                ModelState.AddModelError("EmptyComment", "Oszalałeś? Nie możesz dodać pustego komentarza...");
            }
            else if (ModelState.IsValid) {
                comment.Id = Guid.NewGuid();
                comment.UserId = userId;
                comment.DateOfCreation = DateTime.Now;


                comment.ArticleId = artId;

                db.Comments.Add(comment);
                db.SaveChanges();
            }
            ViewBag.ReturnArticleId = artId;
            return PartialView("_Comments", new Comments());
        }

        public ActionResult CommentEdit(Guid? id, Guid? articleId) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = db.Comments.Find(id);
            if (articles == null) {
                return HttpNotFound();
            }
            ViewBag.ReturnArticleId = articleId;
            return PartialView(articles);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CommentEdit(Comments comment) {
            if (ModelState.IsValid) {
                var commentToChange = db.Comments.Find(comment.Id);
                commentToChange.Body = comment.Body;
                db.Entry(commentToChange).State = EntityState.Modified;
                db.SaveChanges();
            }
            return RedirectToAction("Details",
                new {
                    id =
                        generalHelper.RemoveSpecialCharsFromString(articleHelper.GetArticleById(comment.ArticleId).Name)
                });
        }

        public ActionResult _IndexSlider() {
            var lastDocuments = documentService.GetDocumentForIndex(false, 7);
            return PartialView("_IndexSlider", lastDocuments);
        }

        public ActionResult DeleteComment(string commentId, string articleId) {
            var commentToDelete = db.Comments.Find(new Guid(commentId));
            db.Comments.Remove(commentToDelete);
            db.SaveChanges();
            ViewBag.ReturnArticleId = new Guid(articleId);
            return PartialView("_Comments", new Comments());
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

        public ActionResult Categories(string id, string subId) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var cat = articleHelper.GetCategoryByName(id);
            var articlesByCategory =
                db.Articles.Where(x => x.IsPublished && x.CategoryId == cat.Id)
                    .OrderByDescending(x => x.DateCreated)
                    .ToList();
            if (!string.IsNullOrEmpty(subId)) {
                var subCat = articleHelper.GetSubCategoryByName(subId);
                articlesByCategory = articlesByCategory.Where(x => x.SubCategoryId == subCat.Id).ToList();
            }
            ViewBag.CategoryIdentificator = cat.Id;
            return View(articlesByCategory);
        }

        public ActionResult _TopDetailPanel(string id, bool isDiary) {
            if (isDiary) {
                id = id.Split('?').First();
            }
            var document = documentService.GetDocumentForDetails(id, isDiary, true);
            //var article =
            //    db.Articles.Find(articleHelper.GetArticleById(generalHelper.GetIdFromCurrentUrlForArticle()).Id);
            return PartialView(document);
        }
    }
}