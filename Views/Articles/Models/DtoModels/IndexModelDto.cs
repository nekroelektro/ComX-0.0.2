using System;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class IndexModelDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateCreation { get; set; }
        public string IndexPrologue { get; set; }
        public string Prologue { get; set; }
        public Guid? Series { get; set; }
        public Guid? Categories { get; set; }
        public Guid? SubCategories { get; set; }
        public Guid? UserId { get; set; }
        public bool IsDiary { get; set; }
        public bool IsPublished { get; set; }
    }
}