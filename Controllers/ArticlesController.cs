using System;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Remoting.Contexts;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Controllers {
    public class ArticlesController : Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly UserHelper userHelper = new UserHelper();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        // GET: Articles
        public ActionResult Index() {
            return View(db.Articles.ToList());
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
            return View(articles);
        }

        // GET: Articles/Create
        public ActionResult Create() {
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            return View();
        }

        // POST: Articles/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Create(
            [Bind(Include = "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited")] Articles article,
            HttpPostedFileBase upload) {
            //Image to database!
            //SEEMS TO WORK
            var validImageTypes = new[] {
                "image/gif",
                "image/jpeg",
                "image/pjpeg",
                "image/png"
            };

            //if (upload == null || upload.ContentLength == 0) {
            //    ModelState.AddModelError("ImageUpload", "This field is required");
            //}
            //else if (!validImageTypes.Contains(upload.ContentType)) {
            //    ModelState.AddModelError("ImageUpload", "Please choose either a GIF, JPG or PNG image.");
            //}
            var articleIdentifier = Guid.NewGuid();
            var imgToUpload = new Images();
            if (upload != null)
            {
                using (Image img = Image.FromStream(upload.InputStream))
                {
                    byte[] file = new byte[upload.InputStream.Length];
                    BinaryReader reader = new BinaryReader(upload.InputStream);
                    upload.InputStream.Seek(0, SeekOrigin.Begin);

                    file = reader.ReadBytes((int)upload.InputStream.Length);

                    imgToUpload.Id = Guid.NewGuid();
                    imgToUpload.ArticleId = articleIdentifier;
                    imgToUpload.Source = file;
                    imgToUpload.FileName = generalHelper.GenerateRandomNumber() + "_" + upload.FileName;
                    imgToUpload.FileSize = upload.ContentLength;
                    imgToUpload.FileFormat = upload.ContentType;
                    imgToUpload.OriginalWidth = img.Width;
                    imgToUpload.OriginalHeight = img.Height;
                    imgToUpload.DateOfChange = DateTime.Now;
                }
            }
            if (ModelState.IsValid) {
                article.Id = articleIdentifier;
                article.DateCreated = DateTime.Now;
                article.DateEdited = DateTime.Now;
                article.UserId = userHelper.GetCurrentLoggedUserId();
                db.Articles.Add(article);

                //var image = new Images {
                //    Id = Guid.NewGuid(),
                //    ArticleId = article.Id,
                //    DateOfChange = DateTime.Now
                //};

                //if (upload != null && upload.ContentLength > 0) {
                //    var uploadDir = "~/Content/imgContener";
                //    var imagePath = Path.Combine(Server.MapPath(uploadDir), upload.FileName);
                //    var imageUrl = Path.Combine(uploadDir, upload.FileName);
                //    upload.SaveAs(imagePath);
                //    //image.ImageUrl = imageUrl;
                //}
                //db.Images.Add(image);
                db.Images.Add(imgToUpload);

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
            ViewBag.CategoryList = articleHelper.GetCategoriesToCombo();
            return View(articles);
        }

        // POST: Articles/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Edit(
            [Bind(Include = "Id,Name,Prelude,Body,CategoryId,DateCreated,DateEdited")] Articles article) {
            if (ModelState.IsValid) {
                //Do poprawki, bo chujowizna straszna
                var entity = db.Articles.Where(c => c.Id == article.Id).AsQueryable().FirstOrDefault();
                if (entity != null) {
                    entity.Name = article.Name;
                    entity.Body = article.Body;
                    entity.Prelude = article.Prelude;
                    entity.DateEdited = DateTime.Now;
                    entity.CategoryId = article.CategoryId;
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

        public ActionResult _Comments() {
            var comments = new Comments();
            return PartialView("_Comments", comments);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult _Comments(Comments comment) {
            if (ModelState.IsValid) {
                comment.Id = Guid.NewGuid();
                comment.UserId = userHelper.GetCurrentLoggedUserId();
                comment.DateOfCreation = DateTime.Now;

                var currentArticle = Request.Params["Id"];
                var artId = new Guid(currentArticle);

                comment.ArticleId = artId;

                db.Comments.Add(comment);
                db.SaveChanges();
                return PartialView();
            }
            return PartialView();
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

        public ActionResult GetImage(string articleId) {
            var img = articleHelper.GetImageByArticleId(new Guid(articleId));
            if (img != null) {
                return File(img.Source, img.FileFormat);
            }
            return null;
        }
    }
}