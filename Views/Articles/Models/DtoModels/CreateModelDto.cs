using System;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class CreateModelDto {
        public bool IsDiary { get; set; }
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Body { get; set; }

        public string Label { get; set; }
        public int? AlbumYear { get; set; }
        public int? ReleaseYear { get; set; }
        public string Genre { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsPublished { get; set; }
        public string Prelude { get; set; }
        public string UserId { get; set; }
        public string CategoryId { get; set; }
        public string SubCategoryId { get; set; }
        public DateTime? DateEdited { get; set; }
        public string IndexDescription { get; set; }
        public string Series { get; set; }
        public string CatalogueNumber { get; set; }
    }
}