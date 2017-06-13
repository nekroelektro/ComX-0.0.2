using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
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
                document.UserId = userHelper.GetUserById(diary.UserId).UserName;
            }
            else {
                var article = db.Articles.Find(id);
                document.Id = article.Id;
                document.Name = article.Name;
                document.Body = article.Body;
                document.IsDiary = false;
                document.DateCreated = article.DateCreated;
                document.IsPublished = article.IsPublished;
                document.UserId = userHelper.GetUserById(article.UserId).UserName;
                document.Prelude = article.Prelude;
                document.IndexDescription = article.IndexDescription;
                document.DateEdited = article.DateEdited;
                document.CategoryId = articleHelper.GetCategoryById(article.CategoryId).Name;
                document.SubCategoryId = articleHelper.GetSubCategoryById(article.SubCategoryId).Name;
                document.Series = articleHelper.GetSeriesById(article.Series).Name;
            }
            return document;
        }

        public void UpdateDocument(CreateModelDto document) {
            if (document.File != null) UploadImageForArticle(document.Id, document.File, document.IsDiary);
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
                    entity.CategoryId = articleHelper.GetCategoryByName(document.CategoryId).Id;
                    entity.SubCategoryId = articleHelper.GetSubCategoryByName(document.SubCategoryId).Id;
                    entity.Series = articleHelper.GetSeriesByName(document.Series).Id;
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

        public void EditDocument(CreateModelDto document) {
            if (document.IsCreate) CreateDocument(document);
            else UpdateDocument(document);
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

        public EditDto GetEditDetails(bool createMode, bool isDiary, Guid? id) {
            var details = new EditDto();
            details.Document = createMode ? new CreateModelDto() : GetDocumentForEdit(id.Value, isDiary);

            // Populating edit comboboxes
            details.Categories = new List<List<SelectListItem>>();
            details.Categories.Add(articleHelper.GetCategoriesToCombo().OrderBy(x => x.Text).ToList());
            details.Categories.Add(articleHelper.GetSubCategoriesToCombo().OrderBy(x => x.Text).ToList());
            details.Categories.Add(articleHelper.GetSeriesToCombo().OrderBy(x => x.Text).ToList());

            details.ArticleImage = articleHelper.GetImageRelativePathByArticleId(id.Value);
            details.IsCreate = createMode;
            return details;
        }

        public SideBarDetailsDto GetSideBarDetails(int? numberOfComments) {
            var details = new SideBarDetailsDto();
            details.Profile = GetTopLogoDetails();
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
                    ArticleName = item.IsDiary ? GetDiaryName(item.ArticleId) : GetArticleName(item.ArticleId),
                    ArticleCodedName = generalHelper.RemoveSpecialCharsFromString(item.IsDiary
                        ? GetDiaryName(item.ArticleId) + "?isDiary=true"
                        : GetArticleName(item.ArticleId)),
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
            var randomList = articleList.OrderBy(x => rnd.Next()).Take(6); // for now number of posts is fixed
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
            var diaryList = db.Diary.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).Take(4).ToList();

            // Fixed number of articles for slider IT NEEDS TO BE REWRITED
            var postList = new List<ArticleDto>();
            foreach (var item in articleList) {
                var article = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id),
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    Date = item.DateCreated.ToLongDateString(),
                    DateHelper = item.DateCreated,
                    Category = articleHelper.GetCategoryById(item.CategoryId).Name,
                    Subcategory = articleHelper.GetSubCategoryById(item.SubCategoryId).Name,
                    Series =
                        articleHelper.GetSeriesById(item.Series).Name != "Default"
                            ? articleHelper.GetSeriesById(item.Series).Name
                            : null,
                    IsDiary = false
                };
                postList.Add(article);
            }

            foreach (var item in diaryList) {
                var article = new ArticleDto {
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name) + "?isDiary=true",
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id),
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    Date = item.DateCreated.ToLongDateString(),
                    DateHelper = item.DateCreated,
                    Series = "Z pamiętnika płytoholika",
                    IsDiary = true
                };
                postList.Add(article);
            }
            return postList.OrderByDescending(x => x.DateHelper).Take(4).ToList();
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
            for (var i = 0; i < 3; i++) posts.RemoveAt(0);
            foreach (var item in posts.Where(
                x =>
                    x.CategoryId != articleHelper.GetCategoryByName("Recenzje").Id)) {
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

            details.Subcategories = details.Articles.Select(x => x.Subcategory).Distinct().ToList();

            var diaries = db.Diary.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).Take(7).ToList();
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
                db.Comments.Where(x => x.ArticleId == articleId).OrderBy(x => x.DateOfCreation).ToList();

            var threadComments = CommentModelToDtoHelper(commentList.Where(x => x.Thread == x.Id).ToList(), articleId);
            var responseComments =
                CommentModelToDtoHelper(commentList.Where(x => x.Thread != x.Id).ToList(), articleId);

            //Find thread parent for response comment
            if (responseComments.Count > 0) {
                foreach (var response in responseComments){
                    threadComments.FirstOrDefault(x => x.Id == response.Thread).ResponseComments.Add(response);
                }
            }

            details.Comments = threadComments;
            details.Comment = new CommentDto();
            details.ArticleId = articleId;
            details.IsDiary = isDiary;
            details.CommentCount = threadComments.Count + responseComments.Count;
            return details;
        }

        public List<IndexDiaryDto> GetDiariesDetails() {
            var details = new List<IndexDiaryDto>();
            var diaries = db.Diary.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated).ToList();
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

            var categories = db.Categories.OrderByDescending(x => x.SortCode).ToList();
            foreach (var item in categories) details.Add(GetCategoryModelDto(item));
            var diaryCategory = details.First(x => x.CategoryName == "Pamiętnik");
            foreach (var diary in db.Diary.Where(x => x.IsPublished).OrderByDescending(x => x.DateCreated)) {
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

        public CategoryDto GetCategoryDetails(string id) {
            var model = db.Categories.First(x => x.Name == id);
            return GetCategoryModelDto(model);
        }

        public List<ArticleDto> GetSearchResult(string searchString) {
            var results = new List<ArticleDto>();
            var articlesSearch =
                db.Articles.Where(
                    x => x.IsPublished &&
                         (x.Name.Contains(searchString) || x.Body.Contains(searchString) ||
                          x.Prelude.Contains(searchString))).ToList();
            foreach (var item in articlesSearch) {
                var element = new ArticleDto {
                    Id = item.Id,
                    Name = item.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(item.Name),
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(item.Id),
                    Category = articleHelper.GetCategoryById(item.CategoryId).Name,
                    Subcategory = articleHelper.GetSubCategoryById(item.SubCategoryId).Name,
                    Date = item.DateCreated.ToLongDateString(),
                    SortCode = item.Name.ToLowerInvariant().Contains(searchString.ToLowerInvariant()) ? 1 : 2
                };
                results.Add(element);
            }

            var diariesSearch =
                db.Diary.Where(
                        x => x.IsPublished &&
                             (x.Name.Contains(searchString) || x.Body.Contains(searchString) ||
                              x.Label.Contains(searchString)))
                    .ToList();
            foreach (var diary in diariesSearch) {
                var diaryElement = new ArticleDto {
                    Id = diary.Id,
                    Name = diary.Name,
                    CodedName = generalHelper.RemoveSpecialCharsFromString(diary.Name) + "?isDiary=true",
                    ImageUrl = articleHelper.GetImageRelativePathByArticleId(diary.Id),
                    Category = "Pamiętnik",
                    Subcategory = "Pamiętnik",
                    Date = diary.DateCreated.ToLongDateString(),
                    SortCode = diary.Name.ToLowerInvariant().Contains(searchString.ToLowerInvariant()) ? 1 : 2
                };
                results.Add(diaryElement);
            }

            return results.OrderBy(x => x.SortCode).ThenBy(x => x.Name).ToList();
        }

        public SearchResultsDto GetSearchResultsDetails(string searchString) {
            var details = new SearchResultsDto();
            details.SearchString = searchString;
            details.SearchPosts = GetSearchResult(searchString);
            details.Subcategories = details.SearchPosts.Select(x => x.Subcategory).Distinct().ToList();
            return details;
        }

        public TopLogoDto GetTopLogoDetails() {
            var details = new TopLogoDto();
            var user = userHelper.GetCurrentLoggedUser();
            if (user != null) {
                details.UserId = new Guid(user.Id);
                details.MessagesCount = db.Messages.Count(x => x.UserTo == details.UserId && !x.IsReceived);
                details.UserName = user.UserName;
            }
            return details;
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
                var path = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/images/Gallery"),
                    imgToUpload.Name);
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

        public void CreateComment(string body, Guid articleId, bool isDiary, bool isResponse, string thread) {
            var userId = userHelper.GetCurrentLoggedUserId();
            var id = Guid.NewGuid();
            if (userId != Guid.Empty) {
                var newComment = new Comments {
                    Id = id,
                    Body = body,
                    UserId = userId,
                    ArticleId = articleId,
                    DateOfCreation = DateTime.Now,
                    IsDiary = isDiary,
                    Thread = isResponse ? new Guid(thread) : id
                };
                db.Comments.Add(newComment);
                db.SaveChanges();
            }
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

        private List<CommentDto> CommentModelToDtoHelper(List<Comments> commentList, Guid articleId) {
            var comments = new List<CommentDto>();
            foreach (var item in commentList) {
                var element = new CommentDto {
                    Id = item.Id,
                    Body = item.Body,
                    ArticleId = articleId,
                    UserId = item.UserId,
                    UserName = userHelper.GetUserById(item.UserId).UserName,
                    Date = item.DateOfCreation.ToString(),
                    IsDiary = item.IsDiary,
                    IsEditable = IsCommentEditable(item.UserId),
                    Thread = item.Thread
                };
                if (item.Thread == item.Id) {
                    element.ResponseComments = new List<CommentDto>();
                }
                comments.Add(element);
            }
            return comments;
        }

        public void CreateDocument(CreateModelDto document) {
            var documentIdentifier = Guid.NewGuid();
            if (document.File != null) UploadImageForArticle(documentIdentifier, document.File, document.IsDiary);
            if (document.IsDiary) {
                var diaryObject = new Diary {
                    Id = documentIdentifier,
                    Name = document.Name.Replace("'", "`"), //for search to jquery not escape quotes
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
                    Name = document.Name.Replace("'", "`"), //for search to jquery not escape quotes
                    IndexDescription = document.IndexDescription,
                    Prelude = document.Prelude,
                    Body = document.Body,
                    CategoryId = articleHelper.GetCategoryByName(document.CategoryId).Id,
                    SubCategoryId = articleHelper.GetSubCategoryByName(document.SubCategoryId).Id,
                    Series = articleHelper.GetSeriesByName(document.Series).Id,
                    DateCreated = DateTime.Now,
                    DateEdited = DateTime.Now,
                    IsPublished = document.IsPublished,
                    UserId = userHelper.GetCurrentLoggedUserId()
                };
                db.Articles.Add(articleObject);
            }
            db.SaveChanges();
        }

        private CategoryDto GetCategoryModelDto(ArticleCategories model) {
            var category = new CategoryDto();
            var postsFromCategory =
                db.Articles.Where(x => x.CategoryId == model.Id && x.IsPublished)
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
            category.CategoryName = model.Name;
            category.Description = model.Description;
            category.Subcategories = category.CategoryPosts.Select(x => x.Subcategory).Distinct().ToList();

            return category;
        }

        private string GetArticleName(Guid id) {
            var name = db.Articles.Where(x => x.Id == id).Select(x => x.Name).Single();
            return name;
        }

        private string GetDiaryName(Guid id) {
            var name = db.Diary.Where(x => x.Id == id).Select(x => x.Name).Single();
            return name;
        }

        private bool IsCommentEditable(Guid commentAuthorId) {
            var currentUser = userHelper.GetCurrentLoggedUserId();
            return currentUser != Guid.Empty &&
                   (commentAuthorId == currentUser || userHelper.UserIsSuperAdmin(currentUser));
        }
    }
}