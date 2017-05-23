using System;
using System.Linq;
using System.Web.Mvc;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;
using ComX_0._0._2.Views.Articles.Services;

namespace ComX_0._0._2.Views.Articles.Controller {
    public class ArticlesController : System.Web.Mvc.Controller {
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly IDocumentService documentService = new DocumentService();

        public ActionResult Index() {
            var model = documentService.GetIndexDetails();
            return PartialView("Index", model);
        }

        public ActionResult _SideBar(int? number) {
            var model = documentService.GetSideBarDetails(7);
            return PartialView("_SideBar", model);
        }

        public ActionResult _IndexSlider() {
            var model = documentService.GetSliderDetails();
            return PartialView("_IndexSlider", model);
        }

        public ActionResult _TopLogoPanel() {
            var model = documentService.GetTopLogoDetails();
            return PartialView("_TopLogoPanel", model);
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

        public ActionResult SearchResultsLive(string searchString) {
            var model = documentService.GetSearchResult(searchString);
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SearchResults(string searchString) {
            var model = documentService.GetSearchResultsDetails(searchString);
            return PartialView(model);
        }

        public ActionResult Edit(bool createMode, Guid? id, bool isDiary = false) {
            var model = documentService.GetEditDetails(createMode, isDiary, id);
            return View(model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(CreateModelDto document) {
            if (document.File != null) {
                var validImageTypes = new[] {
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (!validImageTypes.Contains(document.File.ContentType))
                    ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
            }
            documentService.EditDocument(document);
            var redirectUrl = new UrlHelper(Request.RequestContext).Action("Details", "Articles",
                new {id = document.Name, isDiary = document.IsDiary});
            return Json(new {Url = redirectUrl});
        }

        public ActionResult Delete(string id, bool isDiary = false) {
            documentService.DeleteDocument(new Guid(id), isDiary);
            var redirectUrl = new UrlHelper(Request.RequestContext).Action("Articles", "Configuration");
            return Json(new { Url = redirectUrl });
        }

        protected override void Dispose(bool disposing) {
            if (disposing) db.Dispose();
            base.Dispose(disposing);
        }

        public ActionResult DeleteImage(Guid articleId, bool isDiary) {
            documentService.DeleteImageForGivenDocument(articleId);
            var redirectUrl = new UrlHelper(Request.RequestContext).Action("Edit", "Articles",
                new {createMode = false, id = articleId, isDiary});
            return Json(new {Url = redirectUrl});
        }
    }
}