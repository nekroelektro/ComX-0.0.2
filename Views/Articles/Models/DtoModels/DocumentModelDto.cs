using System;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class DocumentModelDto {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDiary { get; set; }
    }
}