function AccountResetPassword(config) {
    AccountResetPassword.Control = config;
    AccountResetPassword.Init();

    AccountResetPassword.Token = $('[name=__RequestVerificationToken]').val();
};

AccountResetPassword.Init = function () {
    $("." + AccountResetPassword.Control.ResetPassConfirmButton).click(function () {
        AccountResetPassword.ConfirmResetPassword();
    });

    var enterResetPassconfig = {
        Scope: "." + AccountResetPassword.Control.ResetPassForm,
        ElementToClick: "." + AccountResetPassword.Control.ResetPassConfirmButton
    };
    NekroController.NekroEnterClick(enterResetPassconfig);
};

AccountResetPassword.ConfirmResetPassword = function() {
    var mail = $("#" + AccountResetPassword.Control.ResetPassMail).val().trim();
    var password = $("#" + AccountResetPassword.Control.ResetPassNew).val().trim();
    var confirm = $("#" + AccountResetPassword.Control.ResetPassConfirm).val().trim();
    if (password.length < 6 || password.length < 6 || mail.length == 0 || !NekroHelper.CheckEmail(mail) || password !== confirm) {
        AccountResetPassword.HandleForgotPasswordError(false);
        return;
    }
    var resetAjaxConfig = {
        Url: "/Account/ResetPassword",
        Method: "POST",
        Params: { 'mail': mail, 'password': password, 'code': AccountResetPassword.Control.ResetCode, '__RequestVerificationToken': AccountResetPassword.Token },
        SuccessHandler: AccountResetPassword.SuccessResetPassHandler
    };
    NekroController.NekroAjaxAction(resetAjaxConfig);
};

AccountResetPassword.SuccessResetPassHandler = function (success) {
    if (success) {
        location.href = "/Account/UserPanel";
    } else {
        AccountResetPassword.HandleForgotPasswordError(true);
    }
};

AccountResetPassword.HandleForgotPasswordError = function (isModelValid) {
    var errorString = '';
    isModelValid
        ? errorString = "Coś poszło nie tak - nieprawidłowy e-mail lub sesja resetowania hasła wygasła i musisz powtórzyć procedurę."
        : errorString = "Uzupełnij poprawnie wszystkie pola! Hasło musi mieć przynajmniej 6 znaków!";
    if ($('.' + AccountResetPassword.Control.ResetPassErrorMessage).length > 0) {
        $('.' + AccountResetPassword.Control.ResetPassErrorMessage).detach();
    }
    $('#' + AccountResetPassword.Control.ResetPassErrorMessageContainer).hide().append("<div class='editErrorContainer'>" +
        "<div class='resetPassErrorMessage'>" + errorString + "</div> </div>").fadeIn("fast");
};