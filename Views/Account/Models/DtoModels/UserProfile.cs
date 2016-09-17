using System;

namespace ComX_0._0._2.Views.Account.Models.DtoModels {
    public class UserProfile {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string UserMail { get; set; }
        public DateTime DateOfCreation { get; set; }
        public byte[] UserAvatar { get; set; }
        public bool IsBlocked { get; set; }
        public Guid Roles { get; set; }
        public bool AccoutConfirmed { get; set; }
    }
}