using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Articles.Models.DtoModels;
using ComX_0._0._2.Views.Configuration.Models;

namespace ComX_0._0._2.Views.Articles.Services {
    public class DocumentService : IDocumentService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public void CreateDocument(CreateModelDto document, HttpPostedFileBase upload) {
            var documentIdentifier = Guid.NewGuid();
            if (upload != null) {
                UploadImageForArticle(documentIdentifier, upload, document.IsDiary);
            }
            if (document.IsDiary) {
                var diaryObject = new Diary {
                    Id = documentIdentifier,
                    Name = document.Name,
                    Body = document.Body,
                    DateCreated = DateTime.Now,
                    Label = document.Label,
                    ReleaseYear = Convert.ToInt32(document.ReleaseYear),
                    AlbumYear = Convert.ToInt32(document.AlbumYear),
                    Genre = document.Genre,
                    CatalogueNumber = document.CatalogueNumber,
                    IsPublished = document.IsPublished,
                    UserId = userHelper.GetCurrentLoggedUserId()
                };
                db.Diary.Add(diaryObject);
            }
            else {
                var articleObject = new Models.Articles {
                    Id = documentIdentifier,
                    Name = document.Name,
                    IndexDescription = document.IndexDescription,
                    Prelude = document.Prelude,
                    Body = document.Body,
                    CategoryId = document.CategoryId.Value,
                    SubCategoryId = document.SubCategoryId.Value,
                    Series = document.Series.Value,
                    DateCreated = DateTime.Now,
                    DateEdited = DateTime.Now,
                    UserId = userHelper.GetCurrentLoggedUserId()
                };
                db.Articles.Add(articleObject);
            }
            db.SaveChanges();
        }

        public CreateModelDto GetDocumentForEdit(Guid id, bool isDiary) {
            var document = new CreateModelDto();
            if (isDiary) {
                var diary = db.Diary.Find(id);
                document.Id = diary.Id;
                document.Name = diary.Name;
                document.Body = diary.Body;
                document.IsDiary = true;
                document.AlbumYear = diary.AlbumYear;
                document.ReleaseYear = diary.ReleaseYear;
                document.DateCreated = diary.DateCreated;
                document.Genre = diary.Genre;
                document.Label = diary.Label;
                document.IsPublished = diary.IsPublished;
                document.CatalogueNumber = diary.CatalogueNumber;
                document.UserId = diary.UserId;
            }
            else {
                var article = db.Articles.Find(id);
                document.Id = article.Id;
                document.Name = article.Name;
                document.Body = article.Body;
                document.IsDiary = false;
                document.DateCreated = article.DateCreated;
                document.IsPublished = article.IsPublished;
                document.UserId = article.UserId;
                document.Prelude = document.Prelude;
                document.IndexDescription = document.IndexDescription;
                document.DateEdited = document.DateEdited;
                document.CategoryId = document.CategoryId;
                document.SubCategoryId = document.SubCategoryId;
                document.Series = document.Series;
            }
            return document;
        }

        public void UpdateDocument(CreateModelDto document, HttpPostedFileBase upload) {
            if (upload != null) {
                UploadImageForArticle(document.Id, upload, document.IsDiary);
            }
            if (document.IsDiary) {
                var entity = db.Diary.Where(c => c.Id == document.Id).AsQueryable().FirstOrDefault();
                if (entity != null) {
                    entity.Name = document.Name;
                    entity.Body = document.Body;
                    entity.AlbumYear = document.AlbumYear.Value;
                    entity.CatalogueNumber = document.CatalogueNumber;
                    entity.Genre = document.Genre;
                    entity.ReleaseYear = document.ReleaseYear.Value;
                    entity.Label = document.Label;
                    if (entity.IsPublished != document.IsPublished) {
                        entity.IsPublished = document.IsPublished;
                        entity.DateCreated = DateTime.Now;
                    }
                }
                db.Entry(entity).State = EntityState.Modified;
            }
            else {
                var entity = db.Articles.Where(c => c.Id == document.Id).AsQueryable().FirstOrDefault();
                if (entity != null) {
                    entity.Name = document.Name;
                    entity.Body = document.Body;
                    entity.Prelude = document.Prelude;
                    entity.DateEdited = DateTime.Now;
                    entity.CategoryId = document.CategoryId.Value;
                    entity.SubCategoryId = document.SubCategoryId.Value;
                    entity.Series = document.Series.Value;
                    entity.IndexDescription = document.IndexDescription;
                    if (entity.IsPublished != document.IsPublished) {
                        entity.IsPublished = document.IsPublished;
                        entity.DateCreated = DateTime.Now;
                    }
                }
                db.Entry(entity).State = EntityState.Modified;
            }
            db.SaveChanges();
        }

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

