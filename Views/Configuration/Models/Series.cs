using System;

namespace ComX_0._0._2.Views.Configuration.Models {
    public class Series {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public int SortCode { get; set; }

        public bool BuildIn { get; set; }
    }
}