using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ComX_0._0._2.Helpers;
using ComX_0._0._2.Helpers.SmtpHelpers;
using ComX_0._0._2.Views.Account.Models;
using ComX_0._0._2.Views.Account.Models.DtoModels;
using Facebook;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace ComX_0._0._2.Views.Account.Controller {
    [Authorize]
    public class AccountController : System.Web.Mvc.Controller {
        private readonly ApplicationDbContext db = new ApplicationDbContext();
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
            get { return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>(); }
            private set { _signInManager = value; }
        }

        public ApplicationUserManager UserManager {
            get { return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>(); }
            private set { _userManager = value; }
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
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        //
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl) {
            if (!ModelState.IsValid) {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result =
                await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, false);
            switch (result) {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("_HumanumErrareEst");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new {ReturnUrl = returnUrl, model.RememberMe});
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("LoginError",
                        "Coś się pokiełbasiło. Prawdopodobnie popsułeś - wpisz poprawny login i hasło!");
                    return View(model);
            }
        }

        //
        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe) {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync()) {
                return View("_HumanumErrareEst");
            }
            return View(new VerifyCodeViewModel {Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe});
        }

        //
        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model) {
            if (!ModelState.IsValid) {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result =
                await
                    SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, model.RememberMe,
                        model.RememberBrowser);
            switch (result) {
                case SignInStatus.Success:
                    return RedirectToLocal(model.ReturnUrl);
                case SignInStatus.LockedOut:
                    return View("_HumanumErrareEst");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Invalid code.");
                    return View(model);
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
        public async Task<ActionResult> Register(RegisterViewModel model) {
            if (ModelState.IsValid) {
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
                    return RedirectToAction("Index", "Articles");
                }
                AddErrors(result);
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [AllowAnonymous]
        public async Task<ActionResult> SendConfirmationMail(string userId, string userMail) {
            var message = new EmailMessage();
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
            if (userId == null || code == null) {
                return View("_HumanumErrareEst");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword() {
            return View();
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model) {
            if (ModelState.IsValid) {
                var user = db.Users.SingleOrDefault(x => x.Email == model.Email);
                //var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !await UserManager.IsEmailConfirmedAsync(user.Id)) {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }
                var message = new EmailMessage();
                var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                var callbackUrl = Url.Action("ResetPassword", "Account", new {userId = user.Id, code},
                    Request.Url.Scheme);
                message.ToEmail = model.Email;
                message.Subject = "Przypomnienie hasła na NEKROPLAZA.PL";
                message.IsHtml = false;
                message.Body =
                    string.Format(
                        "Serwus, {0}!!!\n Jeśli to czytasz, to znaczy, że zapomniałeś hasła do logowania, och Ty bidulo - kliknij w ten link:\n " +
                        callbackUrl + "\naby przypomnieć hasło!\nPozdrawiam serdecznie!\nNekro", user.UserName);

                var emailService = new Helpers.SmtpHelpers.EmailService();
                var status = emailService.SendEmailMessage(message);
                return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        //
        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation() {
            return View();
        }

        //
        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code) {
            return code == null ? View("_HumanumErrareEst") : View();
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model) {
            if (!ModelState.IsValid) {
                return View(model);
            }
            var user = db.Users.SingleOrDefault(x => x.Email == model.Email);
            //var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null) {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded) {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation() {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl) {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider,
                Url.Action("ExternalLoginCallback", "Account", new {ReturnUrl = returnUrl}));
        }

        //
        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe) {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null) {
                return View("_HumanumErrareEst");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
            var factorOptions =
                userFactors.Select(purpose => new SelectListItem {Text = purpose, Value = purpose}).ToList();
            return
                View(new SendCodeViewModel {Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe});
        }

        //
        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model) {
            if (!ModelState.IsValid) {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider)) {
                return View("_HumanumErrareEst");
            }
            return RedirectToAction("VerifyCode",
                new {Provider = model.SelectedProvider, model.ReturnUrl, model.RememberMe});
        }

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl) {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null) {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, false);
            switch (result) {
                case SignInStatus.Success:
                    return RedirectToAction("Index", "Articles");
                case SignInStatus.LockedOut:
                    return View("_HumanumErrareEst");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new {ReturnUrl = returnUrl, RememberMe = false});
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    return View("ExternalLoginConfirmation",
                        new ExternalLoginConfirmationViewModel {Email = loginInfo.Email});
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model,
            string returnUrl) {
            if (User.Identity.IsAuthenticated) {
                return RedirectToAction("Index", "Articles");
            }

            if (ModelState.IsValid) {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null) {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser {UserName = info.DefaultUserName, Email = model.Email};
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded) {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded) {
                        await SignInManager.SignInAsync(user, false, false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View("~/Views/Articles/Index.cshtml");
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff() {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Articles");
        }

        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure() {
            return View();
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

        public ActionResult UserPanel(Guid? userId) {
            ApplicationUser user;
            if (userId == null) {
                user = userHelper.GetUserById(userHelper.GetCurrentLoggedUserId());
            }
            else {
                user = userHelper.GetUserById(userId.Value);
            }

            var userInfo = db.UserProfileInfo.Find(new Guid(user.Id));
            var userProfile = new UserProfile();
            userProfile.UserId = new Guid(user.Id);
            userProfile.UserName = user.UserName;
            userProfile.DateOfCreation = userInfo.DateOfCreation.Value;
            userProfile.IsBlocked = userInfo.IsBlocked;
            userProfile.Roles = Guid.Empty;
            userProfile.UserMail = user.Email;
            userProfile.UserAvatar = userInfo.Avatar;
            userProfile.AccoutConfirmed = user.EmailConfirmed;

            ViewBag.RoleList = userHelper.GetRolesToCombo();
            return View(userProfile);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult AddAvatar(HttpPostedFileBase avatar) {
            if (avatar != null) {
                var validImageTypes = new[] {
                    "image/gif",
                    "image/jpeg",
                    "image/pjpeg",
                    "image/png"
                };
                if (!validImageTypes.Contains(avatar.ContentType)) {
                    ModelState.AddModelError("ImageUpload", "Nie ma tak - dostępne rozszerzenia masz u góry.");
                }
                else if (avatar.ContentLength > 80000) {
                    ModelState.AddModelError("ImageUpload", "Za duże!");
                }
                else {
                    userHelper.UploadAvatarForUser(userHelper.GetCurrentLoggedUserId(), avatar);
                }
            }
            return RedirectToAction("UserPanel");
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChangeRole(UserProfile user) {
            //var userRole = db.Roles.First(x => x.Name == role);
            userHelper.ChangeUserRole(user.UserId, user.Roles);
            return RedirectToAction("Users", "Configuration");
        }

        [AllowAnonymous]
        [ValidateInput(false)]
        public ActionResult GetAvatar(Guid userId) {
            try {
                var avatar = userHelper.GetAvatarByUserId(userId);
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

        //To check if user with that username exists during registration
        [AllowAnonymous]
        public async Task<JsonResult> UserNameExists(string userName) {
            var result =
                await UserManager.FindByNameAsync(userName) ??
                await UserManager.FindByEmailAsync(userName);
            return Json(result == null, JsonRequestBehavior.AllowGet);
            //var user = Membership.GetUser(userName);
            //var usr = userHelper.GetUserByName(userName);
            //return Json(usr == null);
        }

        #region Helpers

        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager {
            get { return HttpContext.GetOwinContext().Authentication; }
        }

        private void AddErrors(IdentityResult result) {
            foreach (var error in result.Errors) {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl) {
            if (Url.IsLocalUrl(returnUrl)) {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Articles");
        }

        internal class ChallengeResult : HttpUnauthorizedResult {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null) {
            }

            public ChallengeResult(string provider, string redirectUri, string userId) {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context) {
                var properties = new AuthenticationProperties {RedirectUri = RedirectUri};
                if (UserId != null) {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }

        #endregion
    }
}