using System.Collections.Generic;
using System.Web.Mvc;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class EditDto {
        public CreateModelDto Document { get; set; }
        public List<List<SelectListItem>> Categories { get; set; }
        public bool IsCreate { get; set; }
        public string ArticleImage { get; set; }
    }
}