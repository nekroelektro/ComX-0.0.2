using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace ComX_0._0._2.Views.Account.Models.DtoModels {
    public class UserProfileDto {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserMail { get; set; }
        public string DateOfCreation { get; set; }
        //public byte[] UserAvatar { get; set; }
        public bool IsBlocked { get; set; }
        public string Roles { get; set; }
        public bool AccountConfirmed { get; set; }

        public List<SelectListItem> RolesList { get; set; }
        public bool IsOwnAccount { get; set; }
        public bool AvatarExists { get; set; }
        public int CommentsCount { get; set; }
    }
}