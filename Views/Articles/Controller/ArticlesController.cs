using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
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

        public ActionResult _IndexSlider() {
            var model = documentService.GetSliderDetails();
            return PartialView("_IndexSlider", model);
        }

        [ValidateInput(false)]
        public ActionResult Details(string id, bool isDiary = false) {
            var document = documentService.GetArticleDetails(id, isDiary);
            ViewBag.ReturnArticleId = id;
            return View(document);
        }

        public ActionResult _LastFromCategory(string categoryName, Guid articleId) {
            var model = documentService.GetLastFromCategoryDetails(categoryName, articleId);
            return PartialView(model);
        }

        public ActionResult _TopNavigationMenu() {
            var model = documentService.GetNavigationDetails();
            return PartialView(model);
        }

        public ActionResult DetailDiaryHelper(string id) {
            return RedirectToAction("Details",
                new {
                    id,
                    isDiary = true
                });
        }

        public ActionResult _Comments(Guid articleId, bool diary) {
            var model = documentService.GetCommentsDetails(articleId, diary);
            return PartialView("_Comments", model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult _Comments(string body, Guid articleId, bool isDiary) {
            documentService.CreateComment(body, articleId, isDiary);
            var model = documentService.GetCommentsDetails(articleId, isDiary);
            return PartialView("_Comments", model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CommentEdit(string bodyText, string commentId, string articleId, string isDiary) {
            documentService.UpdateComment(bodyText, new Guid(commentId));
            var model = documentService.GetCommentsDetails(new Guid(articleId), Convert.ToBoolean(isDiary));
            return PartialView("_Comments", model);
        }

        public ActionResult DeleteComment(string commentId, string articleId, string isDiary) {
            documentService.DeleteComment(new Guid(commentId));
            var model = documentService.GetCommentsDetails(new Guid(articleId), Convert.ToBoolean(isDiary));
            return PartialView("_Comments", model);
        }

        public ActionResult Diary() {
            var diaries = documentService.GetDiariesDetails();
            return PartialView(diaries);
        }

        public ActionResult Categories(string id, string subId) {
            var model = documentService.GetCategoryDetails(id);
            ViewBag.SubId = subId;
            return View(model);
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
                    if (!validImageTypes.Contains(upload.ContentType))
                        ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
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
                if (!validImageTypes.Contains(upload.ContentType))
                    ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
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
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }

        public ActionResult DeleteImage(Guid articleId, bool isDiary) {
            documentService.DeleteImageForGivenDocument(articleId);
            ViewBag.ArticleId = articleId;
            return RedirectToAction("Edit", new {
                id = articleId,
                isDiary
            });
        }
    }
}