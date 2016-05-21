using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;
using ComX_0._0._2.Database;

namespace ComX_0._0._2.Models
{
    public class CustomRoleProvider : RoleProvider
    {
        public override bool IsUserInRole(string username, string roleName) {
            return false;
        }

        public override string[] GetRolesForUser(string username)
        {
            using (var usersContext = new SiteDbContext())
            {
                var user = usersContext.Users.SingleOrDefault(u => u.UserName == username);
                if (user == null)
                    return new string[] { };
                return user.Role == null ? new string[] { } : usersContext.Roles.Where(u=>u.Id == user.Role).Select(u=>u.Name).ToArray();
            }
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            using (var usersContext = new SiteDbContext())
            {
                return usersContext.Roles.Select(r => r.Name).ToArray();
            }
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string ApplicationName { get; set; }
    }
}
