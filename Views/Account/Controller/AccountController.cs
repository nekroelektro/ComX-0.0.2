﻿using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Helpers.SmtpHelpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Account.Services;
using ComX_0._0._2.Views.Articles.Services;
using Facebook;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace ComX_0._0._2.Views.Account.Controller {
    [Authorize]
    public class AccountController : System.Web.Mvc.Controller {
        private readonly IAccountService accountService = new AccountService();
        private readonly ApplicationDbContext db = new ApplicationDbContext();
        private readonly IDocumentService documentService = new DocumentService();
        private readonly GeneralHelper generalHelper = new GeneralHelper();
        private readonly UserHelper userHelper = new UserHelper();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public AccountController() {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager) {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        private Uri RedirectUri {
            get {
                var uriBuilder = new UriBuilder(Request.Url);
                uriBuilder.Query = null;
                uriBuilder.Fragment = null;
                uriBuilder.Path = Url.Action("FacebookCallback");
                return uriBuilder.Uri;
            }
        }

        public ApplicationSignInManager SignInManager {
            get => _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            private set => _signInManager = value;
        }

        public ApplicationUserManager UserManager {
            get => _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            private set => _userManager = value;
        }

        [AllowAnonymous]
        public ActionResult Facebook() {
            var fb = new FacebookClient();
            var loginUrl = fb.GetLoginUrl(new {
                client_id = "1780363828875340",
                client_secret = "f8257a6183b1f5b99a23302dece07449",
                redirect_uri = RedirectUri.AbsoluteUri,
                response_type = "code",
                scope = "email"
            });

            return Redirect(loginUrl.AbsoluteUri);
        }

        public ActionResult FacebookCallback(string code) {
            var fb = new FacebookClient();
            dynamic result = fb.Post("oauth/access_token", new {
                client_id = "1780363828875340",
                client_secret = "f8257a6183b1f5b99a23302dece07449",
                redirect_uri = RedirectUri.AbsoluteUri,
                code
            });

            var accessToken = result.access_token;

            // Store the access token in the session for farther use
            Session["AccessToken"] = accessToken;

            // update the facebook client with the access token so
            // we can make requests on behalf of the user
            fb.AccessToken = accessToken;

            // Get the user's information, like email, first name, middle name etc
            dynamic me = fb.Get("me?fields=first_name,middle_name,last_name,id,email");
            string email = me.email;
            string firstname = me.first_name;
            string middlename = me.middle_name;
            string lastname = me.last_name;

            // Set the auth cookie
            FormsAuthentication.SetAuthCookie(email, false);
            return RedirectToAction("Index", "Articles");
        }

        //
        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl) {
            if (string.IsNullOrEmpty(returnUrl) && Request.UrlReferrer != null)
                returnUrl = generalHelper.GetPreviousPageUrl();
            ViewBag.ReturnUrl = returnUrl;

            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(string userName, string password, bool rememberMe, string returnUrl) {
            var model = new LoginViewModel();
            model.UserName = userName;
            model.Password = password;
            model.RememberMe = rememberMe;

            if (!ModelState.IsValid) return View(model);
            //return Json(new { Success = true, Url = returnUrl });
            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result =
                await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, false);
            switch (result) {
                case SignInStatus.Success:
                    return Json(new {Success = true});
                case SignInStatus.LockedOut:
                    return Json(new {Success = false});
                case SignInStatus.RequiresVerification:
                    return Json(new {Success = false});
                case SignInStatus.Failure:
                    return Json(new {Success = false});
                default:
                    return Json(new {Success = false});
            }
        }

        //
        // GET: /Account/Register
        [AllowAnonymous]
        public ActionResult Register() {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult>
            Register(string userName, string mail, string password, string confirmPassword) {
            var model = new RegisterViewModel();
            model.Username = userName;
            model.Email = mail;
            model.Password = password;
            model.ConfirmPassword = confirmPassword;

            if (ModelState.IsValid) {
                // error handling for ajax request
                var errorMessage = "";
                var userDbContext = db.Users;
                if (userDbContext.Any(x => x.UserName == model.Username))
                    errorMessage += "Podana nazwa użytkownika już istnieje!";
                if (userDbContext.Any(x => x.Email == model.Email)) errorMessage += "Podany adres e-mail już istnieje!";
                if (!string.IsNullOrEmpty(errorMessage)) {
                    var data = new {Success = false, Message = errorMessage};
                    return Json(data);
                }

                var user = new ApplicationUser {UserName = model.Username, Email = model.Email};
                var result = await UserManager.CreateAsync(user, model.Password);
                if (result.Succeeded) {
                    var userInfo = new UserProfileInfo();
                    userInfo.Id = new Guid(user.Id);
                    userInfo.DateOfCreation = DateTime.Now;
                    db.UserProfileInfo.Add(userInfo);
                    db.SaveChanges();

                    await SignInManager.SignInAsync(user, false, false);

                    await UserManager.AddToRoleAsync(user.Id, "User");

                    var message = new EmailMessage();
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                    var callbackUrl = Url.Action("ConfirmEmail", "Account", new {userId = user.Id, code},
                        Request.Url.Scheme);

                    message.ToEmail = model.Email;
                    message.Subject = "Potwierdź rejestrację na NEKROPLAZA.PL";
                    message.IsHtml = false;
                    message.Body =
                        string.Format(
                            "Serwus, {0}!!! Jeśli to czytasz, to znaczy, że założyłeś konto na nekroplaza.pl i jesteś przygotowany na potężną dawkę dobroci! Jeszcze jedno małe 'ale' - kliknij w ten link:\n " +
                            callbackUrl + "\naby potwierdzić rejestrację!\nPozdrawiam serdecznie!\nNekro",
                            model.Username);

                    var emailService = new Helpers.SmtpHelpers.EmailService();
                    var status = emailService.SendEmailMessage(message);
                    var data = new {Success = true, Message = ""};
                    return Json(data);
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return RedirectToAction("Index", "Articles");
        }

        [AllowAnonymous]
        public async Task<ActionResult> SendConfirmationMail(string userId, string userMail) {
            var message = new EmailMessage();
            if (string.IsNullOrEmpty(userId)) userId = userHelper.GetCurrentLoggedUserId().ToString();
            var code = await UserManager.GenerateEmailConfirmationTokenAsync(userId);
            var callbackUrl = Url.Action("ConfirmEmail", "Account", new {userId, code}, Request.Url.Scheme);

            message.ToEmail = userMail;
            message.Subject = "Potwierdź rejestrację na NEKROPLAZA.PL";
            message.IsHtml = false;
            message.Body =
                string.Format("Kliknij w ten link:\n " + callbackUrl +
                              "\naby potwierdzić rejestrację!\nPozdrawiam serdecznie!\nNekro");

            var emailService = new Helpers.SmtpHelpers.EmailService();
            var status = emailService.SendEmailMessage(message);
            return RedirectToAction("UserPanel", new {userId = new Guid(userId)});
        }

        //
        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code) {
            if (userId == null || code == null) return View("_HumanumErrareEst");
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            ViewBag.IsAfterConfirmation = result.Succeeded;
            return RedirectToAction("Index", "Articles", new{isAfterConfirmation = result.Succeeded});
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(string mail) {
            var user = db.Users.SingleOrDefault(x => x.Email == mail);

            if (user == null || !await UserManager.IsEmailConfirmedAsync(user.Id)) {
                return Json(false);
            }

            var message = new EmailMessage();
            var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
            var callbackUrl = Url.Action("ResetPassword", "Account", new {userId = user.Id, code},
                Request.Url.Scheme);
            message.ToEmail = mail;
            message.Subject = "Resetacja hasła na NEKROPLAZA.PL";
            message.IsHtml = false;
            message.Body =
                string.Format(
                    "Serwus, {0}!!!\n Jeśli to czytasz, to znaczy, że zapomniałeś hasła do logowania, och Ty bidulo - kliknij w ten link:\n " +
                    callbackUrl + "\naby zresetować hasło do swojego konta!\nPozdrawiam serdecznie!\nNekro", user.UserName);

            var emailService = new Helpers.SmtpHelpers.EmailService();
            var status = emailService.SendEmailMessage(message);
            return Json(true);
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code) {
            ViewBag.ResetCode = code;
            return code == null ? View("_HumanumErrareEst") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(string mail, string password, string code) {
            var user = db.Users.SingleOrDefault(x => x.Email == mail);

            if (user == null) {
                return Json(false);
            }

            var result = await UserManager.ResetPasswordAsync(user.Id, code, password);
            if (result.Succeeded) {
                return RedirectToAction("Login", "Account");
            }

            AddErrors(result);
            return View();
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff() {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            // return empty result because ajax autamatically reloads current page after logout
            return new EmptyResult();
        }

        protected override void Dispose(bool disposing) {
            if (disposing) {
                if (_userManager != null) {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null) {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        public ActionResult UserPanel(string userId) {
            var model = accountService.GetProfileDetails(userId);

            ViewBag.RoleList = model.RolesList;
            return View("UserPanel", model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult AddAvatar(HttpPostedFileBase avatar) {
            if (avatar != null) {
                var errorMessage = "";
                var validImageTypes = new[] {
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (!validImageTypes.Contains(avatar.ContentType))
                    errorMessage += "Nie ma tak - dostępne rozszerzenia masz u góry!";
                if (avatar.ContentLength > 70000) errorMessage += "Obrazek jest za duży - znajdź se mniejszy!";

                if (!string.IsNullOrEmpty(errorMessage)) {
                    var data = new {Success = false, Message = errorMessage};
                    return Json(data);
                }
                else {
                    userHelper.UploadAvatarForUser(userHelper.GetCurrentLoggedUserId(), avatar);
                    var data = new {Success = true, Message = ""};
                    return Json(data);
                }
            }
            return RedirectToAction("UserPanel");
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChangeRole(string role, Guid userId) {
            userHelper.ChangeUserRole(role, userId);
            return RedirectToAction("Users", "Configuration");
        }

        [AllowAnonymous]
        [ValidateInput(false)]
        public ActionResult GetAvatar(Guid userId) {
            try {
                var avatar = userHelper.GetAvatarByUserId(userId);
                if (avatar == null)
                    avatar = userHelper.GetAvatarByUserId(new Guid("d8bf3a8a-dc63-4f71-bf1c-c2ffe5c30b2d"));
                return File(avatar, "image/jpeg");
            }
            catch (Exception ex) {
                return null;
            }
        }

        public ActionResult DeleteAvatar(Guid userId) {
            userHelper.DeleteAvatarByUserId(userId);
            return RedirectToAction("UserPanel");
        }

        public ActionResult DeleteUser(Guid userId) {
            userHelper.DeleteUser(userId);
            return RedirectToAction("Users", "Configuration");
        }

        public ActionResult BlockingUser(Guid userId) {
            userHelper.UserBlockade(userId);
            return RedirectToAction("Users", "Configuration");
        }

        public ActionResult DegradeUser(string userId) {
            userHelper.DegradeToUser(new Guid(userId));
            return RedirectToAction("Users", "Configuration");
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult EditProfile(string userMail) {
            var data = new {Success = true};
            accountService.EditProfile(userMail);
            return Json(data);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult SendMessage(string receiver, string title, string body, bool isNewThread, Guid? threadId,
            string userName, bool isMessageView = false) {
            accountService.SendMessage(receiver, title, body, isNewThread, threadId);
            if (isMessageView) {
                var modelMessage = accountService.GetMessagesDetails();
                return PartialView("Messages", modelMessage);
            }
            var model = accountService.GetProfileDetails(userName);
            return PartialView("UserPanel", model);
        }

        // POST: /Manage/ChangePassword
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ChangePassword(ChangePasswordViewModel model) {
            var result =
                await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);
            if (result.Succeeded) {
                var user = await UserManager.FindByIdAsync(User.Identity.GetUserId());
                if (user != null) await SignInManager.SignInAsync(user, false, false);
                return Json(result);
            }
            AddErrors(result);
            return Json(result);
        }

        public ActionResult Messages() {
            var model = accountService.GetMessagesDetails();
            return PartialView("Messages", model);
        }

        public ActionResult MarkThreadMessagesAsReceived(Guid threadId) {
            accountService.MarkAllThreadMessagesAsReceived(threadId);
            //var model = documentService.GetTopLogoDetails();
            return Json(true);
        }

        #region Helpers

        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;

        private void AddErrors(IdentityResult result) {
            foreach (var error in result.Errors) ModelState.AddModelError("", error);
        }

        private ActionResult RedirectToLocal(string returnUrl) {
            if (Url.IsLocalUrl(returnUrl)) return Redirect(returnUrl);
            return RedirectToAction("Index", "Articles");
        }

        #endregion
    }
}