        public DocumentModelDto GetDocument(Guid id, bool isDiary) {
            var document = new DocumentModelDto();
            if (isDiary) {
                var diary = db.Diary.Find(id);
                document.Id = diary.Id;
                document.Name = diary.Name;
                document.DateCreated = diary.DateCreated;
                document.IsDiary = true;
            }
            else {
                var article = db.Articles.Find(id);
                document.Id = article.Id;
                document.Name = article.Name;
                document.DateCreated = article.DateCreated;
                document.IsDiary = false;
            }
            return document;
        }

        public void DeleteDocument(Guid id, bool isDiary) {
            if (isDiary) {
                db.Diary.Remove(db.Diary.Find(id));
            }
            else {
                db.Articles.Remove(db.Articles.Find(id));
            }
            db.SaveChanges();
        }

        public void UploadImageForArticle(Guid articleIdentifier, HttpPostedFileBase upload, bool isDiary) {
            var imgToUpload = new Images();
            if (upload != null) {
                imgToUpload.FileName = generalHelper.GenerateRandomNumber() + "_" + upload.FileName;
                var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/images/Container"),
                    imgToUpload.FileName);
                upload.SaveAs(path);

                imgToUpload.Id = Guid.NewGuid();
                imgToUpload.ArticleId = articleIdentifier;
                imgToUpload.ImagePath = path;
                imgToUpload.FileSize = upload.ContentLength;
                imgToUpload.FileFormat = upload.ContentType;
                imgToUpload.OriginalWidth = 200;
                imgToUpload.OriginalHeight = 200;
                imgToUpload.DateOfChange = DateTime.Now;
                imgToUpload.IsDiary = isDiary;
            }
            db.Images.Add(imgToUpload);
            db.SaveChanges();
        }

        public void UploadImageForGallery(HttpPostedFileBase upload) {
            var imgToUpload = new ImagesGallery();
            if (upload != null) {
                imgToUpload.Name = generalHelper.GenerateRandomNumber() + "_" + upload.FileName;
                var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/images/Gallery"), imgToUpload.Name);
                upload.SaveAs(path);

                imgToUpload.Id = Guid.NewGuid();
                imgToUpload.ImagePath = path;
                imgToUpload.DateOfCreation = DateTime.Now;
            }
            db.ImagesGallery.Add(imgToUpload);
            db.SaveChanges();
        }

        private List<IndexModelDto> GetIndexDocuments(bool onlyArticles, int number) {
            var articles =
                (number == 0
                    ? db.Articles.Where(x => x.IsPublished)
                    : db.Articles.Where(x => x.IsPublished).Take(number)).OrderByDescending(x => x.DateCreated).ToList();
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
                var diary =
                    (number == 0 ? db.Diary.Where(x => x.IsPublished) : db.Diary.Where(x => x.IsPublished).Take(number))
                        .OrderByDescending(x => x.DateCreated).ToList();
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
                documentObject.Name = diary.Name;
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

        public void DeleteImageForGivenDocument(Guid id){
            var imageToDelete = db.Images.First(x => x.ArticleId == id);
            if (File.Exists(imageToDelete.ImagePath)) {
                File.Delete(imageToDelete.ImagePath);
            }
            db.Images.Remove(imageToDelete);
            db.SaveChanges();
        }
    }
}