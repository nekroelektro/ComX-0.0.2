using System;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Views.Articles.Models {
    public class ArticleSubCategories {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int SortCode { get; set; }
    }
}