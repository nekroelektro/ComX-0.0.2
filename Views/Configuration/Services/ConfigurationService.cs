using System;
using System.IO;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Views.Account.Models;

namespace ComX_0._0._2.Views.Configuration.Services {
    public class ConfigurationService : IConfigurationService {
        private readonly ArticleHelper articleHelper = new ArticleHelper();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();

        public void DeleteSelectedGalleryImages(string[] list) {
            foreach (var item in list) {
                var imageToDelete = db.ImagesGallery.Find(new Guid(item));
                if (File.Exists(imageToDelete.ImagePath)) {
                    File.Delete(imageToDelete.ImagePath);
                }
                db.ImagesGallery.Remove(imageToDelete);
                db.SaveChanges();
            }
        }
    }
}