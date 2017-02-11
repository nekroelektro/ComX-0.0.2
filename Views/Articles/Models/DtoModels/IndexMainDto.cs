using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class IndexMainDto {
        public List<IndexPostsDto> Articles { get; set; }
        public List<IndexDiaryDto> Diaries { get; set; }
        public List<IndexReviewsDto> Reviews { get; set; }
    }
}