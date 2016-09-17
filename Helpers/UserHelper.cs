using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Views.Account.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ComX_0._0._2.Helpers {
    public class UserHelper : Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        public ApplicationUser GetCurrentLoggedUser() {
            var userId = GetCurrentLoggedUserId();
            if (userId != Guid.Empty) {
                var user = GetUserById(userId);
                return user;
            }
            return null;
        }

        public Guid GetCurrentLoggedUserId() {
            if (System.Web.HttpContext.Current.Request.IsAuthenticated) {
                var user = System.Web.HttpContext.Current.User.Identity;
                return new Guid(user.GetUserId());
            }
            return Guid.Empty;
        }

        public ApplicationUser GetUserById(Guid id) {
            var user = db.Users.Find(id.ToString());
            return user;
        }

        public ApplicationUser GetUserByName(string name) {
            var user = db.Users.First(x => x.UserName == name);
            return user;
        }

        public ApplicationUser GetUserByMail(string userMail) {
            var user = db.Users.First(x => x.Email == userMail);
            return user;
        }

        public UserProfileInfo GetCurrentUserProfileInfo() {
            var userId = GetCurrentLoggedUserId();
            if (userId != Guid.Empty) {
                var user = GetProfileInfoById(userId);
                return user;
            }
            return null;
        }

        public UserProfileInfo GetProfileInfoById(Guid id) {
            var userProfile = db.UserProfileInfo.Find(id);
            return userProfile;
        }

        public void UploadAvatarForUser(Guid userId, HttpPostedFileBase upload) {
            if (upload != null) {
                using (var img = Image.FromStream(upload.InputStream)) {
                    var file = new byte[upload.InputStream.Length];
                    var reader = new BinaryReader(upload.InputStream);
                    upload.InputStream.Seek(0, SeekOrigin.Begin);

                    file = reader.ReadBytes((int) upload.InputStream.Length);

                    var user = db.UserProfileInfo.Where(c => c.Id == userId).AsQueryable().FirstOrDefault();
                    user.Avatar = file;
                    db.Entry(user).State = EntityState.Modified;
                }
                db.SaveChanges();
            }
        }

        public byte[] GetAvatarByUserId(Guid userId) {
            try {
                var user = GetProfileInfoById(userId);
                var avatar = user.Avatar;
                return avatar;
            }
            catch (Exception ex) {
                return null;
            }
        }

        public void DeleteUser(Guid userId) {
            var userToDelete = GetUserById(userId);
            db.Users.Remove(userToDelete);
            db.SaveChanges();
        }

        public void DeleteAvatarByUserId(Guid userId) {
            var avatarToDelete = db.UserProfileInfo.Find(userId);
            avatarToDelete.Avatar = null;
            db.Entry(avatarToDelete).State = EntityState.Modified;
            db.SaveChanges();
        }

        public void UserBlockade(Guid userId) {
            var userToBlock = GetProfileInfoById(userId);
            switch (userToBlock.IsBlocked) {
                case true:
                    userToBlock.IsBlocked = false;
                    break;
                case false:
                    userToBlock.IsBlocked = true;
                    break;
                default:
                    break;
            }
            db.Entry(userToBlock).State = EntityState.Modified;
            db.SaveChanges();
        }

        public bool CheckIfLastCommentWasSameUser(Guid userId, Guid articleId) {
            var lastCommentForArticle = articleHelper.GetCommentsByArticle(articleId);
            if (lastCommentForArticle.Count > 0) {
                var lastComment = lastCommentForArticle.First();
                if (lastComment.UserId == userId) {
                    return true;
                }
            }
            return false;
        }

        public List<IdentityRole> GetAllRoles() {
            var roles = db.Roles.ToList();
            return roles;
        }

        public IdentityRole GetRoleById(string roleId) {
            var role = db.Roles.First(x => x.Id == roleId);
            return role;
        }

        public IList<string> GetRolesByUserId(Guid userId) {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var rolesList = userManager.GetRoles(userId.ToString());
            return rolesList;
        }

        public string GetRoleNamesByUserId(Guid userId) {
            var roles = GetRolesByUserId(userId);
            var roleString = string.Join(",", roles.ToArray());
            return roleString;
        } 

        public void ChangeUserRole(Guid userId, Guid roleId) {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            userManager.RemoveFromRoles(userId.ToString());
            var role = db.Roles.Find(roleId.ToString());
            userManager.AddToRole(userId.ToString(), role.Name);
            userManager.AddToRole(userId.ToString(), "User");
        }

        public List<SelectListItem> GetRolesToCombo() {
            var roleList = new List<IdentityRole>();
            var listItems = new List<SelectListItem>();

            roleList = db.Roles.Where(x=>x.Name != "User").ToList();
            foreach (var item in roleList) {
                listItems.Add(new SelectListItem {
                    Text = item.Name,
                    Value = item.Id
                });
            }
            return listItems;
        }

        public void ChangeRoleDetails(IdentityRole role) {
            var roleToChange = GetRoleById(role.Id);
            roleToChange.Name = role.Name;
            db.Entry(roleToChange).State = EntityState.Modified;
            db.SaveChanges();
        }

        //public void ChangeUserRoleIfRoleIsDeleted(Guid roleId) {
        //    var allUsersWithDeletedRole = db.Roles.Where(x => x.Role.Value == roleId);
        //    //if (allUsersWithDeletedRole.Count() > 0) {
        //    //    foreach (var item in allUsersWithDeletedRole) {
        //    //        item.Role = GetAllRoles().First(x => x.Name == "User").Id;
        //    //        db.Entry(item).State = EntityState.Modified;
        //    //    }
        //    //    db.SaveChanges();
        //    //}
        //}

        public void DegradeToUser(Guid userId) {
            var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
            var userRoles = this.GetRolesByUserId(userId);
            foreach (var item in userRoles) {
                userManager.RemoveFromRole(userId.ToString(), item);
            }
            userManager.AddToRole(userId.ToString(), "User");
        }

        public bool UserIsAdmin(Guid userId) {
            if (userId != Guid.Empty) {
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
                var rolesList = userManager.GetRoles(userId.ToString());
                if (rolesList.Contains("Admin") || rolesList.Contains("SuperAdmin")) {
                    return true;
                }
                return false;
            }
            return false;
        }

        public bool UserIsSuperAdmin(Guid userId) {
            if (userId != Guid.Empty) {
                var userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(db));
                var rolesList = userManager.GetRoles(userId.ToString());
                if (rolesList.Contains("SuperAdmin")) {
                    return true;
                }
                return false;
            }
            return false;
        }

        public bool IsAdminUser(IPrincipal user) {
            if (user.Identity.IsAuthenticated) {
                return UserIsAdmin(new Guid(GetUserByName(user.Identity.Name).Id));
            }
            return false;
        }

        public bool IsSuperAdminUser(IPrincipal user) {
            if (user.Identity.IsAuthenticated){
                return UserIsSuperAdmin(new Guid(GetUserByName(user.Identity.Name).Id));
            }
            return false;
        }
    }
}