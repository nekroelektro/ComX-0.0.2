using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Helpers {
    public class ArticleHelper {
        private readonly SiteDbContext db = new SiteDbContext();

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

        public ArticleCategories GetCategoryById(Guid id) {
            var category = db.Categories.Find(id);
            return category;
        }

        public List<SelectListItem> GetCategoriesToCombo() {
            var categoryList = new List<ArticleCategories>();
            var listItems = new List<SelectListItem>();

            categoryList = db.Categories.ToList();
            foreach (var item in categoryList) {
                listItems.Add(new SelectListItem {
                    Text = item.Name,
                    Value = item.Id.ToString()
                });
            }
            return listItems;
        }
    }
}