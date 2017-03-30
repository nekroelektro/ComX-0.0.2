using System;
using System.Collections.Generic;
using System.Web;
using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Articles.Services {
    public interface IDocumentService {
        DocumentModelDto GetDocument(Guid id, bool isDiary);
        void UploadImageForArticle(Guid articleIdentifier, HttpPostedFileBase upload, bool isDiary);
        void UploadImageForGallery(HttpPostedFileBase upload);
        void DeleteDocument(Guid id, bool isDiary);
        CreateModelDto GetDocumentForEdit(Guid id, bool isDiary);
        void UpdateDocument(CreateModelDto document);
        void DeleteImageForGivenDocument(Guid id);
        void EditDocument(CreateModelDto document);

        void CreateComment(string body, Guid articleId, bool isDiary);
        void DeleteComment(Guid commentId);
        void UpdateComment(string body, Guid commentId);

        EditDto GetEditDetails(bool createMode, bool isDiary, Guid? id);
        SideBarDetailsDto GetSideBarDetails(int? numberOfComments);
        List<ArticleDto> GetSliderDetails();
        IndexMainDto GetIndexDetails();
        ArticleDto GetArticleDetails(string name, bool isDiary);
        LastFromCategoryDto GetLastFromCategoryDetails(string name, Guid id);
        CommentDetailsDto GetCommentsDetails(Guid articleId, bool isDiary);
        List<IndexDiaryDto> GetDiariesDetails();
        List<CategoryDto> GetNavigationDetails();
        CategoryDto GetCategoryDetails(string id);

        List<ArticleDto> GetSearchResult(string searchString);
        SearchResultsDto GetSearchResultsDetails(string searchString);
    }
}