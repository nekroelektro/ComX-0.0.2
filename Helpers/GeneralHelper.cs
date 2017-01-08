using System;
using System.Drawing;
using System.Linq;
using System.Web;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Configuration.Models;

namespace ComX_0._0._2.Helpers {
    public class GeneralHelper {
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        public string GenerateRandomNumber() {
            var random = new Random();
            var randomNumber = random.Next(100000, 99999999);
            return randomNumber.ToString();
        }

        public Image FixImageOrientation(Image img) {
            if (Array.IndexOf(img.PropertyIdList, 274) > -1) {
                var orientation = (int) img.GetPropertyItem(274).Value[0];
                switch (orientation) {
                    case 1:
                        // No rotation required.
                        break;
                    case 2:
                        img.RotateFlip(RotateFlipType.RotateNoneFlipX);
                        break;
                    case 3:
                        img.RotateFlip(RotateFlipType.Rotate180FlipNone);
                        break;
                    case 4:
                        img.RotateFlip(RotateFlipType.Rotate180FlipX);
                        break;
                    case 5:
                        img.RotateFlip(RotateFlipType.Rotate90FlipX);
                        break;
                    case 6:
                        img.RotateFlip(RotateFlipType.Rotate90FlipNone);
                        break;
                    case 7:
                        img.RotateFlip(RotateFlipType.Rotate270FlipX);
                        break;
                    case 8:
                        img.RotateFlip(RotateFlipType.Rotate270FlipNone);
                        break;
                }
                // This EXIF data is now invalid and should be removed.
                img.RemovePropertyItem(274);
            }
            return img;
        }

        public string GetCurrentPageUrl() {
            var url = HttpContext.Current.Request.Url.AbsoluteUri;
            return url;
        }

        public string GetPreviousPageUrl() {
            var url = HttpContext.Current.Request.UrlReferrer.AbsoluteUri;
            return url;
        }

        public string GetNameFromCurrentUrl() {
            var url = GetCurrentPageUrl();
            var urlArray = url.Split('/');
            var urlName = urlArray.Last();
            if (urlName.Contains("?")) {
                urlName = urlName.Split('?').First();
            }
            var name = this.AddSpecialCharsForString(urlName);
            return name;
        }

        public Guid GetIdFromCurrentUrlForArticle()
        {
            ArticleHelper articleHelper = new ArticleHelper();
            var text = this.GetNameFromUrl();
            var id = articleHelper.GetArticleByName(text).Id;
            return id;
        }

        public string GetNameFromUrl() {
            var url = GetCurrentPageUrl();
            var urlDecoded = HttpUtility.UrlDecode(url);
            var urlArray = urlDecoded.Split('/');
            var urlName = urlArray.Last();
            if (urlName.Contains("?")){
                urlName = urlName.Split('?').First();
            }
            var text = this.AddSpecialCharsForString(urlName);
            return text;
        }

        public string RemoveSpecialCharsFromString(string text) {
            var html = text.Replace(" ", "+");
            //var pureText = Regex.Replace(text, "[^a-zA-Z0-9_.]+", "_", RegexOptions.Compiled);
            return html;
        }

        public string AddSpecialCharsForString(string text) {
            var textToPass = text.Replace("+", " ");
            return textToPass;
        }

        public SiteSettings GetSettings() {
            var settings = db.SiteSettings.First();
            return settings;
        }
    }
}