using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.DynamicData;
using System.Web.Mvc;
using System.Web.Security;
using ComX_0._0._2.Database;
using ComX_0._0._2.Models;
using Roles = ComX_0._0._2.Models.Roles;

namespace ComX_0._0._2.Helpers {
    public class UserHelper : Controller {
        private readonly SiteDbContext db = new SiteDbContext();
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        public Guid GetCurrentLoggedUserId() {
            var membershipUser = Membership.GetUser();
            var user = membershipUser.ProviderUserKey.ToString();
            var userId = new Guid(user);
            return userId;
        }

        public Users GetUserById(Guid id) {
            var user = db.Users.Find(id);
            return user;
        }

        public void UploadAvatarForUser(Guid userId, HttpPostedFileBase upload)
        {
            if (upload != null)
            {
                using (var img = Image.FromStream(upload.InputStream))
                {
                    var file = new byte[upload.InputStream.Length];
                    var reader = new BinaryReader(upload.InputStream);
                    upload.InputStream.Seek(0, SeekOrigin.Begin);

                    file = reader.ReadBytes((int)upload.InputStream.Length);

                    var user = db.Users.Where(c => c.Id == userId).AsQueryable().FirstOrDefault();
                    user.Avatar = file;
                    db.Entry(user).State = EntityState.Modified;
                }               
                db.SaveChanges();
            }
        }

        public byte[] GetAvatarByUserId(Guid userId) {
            try {
                var user = this.GetUserById(userId);
                var avatar = user.Avatar;
                return avatar;
            }
            catch (Exception ex) {
                return null;
            }
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

        public List<Roles> GetAllRoles() {
            var roles = db.Roles.ToList();
            return roles;
        }

        public Roles GetRoleById(Guid roleId) {
            var role = db.Roles.First(x=>x.Id == roleId);
            return role;
        }
        
        public void ChangeUserRole(Guid userId, Guid roleId)
        {
            var userForRole = this.GetUserById(userId);
            userForRole.Role = this.GetRoleById(roleId).Id;
            db.Entry(userForRole).State = EntityState.Modified;
            db.SaveChanges();
        }

        public Roles GetRoleByUserId(Guid userId) {
            var user = this.GetUserById(userId);
            if (user.Role != null) {
                var role = db.Roles.First(x => x.Id == user.Role);
                return role;
            }
            return null;
        }

        public List<SelectListItem> GetRolesToCombo()
        {
            var roleList = new List<Roles>();
            var listItems = new List<SelectListItem>();

            roleList = db.Roles.ToList();
            foreach (var item in roleList)
            {
                listItems.Add(new SelectListItem
                {
                    Text = item.Name,
                    Value = item.Id.ToString()
                });
            }
            return listItems;
        }

        public bool UserIsAdmin(Guid userId) {
            var roleOfCurrentUser = this.GetRoleByUserId(userId);
            if (roleOfCurrentUser.Name == "Admin" || roleOfCurrentUser.Name == "SuperAdmin") {
                return true;
            }
            return false;
        }

        public bool UserIsSuperAdmin(Guid userId) {
            var roleOfCurrentUser = this.GetRoleByUserId(userId);
            if (roleOfCurrentUser.Name == "SuperAdmin"){
                return true;
            }
            return false;
        }
    }
}