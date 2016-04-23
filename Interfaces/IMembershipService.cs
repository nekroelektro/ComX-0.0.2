﻿using System;
using System.Web.Security;

namespace ComX_0._0._2.Interfaces {
    public interface IMembershipService {
        int MinPasswordLength { get; }

        bool ValidateUser(string userName, string password);
        MembershipCreateStatus CreateUser(string userName, string password, string email);
        bool ChangePassword(string userName, string oldPassword, string newPassword);
    }
}