using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;
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
            var model = documentService.GetIndexDetails();
            return PartialView("Index", model);
        }

        public ActionResult _SideBar(int? number) {
            var model = documentService.GetSideBarDetails(number);
            return PartialView("_SideBar", model);
        }

        [ValidateInput(false)]
        public ActionResult Details(string id, bool isDiary = false) {
            var document = documentService.GetArticleDetails(id, isDiary);
            ViewBag.ReturnArticleId = id;
            return View(document);
        }

        public ActionResult _LastFromCategory(string categoryName, Guid articleId){
            var model = documentService.GetLastFromCategoryDetails(categoryName, articleId);
            return PartialView(model);
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
                }
                documentService.CreateDocument(document, upload);
                return RedirectToAction("Details",
                    new {
                        id = document.Name,
                        document.IsDiary
                    });
            }
            return View(document);
        }

        public ActionResult Edit(Guid? id, bool isDiary) {
            var document = documentService.GetDocumentForEdit(id.Value, isDiary);
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            ViewBag.SubCategoryList = articleHelper.GetSubCategoriesToCombo();
            ViewBag.SeriesList = articleHelper.GetSeriesToCombo();
            ViewBag.ArticleIdentificator = id;
            return View(document);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(CreateModelDto document, HttpPostedFileBase upload) {
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
            }
            if (ModelState.IsValid) {
                documentService.UpdateDocument(document, upload);
                return RedirectToAction("Details",
                    new {
                        id = document.Name,
                        document.IsDiary
                    });
            }
            return View(document);
        }

        public ActionResult Delete(Guid? id, bool isDiary = false) {
            var document = documentService.GetDocument(id.Value, isDiary);
            return View(document);
        }
        
        public ActionResult DeleteConfirmed(string id, bool isDiary) {
            documentService.DeleteDocument(new Guid(id), isDiary);
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        public ActionResult _Comments(Guid? id, Guid? artId, bool isDiary) {
            var comments = new CommentModelDto();
            if (id != null) {
                comments = documentService.GetCommentDetails(id.Value);
            }
            ViewBag.ReturnArticleId = artId;
            ViewBag.IsDocumentDiary = isDiary;
            return PartialView("_Comments", comments);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult _Comments(CommentModelDto comment) {
            if (string.IsNullOrEmpty(comment.Body)) {
                ModelState.AddModelError("EmptyComment", "Oszalałeś? Nie możesz dodać pustego komentarza...");
            }
            else if (ModelState.IsValid) {
                documentService.CreateComment(comment);
            }
            ViewBag.ReturnArticleId = comment.ArticleId;
            ViewBag.IsDocumentDiary = comment.IsDiary;
            return PartialView("_Comments", new CommentModelDto());
        }

        public ActionResult CommentEdit(Guid? id, Guid? articleId) {
            if (id == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var articles = documentService.GetCommentDetails(id.Value);
            if (articles == null) {
                return HttpNotFound();
            }
            ViewBag.ReturnArticleId = articles.ArticleId;
            ViewBag.IsDocumentDiary = articles.IsDiary;
            return PartialView(articles);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CommentEdit(CommentModelDto comment) {
            if (ModelState.IsValid) {
                documentService.UpdateComment(comment);
            }
            return RedirectToAction("Details",
                new {
                    id =
                        generalHelper.RemoveSpecialCharsFromString(documentService.GetDocument(comment.ArticleId, comment.IsDiary).Name)
                });
        }

        public ActionResult _IndexSlider() {
            var model = documentService.GetSliderDetails();
            return PartialView("_IndexSlider", model);
        }

        public ActionResult DeleteComment(string commentId, string articleId, bool isDiary) {
            documentService.DeleteComment(new Guid(commentId));
            ViewBag.ReturnArticleId = new Guid(articleId);
            ViewBag.IsDocumentDiary = isDiary;
            return PartialView("_Comments", new CommentModelDto());
        }

        public ActionResult DeleteImage(Guid articleId, bool isDiary) {
            documentService.DeleteImageForGivenDocument(articleId);
            ViewBag.ArticleId = articleId;
            return RedirectToAction("Edit", new {
                id = articleId,
                isDiary
            });
        }

        public ActionResult Diary() {
            var diaries = documentService.GetDiaries().OrderByDescending(x=>x.Name);
            return View(diaries);
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
            var articlesByCategory = documentService.GetDocumentForIndex(true).Where(x=>x.Categories.Value == cat.Id).OrderByDescending(x => x.DateCreation).ToList();
            if (!string.IsNullOrEmpty(subId)) {
                var subCat = articleHelper.GetSubCategoryByName(subId);
                articlesByCategory = articlesByCategory.Where(x => x.SubCategories.Value == subCat.Id).ToList();
            }
            ViewBag.CategoryIdentificator = cat.Id;
            return View(articlesByCategory);
        }
    }
}