using System;
using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class CommentDto {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public string Body { get; set; }
        public Guid? UserId { get; set; }
        public string UserName { get; set; }
        public bool IsDiary { get; set; }
        public string Date { get; set; }
        public bool IsEditable { get; set; }
        public List<CommentDto> ResponseComments { get; set; }
        public Guid Thread { get; set; }
    }
}