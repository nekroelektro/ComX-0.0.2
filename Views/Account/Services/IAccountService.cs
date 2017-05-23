using System;
using System.Collections.Generic;
using ComX_0._0._2.Views.Account.Models.DtoModels;

namespace ComX_0._0._2.Views.Account.Services {
    public interface IAccountService {
        UserProfileDto GetProfileDetails(string userId);
        void EditProfile(string userMail);
        void SendMessage(string receiver, string title, string body, bool isNewThread, Guid? threadId);
        List<MessageThreadDto> GetMessagesDetails();
        void MarkAllThreadMessagesAsReceived(Guid threadId);
    }
}