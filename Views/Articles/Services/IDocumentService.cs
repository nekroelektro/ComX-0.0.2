using System;
using System.Collections.Generic;
using System.Web;
using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Articles.Services {
    public interface IDocumentService {
        DetailsModelDto GetDocumentForDetails(string name, bool isDiary, bool isDetailPanel);
        List<IndexModelDto> GetDocumentForIndex(bool onlyArticles, int number = 0);
        DocumentModelDto GetDocument(Guid id, bool isDiary);
        void UploadImageForArticle(Guid articleIdentifier, HttpPostedFileBase upload, bool isDiary);
        void UploadImageForGallery(HttpPostedFileBase upload);
        void DeleteDocument(Guid id, bool isDiary);
        void CreateDocument(CreateModelDto document, HttpPostedFileBase upload);
        CreateModelDto GetDocumentForEdit(Guid id, bool isDiary);
        void UpdateDocument(CreateModelDto document, HttpPostedFileBase upload);
        void DeleteImageForGivenDocument(Guid id);
    }
}