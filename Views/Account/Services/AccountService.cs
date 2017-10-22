using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Helpers.SmtpHelpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Account.Models.DtoModels;

namespace ComX_0._0._2.Views.Account.Services {
    public class AccountService : IAccountService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public UserProfileDto GetProfileDetails(string userProfileId) {
            var user = string.IsNullOrEmpty(userProfileId)
                ? userHelper.GetUserById(userHelper.GetCurrentLoggedUserId())
                : userHelper.GetUserByName(userProfileId);

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
            userProfile.IsOwnAccount = string.IsNullOrEmpty(userProfileId) ||
                                       userHelper.IsSameUserScreen(userIdentificator);
            userProfile.RolesList = userHelper.GetRolesToCombo();
            userProfile.CommentsCount = articleHelper.GetCommentsByUser(userIdentificator).Count;

            return userProfile;
        }

        public List<MessageThreadDto> GetMessagesDetails() {
            var details = new List<MessageThreadDto>();
            var userProfileId = userHelper.GetCurrentLoggedUserId();

            var allUserMessages = db.Messages.Where(x => x.UserFrom == userProfileId || x.UserTo == userProfileId)
                .OrderBy(x => x.DateCreated).ToList();
            foreach (var item in allUserMessages) {
                var isThreadMessage = item.Id == item.Thread;
                if (isThreadMessage) {
                    var thread = new MessageThreadDto {
                        Id = item.Id,
                        Name = item.Title,
                        Date = item.DateCreated.ToString(),
                        Messages = new List<MessageDto>(),
                        UserWithId = Guid.Empty
                    };
                    details.Add(thread);
                }
                var user = userHelper.GetUserById(item.UserFrom);
                var message = new MessageDto {
                    Id = item.Id,
                    Date = item.DateCreated.ToString(),
                    Body = item.Body,
                    Title = item.Title,
                    Author = user != null ? user.UserName : "Użytkownik usunięty",
                    AuthorId = user != null ? user.Id : new Guid().ToString(),
                    IsReceived = item.UserFrom == userProfileId || item.IsReceived,
                    Thread = item.Thread,
                    IsNewThread = isThreadMessage
                };
                var messageThread = details.FirstOrDefault(x => x.Id == item.Thread);
                messageThread.IsUserWithDeleted = false;
                messageThread.Messages.Add(message);
                if (messageThread.UserWithId == Guid.Empty) {
                    if (message.AuthorId != Guid.Empty.ToString()) {
                        messageThread.UserWithId = new Guid(message.AuthorId) != userProfileId
                            ? item.UserFrom
                            : item.UserTo;
                    }
                    else {
                        messageThread.IsUserWithDeleted = true;
                    }
                }
            }

            foreach (var thread in details)
                thread.IsAllRead = thread.Messages.Count == thread.Messages.Count(x => x.IsReceived);
            return details.OrderByDescending(x => x.Date).ToList();
        }

        public void EditProfile(string userMail) {
            var user = db.Users.Find(userHelper.GetCurrentLoggedUserId().ToString());
            user.Email = userMail;
            db.Entry(user).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void SendMessage(string receiver, string title, string body, bool isNewThread, Guid? threadId) {
            var userSendMessageTo = db.Users.Find(receiver);
            var newMessageId = Guid.NewGuid();
            var messageObject = new UserMessage {
                Id = newMessageId,
                UserFrom = userHelper.GetCurrentLoggedUserId(),
                UserTo = new Guid(userSendMessageTo.Id),
                Body = body,
                DateCreated = DateTime.Now,
                IsReceived = false,
                IsSystem = false,
                Title = title,
                Thread = isNewThread ? newMessageId : threadId.Value
            };
            db.Messages.Add(messageObject);
            db.SaveChanges();
        }

        public void MarkAllThreadMessagesAsReceived(Guid threadId) {
            var messages = db.Messages.Where(x => x.Thread == threadId && !x.IsReceived).ToList();
            if (messages.Count > 0)
                foreach (var item in messages.Where(x=>x.UserTo == userHelper.GetCurrentLoggedUserId())) {
                    item.IsReceived = true;
                    db.Entry(item).State = EntityState.Modified;
                    db.SaveChanges();
                }
        }

        private void SendMessageInfoToMail(ApplicationUser user) {
            var message = new EmailMessage();
            var callbackUrl = "";
            //Url.Action("ResetPassword", "Account", new { userId = user.Id, code }, Request.Url.Scheme);
            message.ToEmail = user.Email;
            message.Subject = "Posiadasz nową prywatną wiadomość na NEKROPLAZA.PL";
            message.IsHtml = false;
            message.Body =
                string.Format(
                    "Serwus, {0}!!!\n Jeśli to czytasz, to znaczy, że ktoś wysłał do Ciebie prywatną wiadomość na portalu barbarzyńskim" +
                    "NEKROPLAZA.PL - kliknij w ten link:\n " +
                    callbackUrl +
                    "\naby przejść do swojego profilu i przeczytać wiadomość!\nPozdrawiam serdecznie!\nNekro",
                    user.UserName);

            var emailService = new Helpers.SmtpHelpers.EmailService();
            var status = emailService.SendEmailMessage(message);
        }
    }
}