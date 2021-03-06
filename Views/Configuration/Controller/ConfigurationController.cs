﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Account.Models.DtoModels;
using ComX_0._0._2.Views.Articles.Models;
using ComX_0._0._2.Views.Articles.Services;
using ComX_0._0._2.Views.Configuration.Models;
using ComX_0._0._2.Views.Configuration.Services;
using Microsoft.AspNet.Identity.EntityFramework;

namespace ComX_0._0._2.Views.Configuration.Controller {
    //[Authorize(Roles = "Admin, SuperAdmin")]
    public class ConfigurationController : System.Web.Mvc.Controller {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly IConfigurationService configurationService = new ConfigurationService();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly IDocumentService documentService = new DocumentService();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public ActionResult Articles() {
            var model = configurationService.GetConfigurationArticlesDetails();
            return View(model.Where(x => x.UserId == userHelper.GetCurrentLoggedUserId()));
        }

        public ActionResult Users() {
            if (userHelper.IsSuperAdminUser(User)) {
                var users = new List<UserProfileDto>();
                foreach (var item in db.Users) {
                    var userInfo = db.UserProfileInfo.Find(new Guid(item.Id));
                    var user = new UserProfileDto();
                    user.UserId = new Guid(item.Id);
                    user.UserName = item.UserName;
                    //user.UserAvatar = userInfo.Avatar;
                    user.DateOfCreation = userInfo.DateOfCreation.Value.ToShortDateString();
                    user.IsBlocked = userInfo.IsBlocked;
                    //user.Roles = new Guid(item.Roles.First().);
                    users.Add(user);
                }
                return View(users.OrderByDescending(x => x.DateOfCreation).ToList());
            }
            return View("_Restricted");
        }

        public ActionResult Roles() {
            if (userHelper.IsSuperAdminUser(User)) {
                var roles = db.Roles.ToList();
                return View(roles);
            }
            return View("_Restricted");
        }

