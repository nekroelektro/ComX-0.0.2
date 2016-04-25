using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace ComX_0._0._2.Models
{
    public class Images
    {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public byte[] Source { get; set; }
        public string FileName { get; set; }
        public string FileFormat { get; set; }
        public int FileSize { get; set; }
        public int OriginalWidth { get; set; }
        public int OriginalHeight { get; set; }
        public DateTime DateOfChange { get; set; }
    }
}
