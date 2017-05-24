using System;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class ArticleDto {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string CodedName { get; set; }
        public string Body { get; set; }
        public string ImageUrl { get; set; }
        public string UserName { get; set; }
        public string Date { get; set; }
        public string Category { get; set; }
        public string Subcategory { get; set; }
        public string Series { get; set; }

        public string Prelude { get; set; }
        public string IndexDescription { get; set; }

        public bool IsDiary { get; set; }
        public bool AdminPanel { get; set; }

        public string Label { get; set; }
        public string AlbumYear { get; set; }
        public string ReleaseYear { get; set; }
        public string Genre { get; set; }
        public string CatalogueNumber { get; set; }

        public int SortCode { get; set; }

        // For Config
        public DateTime DateOfCreation { get; set; }
        public Guid? UserId { get; set; }
        public bool IsPublished { get; set; }
        // For ordering in index slider
        public DateTime? DateHelper { get; set; }
    }
}