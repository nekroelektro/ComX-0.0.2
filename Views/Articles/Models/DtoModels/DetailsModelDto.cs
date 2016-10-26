using System;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class DetailsModelDto {
        public bool IsDiary { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public string Label { get; set; }
        public int? AlbumYear { get; set; }
        public int? ReleaseYear { get; set; }
        public string Genre { get; set; }
        public DateTime DateCreated { get; set; }
        public string Prelude { get; set; }
        public Guid? UserId { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? SubCategoryId { get; set; }
        public string IndexDescription { get; set; }
        public Guid? Series { get; set; }
        public string CatalogueNumber { get; set; }
    }
}