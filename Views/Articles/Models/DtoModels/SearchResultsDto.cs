using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class SearchResultsDto {
        public string SearchString { get; set; }
        public List<ArticleDto> SearchPosts { get; set; }
        public List<string> Subcategories { get; set; }
    }
}