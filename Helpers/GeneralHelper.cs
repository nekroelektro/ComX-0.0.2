using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using ComX_0._0._2.Models;

namespace ComX_0._0._2.Helpers {
    public class GeneralHelper {
        public string GenerateRandomNumber() {
            var random = new Random();
            var randomNumber = random.Next(100000, 99999999);
            return randomNumber.ToString();
        }

        public Image FixImageOrientation(Image img) {
            if (Array.IndexOf(img.PropertyIdList, 274) > -1)
            {
                var orientation = (int)img.GetPropertyItem(274).Value[0];
                switch (orientation)
                {
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
            var url = this.GetCurrentPageUrl();
            var urlArray = url.Split('/');
            var urlGuid = urlArray.Last();
            var id = new Guid(urlGuid);
            return id;
        }
    }
}