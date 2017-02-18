using System;
using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class CommentDetailsDto {
        public List<CommentDto> Comments { get; set; }
        public CommentDto Comment { get; set; }
        public bool IsDiary { get; set; }
        public Guid ArticleId { get; set; }
    }
}