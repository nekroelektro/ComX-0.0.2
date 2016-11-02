using System;
using System.Collections.Generic;
using System.Linq;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Articles.Services {
    public class ArticleService : IArticleService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();

        public DetailsModelDto GetDocumentForDetails(string name, bool isDiary, bool isDetailPanel) {
            var documentObject = new DetailsModelDto();
            if (isDiary) {
                var diary = db.Diary.First(x => x.Name == name);
                documentObject = GetDiary(documentObject, diary, isDetailPanel);
            }
            else {
                var article = db.Articles.First(x => x.Name == name);
                documentObject = GetArticle(documentObject, article, isDetailPanel);
            }
            return documentObject;
        }

        public List<IndexModelDto> GetDocumentForIndex(bool onlyArticles, int number = 0) {
            var documents = GetIndexDocuments(onlyArticles, number);
            return documents;
        }

        private List<IndexModelDto> GetIndexDocuments(bool onlyArticles, int number) {
            var articles = (number == 0 ? db.Articles.Where(x => x.IsPublished) : db.Articles.Where(x=>x.IsPublished).Take(number)).OrderByDescending(x=>x.DateCreated).ToList();
            var documents = articles.Select(item => new IndexModelDto {
                Id = item.Id,
                Name = item.Name,
                IndexPrologue = item.IndexDescription,
                Prologue = item.Prelude,
                DateCreation = item.DateCreated,
                Series = item.Series,
                Categories = item.CategoryId,
                SubCategories = item.SubCategoryId,
                UserId = item.UserId,
                IsDiary = false,
                IsPublished = item.IsPublished
            }).ToList();
            if (!onlyArticles) {
                var diary = (number == 0 ? db.Diary.Where(x => x.IsPublished) : db.Diary.Where(x=>x.IsPublished).Take(number)).OrderByDescending(x=>x.DateCreated).ToList();
                documents.AddRange(diary.Select(item => new IndexModelDto {
                    Id = item.Id,
                    Name = item.Name,
                    DateCreation = item.DateCreated,
                    UserId = item.UserId,
                    IsDiary = true,
                    IsPublished = item.IsPublished
                }));
            }
            return documents.OrderByDescending(x => x.DateCreation).ToList();
        }

        private DetailsModelDto GetDiary(DetailsModelDto documentObject, Diary diary, bool isDetailPanel) {
            if (!isDetailPanel) {
                documentObject.Id = diary.Id;
                documentObject.Body = diary.Body;
                documentObject.IsDiary = true;
                documentObject.AlbumYear = diary.AlbumYear;
                documentObject.ReleaseYear = diary.ReleaseYear;
                documentObject.CatalogueNumber = diary.CatalogueNumber;
                documentObject.Label = diary.Label;
                documentObject.Genre = diary.Genre;
            }
            else {
                documentObject.Id = diary.Id;
                documentObject.Name = diary.Name;
                documentObject.IsDiary = true;
                documentObject.UserId = diary.UserId;
                documentObject.DateCreated = diary.DateCreated;
                documentObject.Series = new Guid("d86d5afe-93c9-4562-a577-4273ecdb1a58");
            }
            return documentObject;
        }

        private DetailsModelDto GetArticle(DetailsModelDto documentObject, Models.Articles article, bool isDetailPanel) {
            if (!isDetailPanel) {
                documentObject.Id = article.Id;
                documentObject.Name = article.Name;
                documentObject.Body = article.Body;
                documentObject.IndexDescription = article.IndexDescription;
                documentObject.CategoryId = article.CategoryId;
                documentObject.Prelude = article.Prelude;
                documentObject.IsDiary = false;
            }
            else {
                documentObject.Id = article.Id;
                documentObject.Name = article.Name;
                documentObject.CategoryId = article.CategoryId;
                documentObject.SubCategoryId = article.SubCategoryId;
                documentObject.UserId = article.UserId;
                documentObject.DateCreated = article.DateCreated;
                documentObject.Series = article.Series;
                documentObject.IsDiary = false;
            }
            return documentObject;
        }
    }
}