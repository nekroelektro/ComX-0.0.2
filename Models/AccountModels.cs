using System;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace ComX_0._0._2.Models {
    public class ChangePasswordModel {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Obecne hasło")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} musi mieć przynajmniej {2} znaki.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Nowe hasło")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Potwierdź nowe hasło")]
        [System.ComponentModel.DataAnnotations.Compare("NewPassword", ErrorMessage = "Nie zgadza się z tamty hasłem co na górze.")]
        public string ConfirmPassword { get; set; }
    }

    public class LogOnModel {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(100, ErrorMessage = "Hasło musi mieć przynajmniej {2} znaków. Bo ja tak mówię.", MinimumLength = 6)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterModel {
        [Required]
        [StringLength(15, ErrorMessage = "Twój nick (pol. Mikołajek) musi mieć przynajmniej {2} znaki a do tego nie więcej niż {1}, sory memory.", MinimumLength = 3)]
        [Remote("UserNameExists", "Account", HttpMethod = "POST", ErrorMessage = "Taki ziomek już istnieje, wymyśl coś innego...")]
        [Display(Name = "Nazwa użytkownika")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress, ErrorMessage = "Zły masz format tego maila, popraw albo zmień albo co...")]
        [Display(Name = "Adres e-mail")]
        public string Email { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "Hasło musi mieć przynajmniej {2} znaków. Bo ja tak mówię.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Hasło do konta")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Potwierdź hasło")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "Hasła się nie... POKRYWAJĄ (hihi)")]
        public string ConfirmPassword { get; set; }

        public DateTime DateOfCreation { get; set; }
        public byte[] Avatar { get; set; }
    }
}