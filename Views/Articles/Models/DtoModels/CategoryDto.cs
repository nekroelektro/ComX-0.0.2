using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class CategoryDto {
        public string CategoryName { get; set; }
        public List<ArticleDto> CategoryPosts { get; set; }
        public List<string> Subcategories { get; set; }
    }
}