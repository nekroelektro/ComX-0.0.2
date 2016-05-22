using System;

namespace ComX_0._0._2.Models
{
    public class Images
    {
        public Guid Id { get; set; }
        public Guid ArticleId { get; set; }
        public string ImagePath { get; set; }
        public string FileName { get; set; }
        public string FileFormat { get; set; }
        public int FileSize { get; set; }
        public int OriginalWidth { get; set; }
        public int OriginalHeight { get; set; }
        public DateTime DateOfChange { get; set; }
    }
}
