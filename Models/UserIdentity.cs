﻿using System.Security.Principal;
using System.Web.Security;

namespace ComX_0._0._2.Models {
    public class UserIdentity : IIdentity, IPrincipal {
        private readonly FormsAuthenticationTicket _ticket;

        public UserIdentity(FormsAuthenticationTicket ticket) {
            _ticket = ticket;
        }

        public string UserId {
            get { return _ticket.UserData; }
        }

        public string AuthenticationType {
            get { return "User"; }
        }

        public bool IsAuthenticated {
            get { return true; }
        }

        public string Name {
            get { return _ticket.Name; }
        }

        public bool IsInRole(string role) {
            return System.Web.Security.Roles.IsUserInRole(role);
        }

        public IIdentity Identity {
            get { return this; }
        }
    }
}