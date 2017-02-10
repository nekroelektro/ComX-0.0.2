using System.Collections.Generic;

namespace ComX_0._0._2.Views.Articles.Models.DtoModels {
    public class SideBarDetailsDto {
        public List<IndexCommentModelDto> Comments { get; set; }
        public List<IndexPostsDto> RandomPosts { get; set; }
        public string PlazlistName { get; set; }
        public string PlazlistCode { get; set; }
    }
}