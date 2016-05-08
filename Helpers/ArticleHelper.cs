﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Database;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Helpers {
    public class ArticleHelper {
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();

        public List<Articles> GetLastArticles(int number) {
            var articles = db.Articles.OrderByDescending(x => x.DateCreated).Take(number);
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

        public List<Comments> GetCommentsByArticle(Guid id) {
            var comments = db.Comments.Where(x => x.ArticleId == id);
            return comments.OrderByDescending(x => x.DateOfCreation).ToList();
        }

        public List<Comments> GetCommentsByUser(Guid id) {
            var comments = db.Comments.Where(x => x.UserId == id);
            return comments.ToList();
        }

        public void UploadImageForArticle(Guid articleIdentifier, HttpPostedFileBase upload) {
            var imgToUpload = new Images();
            if (upload != null) {
                using (var img = Image.FromStream(upload.InputStream)) {
                    var file = new byte[upload.InputStream.Length];
                    var reader = new BinaryReader(upload.InputStream);
                    upload.InputStream.Seek(0, SeekOrigin.Begin);

                    file = reader.ReadBytes((int) upload.InputStream.Length);

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
            db.Images.Add(imgToUpload);
            db.SaveChanges();
        }

        public Images GetImageByArticleId(Guid articleId) {
            var image = new Images();
            try {
                image = db.Images.First(x => x.ArticleId == articleId);
                return image;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public void DeleteImageForGivenArticle(Guid articleId) {
            var imageToDelete = db.Images.First(x => x.ArticleId == articleId);
            db.Images.Remove(imageToDelete);
            db.SaveChanges();
        }

        public void GetNextCoupleArticlesForIndex() {
            var listOfArticles = db.Articles.OrderByDescending(x => x.DateCreated).ToList();
        }
    }
}