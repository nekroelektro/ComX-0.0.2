using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Articles.Services {
    public interface IArticleService {
        DetailsModelDto GetDocumentForDetails(string name, bool isDiary, bool isDetailPanel);
    }
}