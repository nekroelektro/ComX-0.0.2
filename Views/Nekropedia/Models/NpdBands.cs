using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ComX_0._0._2.Views.Nekropedia.Models {
    class NpdBands {
        [Required]
        public Guid Id { get; set; }

        [DisplayName("Nazwa")]
        [Required(ErrorMessage = "Musisz dodać nazwę!")]
        public string Name { get; set; }

        [DisplayName("Czy jest aktywny?")]
        public bool IsActive { get; set; }

        [DisplayName("Rok założenia")]
        public DateTime? StartYear { get; set; }

        [DisplayName("Rok zakońćzenia działalności")]
        public DateTime? EndYear { get; set; }

        public ICollection<NpdGenres> Genres { get; set; } 
    }
}