        public ActionResult RolesCreate() {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult RolesCreate(IdentityRole role) {
            if (ModelState.IsValid) {
                role.Id = Guid.NewGuid().ToString();
                db.Roles.Add(role);
                db.SaveChanges();
                return RedirectToAction("Roles");
            }
            return View();
        }

        public ActionResult RolesDetails(Guid? roleId) {
            if (roleId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var role = db.Roles.Find(roleId.ToString());
            if (role == null) {
                return HttpNotFound();
            }
            return View(role);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult RolesDetails(IdentityRole role) {
            if (ModelState.IsValid) {
                userHelper.ChangeRoleDetails(role);
                return RedirectToAction("Roles");
            }
            return View();
        }

        public ActionResult DeleteRole(string roleId) {
            var roleToDelete = db.Roles.Find(roleId);
            //userHelper.ChangeUserRoleIfRoleIsDeleted(new Guid(roleId));
            db.Roles.Remove(roleToDelete);
            db.SaveChanges();
            return RedirectToAction("Roles");
        }

        public ActionResult Categories() {
            var categories = db.Categories.ToList();
            return View(categories);
        }

        public ActionResult CategoriesCreate() {
            return View();
        }

        public ActionResult SubCategoriesCreate() {
            return View();
        }

        public ActionResult SeriesCreate() {
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CategoriesCreate(ArticleCategories category) {
            if (ModelState.IsValid) {
                category.Id = Guid.NewGuid();
                db.Categories.Add(category);
                db.SaveChanges();
                return RedirectToAction("Categories");
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SubCategoriesCreate(ArticleSubCategories category) {
            if (ModelState.IsValid) {
                category.Id = Guid.NewGuid();
                db.SubCategories.Add(category);
                db.SaveChanges();
                return RedirectToAction("Categories");
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SeriesCreate(Series category) {
            if (ModelState.IsValid) {
                category.Id = Guid.NewGuid();
                category.BuildIn = userHelper.IsSuperAdminUser(User);
                db.Series.Add(category);
                db.SaveChanges();
                return RedirectToAction("Categories");
            }
            return View();
        }

        public ActionResult CategoriesDetails(Guid? categoryId) {
            if (categoryId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var category = db.Categories.Find(categoryId);
            if (category == null) {
                return HttpNotFound();
            }
            return View(category);
        }

        public ActionResult SubCategoriesDetails(Guid? categoryId) {
            if (categoryId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var category = db.SubCategories.Find(categoryId);
            if (category == null) {
                return HttpNotFound();
            }
            return View(category);
        }

        public ActionResult SeriesDetails(Guid? categoryId) {
            if (categoryId == null) {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            var category = db.Series.Find(categoryId);
            if (category == null) {
                return HttpNotFound();
            }
            return View(category);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult CategoriesDetails(ArticleCategories category) {
            if (ModelState.IsValid) {
                articleHelper.ChangeCategoryDetails(category);
                return RedirectToAction("Categories");
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SubCategoriesDetails(ArticleSubCategories category) {
            if (ModelState.IsValid) {
                articleHelper.ChangeSubCategoryDetails(category);
                return RedirectToAction("Categories");
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SeriesDetails(ArticleSubCategories category) {
            if (ModelState.IsValid) {
                articleHelper.ChangeSeriesDetails(category, userHelper.IsSuperAdminUser(User));
                return RedirectToAction("Categories");
            }
            return View();
        }

        public ActionResult DeleteCategory(string categoryId) {
            var categoryToDelete = db.Categories.Find(new Guid(categoryId));
            articleHelper.ChangeArticleCategoryIfCategoryDeleted(new Guid(categoryId), true);
            db.Categories.Remove(categoryToDelete);
            db.SaveChanges();
            return RedirectToAction("Categories");
        }

        public ActionResult DeleteSubCategory(string categoryId) {
            var categoryToDelete = db.SubCategories.Find(new Guid(categoryId));
            articleHelper.ChangeArticleCategoryIfCategoryDeleted(new Guid(categoryId), false);
            db.SubCategories.Remove(categoryToDelete);
            db.SaveChanges();
            return RedirectToAction("Categories");
        }

        public ActionResult DeleteSeries(string categoryId) {
            var categoryToDelete = db.Series.Find(new Guid(categoryId));
            articleHelper.DeleteSeriesForArticles(new Guid(categoryId));
            db.Series.Remove(categoryToDelete);
            db.SaveChanges();
            return RedirectToAction("Categories");
        }

        public ActionResult _SubCategories() {
            var categories = db.SubCategories.ToList();
            return PartialView(categories);
        }

        public ActionResult _Series() {
            var series = db.Series.ToList();
            return PartialView(series);
        }

        public ActionResult Gallery() {
            var gallery = db.ImagesGallery.OrderByDescending(x => x.DateOfCreation).ToList();
            return View(gallery);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Gallery(HttpPostedFileBase image) {
            if (ModelState.IsValid) {
                documentService.UploadImageForGallery(image);
                return RedirectToAction("Gallery");
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult GalleryDeleteImages(string[] imagesList) {
            configurationService.DeleteSelectedGalleryImages(imagesList);
            return RedirectToAction("Gallery");
        }

        public ActionResult SiteSettings() {
            if (userHelper.IsSuperAdminUser(User)) {
                return View(generalHelper.GetSettings());
            }
            return View("_Restricted");
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SiteSettings(SiteSettings settings) {
            if (ModelState.IsValid) {
                var set = generalHelper.GetSettings();
                set.IsMaintenance = settings.IsMaintenance;
                set.CommentsAvailable = settings.CommentsAvailable;
                set.Quote = settings.Quote;
                set.JumboIndexText = settings.JumboIndexText;
                set.ListName = settings.ListName;
                set.Playlist = settings.Playlist;
                db.Entry(set).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("SiteSettings");
            }
            return View();
        }
    }
}