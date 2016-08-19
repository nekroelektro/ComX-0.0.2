using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Models
{
    public class Articles
    {
        [Required]
        public Guid Id { get; set; }

        [DisplayName("Title")]
        [Required(ErrorMessage = "Title is required field!")]
        public string Name { get; set; }

        [DisplayName("Intro")]
        [Required(ErrorMessage = "Intro is required field!")]
        public string Prelude { get; set; }

        [DisplayName("Body")]
        [Required(ErrorMessage = "Body is required field!")]
        public string Body { get; set; }

        [DisplayName("Author")]
        public Guid UserId { get; set; }

        [DisplayName("Category")]
        public Guid CategoryId { get; set; }

        [DisplayName("SubCategory")]
        public Guid SubCategoryId { get; set; }

        [DisplayName("Date of creation")]
        [Required]
        public DateTime DateCreated { get; set; }

        [DisplayName("Date of last modification")]
        [Required]
        public DateTime DateEdited { get; set; }

        public bool IsPublished { get; set; }

        [DisplayName("Short description for Index")]
        public string IndexDescription { get; set; }

        [DisplayName("Series")]
        public Guid Series { get; set; }
    }
}