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
            if (upload != null) UploadImageForArticle(documentIdentifier, upload, document.IsDiary);
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
                    IsPublished = document.IsPublished,
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
                document.Prelude = article.Prelude;
                document.IndexDescription = article.IndexDescription;
                document.DateEdited = article.DateEdited;
                document.CategoryId = article.CategoryId;
                document.SubCategoryId = article.SubCategoryId;
                document.Series = article.Series;
            }
            return document;
        }

        public void UpdateDocument(CreateModelDto document, HttpPostedFileBase upload) {
            if (upload != null) UploadImageForArticle(document.Id, upload, document.IsDiary);
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

        public List<IndexModelDto> GetDocumentForIndex(bool onlyArticles, int number = 0, bool isConfiguration = false) {
            var documents = GetIndexDocuments(onlyArticles, number, isConfiguration);
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

        public List<DocumentModelDto> GetDiaries() {
            var diariesList = new List<DocumentModelDto>();
            var diaries = db.Diary.Where(x => x.IsPublished).ToList();
            foreach (var diary in diaries) {
                var document = new DocumentModelDto();
                document.Id = diary.Id;
                document.Name = diary.Name;
                document.DateCreated = diary.DateCreated;
                document.IsDiary = true;
                diariesList.Add(document);
            }
            return diariesList;
        }

        public void DeleteDocument(Guid id, bool isDiary) {
            if (isDiary) db.Diary.Remove(db.Diary.Find(id));
            else db.Articles.Remove(db.Articles.Find(id));
            DeleteImageForGivenDocument(id);
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

        public void DeleteImageForGivenDocument(Guid id) {
            var imageToDelete = db.Images.FirstOrDefault(x => x.ArticleId == id);
            if (imageToDelete != null && File.Exists(imageToDelete.ImagePath)) {
                File.Delete(imageToDelete.ImagePath);
                db.Images.Remove(imageToDelete);
            }
            db.SaveChanges();
        }

        public List<CommentModelDto> GetCommentsForDocument(Guid articleId) {
            var commentList = new List<CommentModelDto>();
            var document = db.Comments.Where(x => x.ArticleId == articleId);
            foreach (var item in document) {
                var comment = new CommentModelDto {
                    Id = item.Id,
                    Body = item.Body,
                    UserId = item.UserId,
                    DateCreated = item.DateOfCreation,
                    ArticleId = item.ArticleId,
                    IsDiary = item.IsDiary
                };
                commentList.Add(comment);
            }
            if (commentList.Count > 0) commentList.OrderByDescending(x => x.DateCreated).ToList();
            return commentList;
        }

        public CommentModelDto GetCommentDetails(Guid commentId) {
            var comment = new CommentModelDto();
            var document = db.Comments.Find(commentId);
            if (document != null)
                comment = new CommentModelDto {
                    Id = document.Id,
                    Body = document.Body,
                    UserId = document.UserId,
                    DateCreated = document.DateOfCreation,
                    ArticleId = document.ArticleId,
                    IsDiary = document.IsDiary
                };
            return comment;
        }

        public void CreateComment(string body, Guid articleId, bool isDiary) {
            var newComment = new Comments {
                Id = Guid.NewGuid(),
                Body = body,
                UserId = userHelper.GetCurrentLoggedUserId(),
                ArticleId = articleId,
                DateOfCreation = DateTime.Now,
                IsDiary = isDiary
            };
            db.Comments.Add(newComment);
            db.SaveChanges();
        }

        public void UpdateComment(string body, Guid commentId) {
            var entity = db.Comments.Where(c => c.Id == commentId).AsQueryable().FirstOrDefault();
            if (entity != null) entity.Body = body;
            db.Entry(entity).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void DeleteComment(Guid commentId) {
            var comment = db.Comments.Find(commentId);
            db.Comments.Remove(comment);
            db.SaveChanges();
        }

        public List<CommentModelDto> GetComments(int? number) {
            List<Comments> comments;
            comments = number != null
                ? db.Comments.OrderByDescending(x => x.DateOfCreation).Take(number.Value).ToList()
                : db.Comments.ToList();

            return comments.Select(comment => new CommentModelDto {
                Id = comment.Id,
                Body = comment.Body,
                UserId = comment.UserId,
                DateCreated = comment.DateOfCreation,
                ArticleId = comment.ArticleId,
                IsDiary = comment.IsDiary
            }).ToList();
        }

        public SideBarDetailsDto GetSideBarDetails(int? numberOfComments) {
            var details = new SideBarDetailsDto();
            details.PlazlistName = generalHelper.GetSettings().ListName;
            details.PlazlistCode = generalHelper.GetSettings().Playlist;

            // Fetches last comments for sidebar
            var comments = numberOfComments != null
                ? db.Comments.OrderByDescending(x => x.DateOfCreation).Take(numberOfComments.Value).ToList()
                : db.Comments.ToList();
            var commentList = new List<IndexCommentModelDto>();
            foreach (var item in comments) {
                var comment = new IndexCommentModelDto {
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    ArticleName = GetArticleName(item.ArticleId),
                    ArticleCodedName = generalHelper.RemoveSpecialCharsFromString(GetArticleName(item.ArticleId)),
                    isDiary = item.IsDiary
                };
                commentList.Add(comment);
            }
            details.Comments = commentList;

            // Fetches random posts for sidebar
            var rnd = new Random();
            // This is shit, cause it fetches all articles at first step, but in other way there is such error:
            // LINQ to Entities does not recognize the method 'Int32 Next()' method, and this method cannot be translated into a store expression.
            var articleList = db.Articles.Where(x => x.IsPublished).ToList();
            var randomList = articleList.OrderBy(x => rnd.Next()).Take(5); // for now number of posts is fixed
            var postList = new List<ArticleDto>();
            foreach (var item in randomList) {
                var article = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    Body = item.IndexDescription,
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id)
                };
                postList.Add(article);
            }
            details.RandomPosts = postList;

            return details;
        }

        public List<ArticleDto> GetSliderDetails() {
            var articleList =
                db.Articles.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).Take(4).ToList();
            // Fixed number of articles for slider
            var postList = new List<ArticleDto>();
            foreach (var item in articleList) {
                var article = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id),
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    Date = item.DateCreated.ToLongDateString(),
                    Category = articleHelper.GetCategoryById(item.CategoryId).Name,
                    Subcategory = articleHelper.GetSubCategoryById(item.SubCategoryId).Name,
                    Series =
                        articleHelper.GetSeriesById(item.Series).Name != "Default"
                            ? articleHelper.GetSeriesById(item.Series).Name
                            : null
                };
                postList.Add(article);
            }
            return postList;
        }

        public IndexMainDto GetIndexDetails() {
            var details = new IndexMainDto();
            var articleList =
                db.Articles.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).ToList();

            var reviewList = new List<IndexReviewsDto>();
            foreach (
                var item in
                articleList.Where(
                    x =>
                        x.CategoryId == articleHelper.GetCategoryByName("Recenzje").Id &&
                        x.SubCategoryId == articleHelper.GetSubCategoryByName("Muzyka").Id).Take(6).ToList()) {
                var review = new IndexReviewsDto {
                    Name = item.Name,
                    Code = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id)
                };
                reviewList.Add(review);
            }
            details.Reviews = reviewList;

            var postList = new List<ArticleDto>();
            // Cut first 4 articles (they are on slider)
            var posts = articleList;
            for (var i = 0; i < 4; i++) posts.RemoveAt(0);
            foreach (var item in posts) {
                var article = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    Body = item.IndexDescription,
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id),
                    Category = articleHelper.GetCategoryById(item.CategoryId).Name,
                    Subcategory = articleHelper.GetSubCategoryById(item.SubCategoryId).Name
                };
                postList.Add(article);
            }
            details.Articles = postList;

            var diaries = db.Diary.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).Take(5).ToList();
            var diaryList = new List<IndexDiaryDto>();
            foreach (var item in diaries) {
                var diary = new IndexDiaryDto {
                    Name = item.Name,
                    Code = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id)
                };
                diaryList.Add(diary);
            }
            details.Diaries = diaryList;

            return details;
        }

        public ArticleDto GetArticleDetails(string name, bool isDiary) {
            var documentName = generalHelper.AddSpecialCharsForString(name);
            var details = new ArticleDto();

            if (isDiary) {
                var article = db.Diary.First(x => x.Name == documentName);
                details.Id = article.Id;
                details.CodedName = generalHelper.RemoveSpecialCharsFromString(article.Name);
                details.Name = "# " + article.Name;
                details.Body = article.Body;
                details.Date = article.DateCreated.ToLongDateString();
                details.UserName = userHelper.GetUserById(article.UserId).UserName;
                details.ImageUrl = articleHelper.GetImageRelativePathByArticleId(article.Id);

                details.AlbumYear = article.AlbumYear.ToString();
                details.ReleaseYear = article.ReleaseYear.ToString();
                details.Label = article.Label;
                details.CatalogueNumber = article.CatalogueNumber;
                details.Genre = article.Genre;
                details.Series = "Z pamiętnika płytoholika";

                details.IsDiary = true;
                return details;
            }

            var articleModel = db.Articles.First(x => x.Name == documentName);
            details.Id = articleModel.Id;
            details.CodedName = generalHelper.RemoveSpecialCharsFromString(articleModel.Name);
            details.Name = articleModel.Name;
            details.Body = articleModel.Body;
            details.Date = articleModel.DateCreated.ToLongDateString();
            details.UserName = userHelper.GetUserById(articleModel.UserId).UserName;
            details.ImageUrl = articleHelper.GetImageRelativePathByArticleId(articleModel.Id);

            details.Category = articleHelper.GetCategoryById(articleModel.CategoryId).Name;
            details.Subcategory = articleHelper.GetSubCategoryById(articleModel.SubCategoryId).Name;
            details.Prelude = articleModel.Prelude;
            details.IndexDescription = articleModel.IndexDescription;
            details.Series = articleHelper.GetSeriesById(articleModel.Series).Name != "Default"
                ? articleHelper.GetSeriesById(articleModel.Series).Name
                : null;

            details.IsDiary = false;
            return details;
        }

        public LastFromCategoryDto GetLastFromCategoryDetails(string name, Guid id) {
            var details = new LastFromCategoryDto();
            details.CategoryName = name;
            var categoryId = articleHelper.GetCategoryByName(name).Id;
            var articleList = new List<ArticleDto>();
            var categoryElements =
                db.Articles.Where(x => x.CategoryId == categoryId && x.Id != id && x.IsPublished)
                    .OrderByDescending(x => x.DateCreated)
                    .Take(4)
                    .ToList();
            foreach (var item in categoryElements) {
                var element = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id)
                };
                articleList.Add(element);
            }
            details.Articles = articleList;

            return details;
        }

        public CommentDetailsDto GetCommentsDetails(Guid articleId, bool isDiary) {
            var details = new CommentDetailsDto();
            var commentList =
                db.Comments.Where(x => x.ArticleId == articleId).OrderByDescending(x => x.DateOfCreation).ToList();
            var comments = new List<CommentDto>();
            foreach (var item in commentList) {
                var element = new CommentDto {
                    Id = item.Id,
                    Body = item.Body,
                    ArticleId = articleId,
                    UserId = item.UserId,
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    Date = item.DateOfCreation.ToLongDateString(),
                    IsDiary = item.IsDiary,
                    IsEditable = IsCommentEditable(item.UserId)
                };
                comments.Add(element);
            }
            details.Comments = comments;
            details.Comment = new CommentDto();
            details.ArticleId = articleId;
            details.IsDiary = isDiary;
            return details;
        }

        public List<IndexDiaryDto> GetDiariesDetails() {
            var details = new List<IndexDiaryDto>();
            var diaries = db.Diary.OrderByDescending(x => x.DateCreated).ToList();
            foreach (var item in diaries) {
                var diary = new IndexDiaryDto {
                    Name = item.Name,
                    Code = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id)
                };
                details.Add(diary);
            }
            return details;
        }

        public List<CategoryDto> GetNavigationDetails() {
            var details = new List<CategoryDto>();

            var categories = db.Categories.OrderByDescending(x=>x.SortCode).ToList();
            var posts = db.Articles.ToList();
            foreach (var item in categories) {
                var category = new CategoryDto();
                var postsFromCategory =
                    posts.Where(x => x.CategoryId == item.Id && x.IsPublished)
                        .OrderByDescending(x => x.DateCreated)
                        .ToList();
                var postList = new List<ArticleDto>();
                foreach (var post in postsFromCategory) {
                    var element = new ArticleDto {
                        Id = post.Id,
                        Name = post.Name,
                        CodedName = generalHelper.RemoveSpecialCharsFromString(post.Name),
                        ImageUrl = articleHelper.GetImageRelativePathByArticleId(post.Id),
                        Subcategory = articleHelper.GetSubCategoryById(post.SubCategoryId).Name
                    };
                    postList.Add(element);
                }
                category.CategoryPosts = postList;
                category.CategoryName = item.Name;
                category.Subcategories = category.CategoryPosts.Select(x => x.Subcategory).Distinct().ToList();

                details.Add(category);
            }
            var diaryCategory = details.First(x => x.CategoryName == "Pamiętnik");
            foreach (var diary in db.Diary.OrderByDescending(x => x.DateCreated)) {
                var diaryElement = new ArticleDto {
                    Id = diary.Id,
                    Name = diary.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(diary.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(diary.Id)
                };
                diaryCategory.CategoryPosts.Add(diaryElement);
            }
            return details;
        }

        private string GetArticleName(Guid id) {
            var name = db.Articles.Where(x => x.Id == id).Select(x => x.Name).Single();
            return name;
        }

        private bool IsCommentEditable(Guid commentAuthorId) {
            var currentUser = userHelper.GetCurrentLoggedUserId();
            return currentUser != Guid.Empty &&
                   (commentAuthorId == currentUser || userHelper.UserIsSuperAdmin(currentUser));
        }

        private List<IndexModelDto> GetIndexDocuments(bool onlyArticles, int number, bool isConfiguration) {
            var articles = new List<Models.Articles>();
            if (isConfiguration) articles = db.Articles.ToList();
            else
                articles =
                    (number == 0
                        ? db.Articles.Where(x => x.IsPublished)
                        : db.Articles.Where(x => x.IsPublished).Take(number)).OrderByDescending(x => x.DateCreated)
                    .ToList();
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
                var diary = new List<Diary>();
                if (isConfiguration) diary = db.Diary.ToList();
                else
                    diary =
                        (number == 0
                            ? db.Diary.Where(x => x.IsPublished)
                            : db.Diary.Where(x => x.IsPublished).Take(number))
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
    }
}