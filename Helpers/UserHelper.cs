using System;
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
    }
}