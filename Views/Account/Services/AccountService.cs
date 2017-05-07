using System;
using System.Data.Entity;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Account.Models.DtoModels;

namespace ComX_0._0._2.Views.Account.Services {
    public class AccountService : IAccountService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public UserProfileDto GetProfileDetails(Guid? userProfileId) {
            var user = userProfileId == null
                ? userHelper.GetUserById(userHelper.GetCurrentLoggedUserId())
                : userHelper.GetUserById(userProfileId.Value);

            var userIdentificator = new Guid(user.Id);
            var userInfo = db.UserProfileInfo.Find(userIdentificator);
            var userProfile = new UserProfileDto();
            userProfile.UserId = new Guid(user.Id);
            userProfile.UserName = user.UserName;
            userProfile.DateOfCreation = userInfo.DateOfCreation.Value.ToShortDateString();
            userProfile.IsBlocked = userInfo.IsBlocked;
            userProfile.Roles = userHelper.GetRoleNamesByUserId(userIdentificator);
            userProfile.UserMail = user.Email;
            userProfile.AvatarExists = userInfo.Avatar != null;
            userProfile.AccountConfirmed = user.EmailConfirmed;
            userProfile.IsOwnAccount = userProfileId == null || userHelper.IsSameUserScreen(userProfileId.Value);
            userProfile.RolesList = userHelper.GetRolesToCombo();
            userProfile.CommentsCount = articleHelper.GetCommentsByUser(userIdentificator).Count;

            return userProfile;
        }

        public void EditProfile(string userMail) {
            var user = db.Users.Find(userHelper.GetCurrentLoggedUserId().ToString());
            user.Email = userMail;
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}