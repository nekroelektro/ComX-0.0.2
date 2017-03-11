using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Configuration.Services {
    public class ConfigurationService : IConfigurationService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public void DeleteSelectedGalleryImages(string[] list) {
            foreach (var item in list) {
                var imageToDelete = db.ImagesGallery.Find(new Guid(item));
                if (File.Exists(imageToDelete.ImagePath)) {
                    File.Delete(imageToDelete.ImagePath);
                }
                db.ImagesGallery.Remove(imageToDelete);
                db.SaveChanges();
            }
        }

        public List<ArticleDto> GetConfigurationArticlesDetails() {
            var details = new List<ArticleDto>();
            var articles = db.Articles.ToList();
            foreach (var article in articles) {
                var articleElement = new ArticleDto {
                    Id = article.Id,
                    IsPublished = article.IsPublished,
                    Name = article.Name,
                    DateOfCreation = article.DateCreated,
                    Category = articleHelper.GetCategoryById(article.CategoryId).Name,
                    Subcategory = articleHelper.GetSubCategoryById(article.SubCategoryId).Name,
                    UserId = article.UserId,
                    IsDiary = false
                };
                details.Add(articleElement);
            }

            var diaries = db.Diary.ToList();
            foreach (var diary in diaries) {
                var diaryElement = new ArticleDto {
                    Id = diary.Id,
                    IsPublished = diary.IsPublished,
                    Name = diary.Name,
                    DateOfCreation = diary.DateCreated,
                    UserId = diary.UserId,
                    IsDiary = true
                };
                details.Add(diaryElement);
            }
            return details.OrderByDescending(x=>x.DateOfCreation).ToList();
        }
    }
}