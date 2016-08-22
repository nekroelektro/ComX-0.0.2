using System;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Models {
    public class SiteSettings {
        public Guid Id { get; set; }
        public bool IsMaintenance { get; set; }
        [Display(Name = "Cytat dnia")]
        public string Quote { get; set; }
        [Display(Name = "Plazlista")]
        public string Playlist { get; set; }
        [Display(Name = "Jumbotekst")]
        public string JumboIndexText { get; set; }
        public bool CommentsAvailable { get; set; }
    }
}