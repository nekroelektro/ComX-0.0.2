using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Models;
using System.Data.Entity;

namespace ComX_0._0._2.Helpers {
    public class ArticleHelper {
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();

        public List<Articles> GetLastArticles(int number) {
            var articles = db.Articles.Where(x=>x.IsPublished).OrderByDescending(x => x.DateCreated).Take(number);
            return articles.ToList();
        }

        public Articles GetArticleById(Guid id) {
            var article = db.Articles.Find(id);
            return article;
        }

        public List<Articles> GetArticlesByAuthor(Guid id) {
            var articles = db.Articles.Where(x => x.UserId == id).ToList();
            return articles;
        }

        public List<Articles> GetArticlesByCategory(Guid id) {
            var articles = db.Articles.Where(x => x.CategoryId == id).ToList();
            return articles;
        }

        public List<Articles> GetArticlesBySubCategory(Guid id)
        {
            var articles = db.Articles.Where(x => x.SubCategoryId == id).ToList();
            return articles;
        }

        public ArticleCategories GetCategoryById(Guid id) {
            var category = db.Categories.Find(id);
            return category;
        }

        public ArticleSubCategories GetSubCategoryById(Guid id)
        {
            var category = db.SubCategories.Find(id);
            return category;
        }

        public List<ArticleCategories> GetAllCategories() {
            var categories = db.Categories.OrderByDescending(x=>x.SortCode).ToList();
            return categories;
        }

        public List<ArticleSubCategories> GetAllSubCategories(){
            var categories = db.SubCategories.OrderByDescending(x => x.SortCode).ToList();
            return categories;
        }

        public List<Articles> GetArticlesByBothCategories(Guid categoryId, Guid subCategoryId, int? amountOfArticles) {
            var articles =
                db.Articles.Where(x => x.IsPublished && x.CategoryId == categoryId && x.SubCategoryId == subCategoryId)
                    .OrderByDescending(x => x.DateCreated).Take(amountOfArticles.Value);
            return articles.ToList();
        } 

        public List<SelectListItem> GetCategoriesToCombo() {
            var categoryList = new List<ArticleCategories>();

            categoryList = db.Categories.ToList();
            return categoryList.Select(item => new SelectListItem {
                Text = item.Name, Value = item.Id.ToString()
            }).ToList();
        }

        public List<SelectListItem> GetSubCategoriesToCombo()
        {
            var categoryList = new List<ArticleSubCategories>();

            categoryList = db.SubCategories.ToList();
            return categoryList.Select(item => new SelectListItem {
                Text = item.Name, Value = item.Id.ToString()
            }).ToList();
        }

        public void ChangeCategoryDetails(ArticleCategories category) {
            var categoryToChange = this.GetCategoryById(category.Id);
            categoryToChange.Name = category.Name;
            categoryToChange.Description = category.Description;
            categoryToChange.SortCode = category.SortCode;
            db.Entry(categoryToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void ChangeSubCategoryDetails(ArticleSubCategories category){
            var categoryToChange = db.SubCategories.Find(category.Id);
            categoryToChange.Name = category.Name;
            categoryToChange.Description = category.Description;
            categoryToChange.SortCode = category.SortCode;
            db.Entry(categoryToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        public List<Comments> GetCommentsByArticle(Guid id) {
            List<Comments> comments = new List<Comments>();
            comments = db.Comments.Where(x => x.ArticleId == id).ToList();
            if (comments.Count() != 0) {
                return comments.OrderByDescending(x => x.DateOfCreation).ToList();
            }
            return comments;
        }

        public List<Comments> GetCommentsByUser(Guid id) {
            var comments = db.Comments.Where(x => x.UserId == id);
            return comments.ToList();
        }

        public void UploadImageForArticle(Guid articleIdentifier, HttpPostedFileBase upload)
        {
            var imgToUpload = new Images();
            if (upload != null)
            {
                imgToUpload.FileName = generalHelper.GenerateRandomNumber() + "_" + upload.FileName;
                string path = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/images/Container"), imgToUpload.FileName);
                upload.SaveAs(path);

                imgToUpload.Id = Guid.NewGuid();
                imgToUpload.ArticleId = articleIdentifier;
                imgToUpload.ImagePath = path;
                imgToUpload.FileSize = upload.ContentLength;
                imgToUpload.FileFormat = upload.ContentType;
                imgToUpload.OriginalWidth = 200;
                imgToUpload.OriginalHeight = 200;
                imgToUpload.DateOfChange = DateTime.Now;
                
            }
            db.Images.Add(imgToUpload);
            db.SaveChanges();
        }

        public Images GetImageByArticleId(Guid articleId) {
            var image = new Images();
            try {
                image = db.Images.First(x => x.ArticleId == articleId);
                if (image != null) {
                    return image;
                }
                return null;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public string GetImageRelativePathByArticleId(Guid articleId) {
            var image = this.GetImageByArticleId(articleId);
            if (image != null) {
                var relative = string.Format("~/Content/images/Container/{0}", image.FileName);
                return relative;
            }
            return "deafult.jpg";
        }

        public void DeleteImageForGivenArticle(Guid articleId) {
            var imageToDelete = db.Images.First(x => x.ArticleId == articleId);
            db.Images.Remove(imageToDelete);
            db.SaveChanges();
        }

        public void ChangeArticleCategoryIfCategoryDeleted(Guid categoryId, bool isMainCategory) {
            List<Articles> allArticlesWithDeletedCategory;
            if (isMainCategory) {
                allArticlesWithDeletedCategory = db.Articles.Where(x => x.CategoryId == categoryId).ToList();
            }
            else {
                allArticlesWithDeletedCategory = db.Articles.Where(x => x.SubCategoryId == categoryId).ToList();
            }
            if (allArticlesWithDeletedCategory.Count() > 0) {
                foreach (var item in allArticlesWithDeletedCategory) {
                    if (isMainCategory) {
                        item.CategoryId = this.GetAllCategories().First(x => x.Name == "Misc").Id;
                    }
                    else {
                        item.CategoryId = this.GetAllSubCategories().First(x => x.Name == "Misc").Id;
                    }
                    db.Entry(item).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
        }

        public List<Articles> GetRandomArticlesForSideBar(int numberOfArticles, Guid? articleId) {
            var articleList = db.Articles.Where(x=>x.IsPublished).ToList();
            if (articleId != Guid.Empty) {
                var artToDelete = articleList.First(x => x.Id == articleId.Value);
                articleList.Remove(artToDelete);
            }
            Random rnd = new Random();
            var randomList = articleList.OrderBy(x => rnd.Next()).Take(numberOfArticles);
            return randomList.ToList();
        }

        public List<Articles> GetLastArticlesFromCategory(int numberOfArticles, Guid categoryId, Guid articleId) {
            var articlesFromCategory = new List<Articles>();
            articlesFromCategory = db.Articles.Where(x => x.CategoryId == categoryId && x.IsPublished).OrderByDescending(x => x.DateCreated).ToList();
            if (articleId != Guid.Empty){
                var artToDelete = articlesFromCategory.First(x => x.Id == articleId);
                articlesFromCategory.Remove(artToDelete);
            }
            if (articlesFromCategory.Count() >= numberOfArticles) {
                articlesFromCategory = articlesFromCategory.Take(numberOfArticles).ToList();
            }
            return articlesFromCategory;
        }
    }
}