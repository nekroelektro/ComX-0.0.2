using System;

namespace ComX_0._0._2.Views.Articles.Models {
    public class Comments {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public Guid UserId { get; set; }
        public Guid ArticleId { get; set; }
        public DateTime DateOfCreation { get; set; }
    }
}