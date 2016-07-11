using System;
using System.Drawing;
using System.Linq;
using System.Web;

namespace ComX_0._0._2.Helpers {
    public class GeneralHelper {

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

        public Guid GetIdFromCurrentUrl() {
            var url = GetCurrentPageUrl();
            var urlArray = url.Split('/');
            var urlGuid = urlArray.Last();
            var id = new Guid(urlGuid);
            return id;
        }

        public Guid GetIdFromCurrentUrlForArticle()
        {
            ArticleHelper articleHelper = new ArticleHelper();
            var url = GetCurrentPageUrl();
            var urlDecoded = HttpUtility.UrlDecode(url);
            var urlArray = urlDecoded.Split('/');
            var urlName = urlArray.Last();
            var text = this.AddSpecialCharsForString(urlName);
            var id = articleHelper.GetArticleByName(text).Id;
            return id;
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
    }
}