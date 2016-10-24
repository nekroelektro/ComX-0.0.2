using System;

namespace ComX_0._0._2.Views.Articles.Models {
    public class Diary {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Body { get; set; }
        public string Label { get; set; }
        public int AlbumYear { get; set; }
        public int ReleaseYear { get; set; }
        public string Genre { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsPublished { get; set; }
        public string CatalogueNumber { get; set; }
        public Guid UserId { get; set; }
    }
}