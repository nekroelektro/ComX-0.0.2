using System.Collections.Generic;
using ComX_0._0._2.Views.Articles.Models.DtoModels;

namespace ComX_0._0._2.Views.Configuration.Services {
    public interface IConfigurationService {
        void DeleteSelectedGalleryImages(string[] list);
        List<ArticleDto> GetConfigurationArticlesDetails();
    }
}