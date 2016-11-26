using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels
{
    public class CommentModelDto
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public Guid ArticleId { get; set; }
        public Guid UserId { get; set; }
        public DateTime DateCreated { get; set; }
        public bool IsDiary { get; set; }
    }
}
