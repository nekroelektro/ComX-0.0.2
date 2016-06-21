using System;

namespace ComX_0._0._2.Models.AccountModels {
    public class UserProfileInfo {
        public Guid Id { get; set; }

        public DateTime? DateOfCreation { get; set; }

        public byte[] Avatar { get; set; }

        public bool IsBlocked { get; set; }
    }
}