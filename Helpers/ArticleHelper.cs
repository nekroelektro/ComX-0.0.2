using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;
using ComX_0._0._2.Views.Configuration.Models;

namespace ComX_0._0._2.Helpers {
    public class ArticleHelper {
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();

        public List<Articles> GetLastArticles(int number) {
            var articles = db.Articles.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).Take(number);
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

        public List<Articles> GetArticlesBySubCategory(Guid id) {
            var articles = db.Articles.Where(x => x.SubCategoryId == id).ToList();
            return articles;
        }

        public Articles GetArticleByName(string name) {
            var article = db.Articles.First(x => x.Name == name);
            return article;
        }

        public ArticleCategories GetCategoryById(Guid id) {
            try {
                var category = db.Categories.Find(id);
                return category;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public ArticleCategories GetCategoryByName(string name) {
            try {
                var category = db.Categories.First(x => x.Name == name);
                return category;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public ArticleSubCategories GetSubCategoryByName(string name) {
            try{
                var category = db.SubCategories.First(x => x.Name == name);
                return category;
            }
            catch (Exception ex){
                return null;
            }
        }

        public ArticleSubCategories GetSubCategoryById(Guid id) {
            var category = db.SubCategories.Find(id);
            return category;
        }

        public List<ArticleCategories> GetAllCategories() {
            var categories = db.Categories.OrderByDescending(x => x.SortCode).ToList();
            return categories;
        }

        public List<ArticleSubCategories> GetAllSubCategories() {
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
                Text = item.Name,
                Value = item.Id.ToString()
            }).ToList();
        }

        public List<SelectListItem> GetSubCategoriesToCombo() {
            var categoryList = new List<ArticleSubCategories>();

            categoryList = db.SubCategories.ToList();
            return categoryList.Select(item => new SelectListItem {
                Text = item.Name,
                Value = item.Id.ToString()
            }).ToList();
        }

        public List<SelectListItem> GetSeriesToCombo() {
            var categoryList = new List<Series>();

            categoryList = db.Series.ToList();
            return categoryList.Select(item => new SelectListItem {
                Text = item.Name,
                Value = item.Id.ToString()
            }).ToList();
        }

        public void ChangeCategoryDetails(ArticleCategories category) {
            var categoryToChange = GetCategoryById(category.Id);
            categoryToChange.Name = category.Name;
            categoryToChange.Description = category.Description;
            categoryToChange.SortCode = category.SortCode;
            db.Entry(categoryToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void ChangeSubCategoryDetails(ArticleSubCategories category) {
            var categoryToChange = db.SubCategories.Find(category.Id);
            categoryToChange.Name = category.Name;
            categoryToChange.Description = category.Description;
            categoryToChange.SortCode = category.SortCode;
            db.Entry(categoryToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void ChangeSeriesDetails(ArticleSubCategories category) {
            var categoryToChange = db.Series.Find(category.Id);
            categoryToChange.Name = category.Name;
            categoryToChange.Description = category.Description;
            categoryToChange.SortCode = category.SortCode;
            db.Entry(categoryToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        public List<Comments> GetCommentsByArticle(Guid id) {
            var comments = new List<Comments>();
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

        public List<Comments> GetLastComments(int numberOfComments) {
            var comments = db.Comments.OrderByDescending(x => x.DateOfCreation).Take(numberOfComments).ToList();
            return comments;
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
            var image = GetImageByArticleId(articleId);
            if (image != null) {
                var relative = string.Format("~/Content/images/Container/{0}", image.FileName);
                return relative;
            }
            return "deafult.jpg";
        }

        public string GetGalleryImageRelativePathByName(string name) {
            var relativePath = string.Format("~/Content/images/Gallery/{0}", name);
            return relativePath;
        }

        public string GetImageAbsolutePathByArticleId(Guid articleId) {
            var image = GetImageByArticleId(articleId);
            if (image != null) {
                var absolute = string.Format("http://" + "nekroplaza.pl/Content/images/Container/{0}", image.FileName);
                return absolute;
            }
            return "deafult.jpg";
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
                        item.CategoryId = GetAllCategories().First(x => x.Name == "Misc").Id;
                    }
                    else {
                        item.CategoryId = GetAllSubCategories().First(x => x.Name == "Misc").Id;
                    }
                    db.Entry(item).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
        }

        public void DeleteSeriesForArticles(Guid seriesId) {
            var allArticlesFromSelectedSeries = db.Articles.Where(x => x.Series == seriesId).ToList();
            foreach (var item in allArticlesFromSelectedSeries) {
                item.Series = Guid.Empty;
                db.Entry(item).State = EntityState.Modified;
            }
            db.SaveChanges();
        }

        public List<Articles> GetRandomArticlesForSideBar(int numberOfArticles, Guid? articleId) {
            var articleList = db.Articles.Where(x => x.IsPublished).ToList();
            //if (articleId != Guid.Empty) {
            //    var artToDelete = articleList.First(x => x.Id == articleId.Value);
            //    articleList.Remove(artToDelete);
            //}
            var rnd = new Random();
            var randomList = articleList.OrderBy(x => rnd.Next()).Take(numberOfArticles);
            return randomList.ToList();
        }

        public List<Articles> GetLastArticlesFromCategory(int numberOfArticles, Guid categoryId, Guid articleId) {
            var articlesFromCategory = db.Articles.Where(x => x.CategoryId == categoryId && x.IsPublished)
                .OrderByDescending(x => x.DateCreated)
                .ToList();
            if (articleId != Guid.Empty && articlesFromCategory.Count() != 0 && GetArticleById(articleId).IsPublished) {
                var artToDelete = articlesFromCategory.First(x => x.Id == articleId);
                articlesFromCategory.Remove(artToDelete);
            }
            if (articlesFromCategory.Count() >= numberOfArticles) {
                articlesFromCategory = articlesFromCategory.Take(numberOfArticles).ToList();
            }
            return articlesFromCategory;
        }

        public bool SubCategoryIsEmpty(Guid subId, Guid catId) {
            var articleList = db.Articles.Where(x => x.SubCategoryId == subId && x.CategoryId == catId).ToList();
            if (articleList.Count == 0) {
                return true;
            }
            return false;
        }

        public Series GetSeriesById(Guid seriesId) {
            var series = db.Series.Find(seriesId);
            return series;
        }

        public List<Articles> GetLastMusicReviews(int numberOfReviews) {
            var reviews = db.Articles.Where(
                x =>
                    x.CategoryId == new Guid("70beb869-0d4f-4744-9cfe-56232cf85906") &&
                    x.SubCategoryId == new Guid("2b0b214b-371d-4ba6-b420-16254bb05388") &&
                    x.IsPublished).OrderByDescending(x=>x.DateCreated).ToList();
            if (reviews.Count() >= numberOfReviews) {
                reviews = reviews.Take(numberOfReviews).ToList();
            }
            return reviews;
        }
    }
}