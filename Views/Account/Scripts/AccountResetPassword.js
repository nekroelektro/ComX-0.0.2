function AccountResetPassword(config) {
    AccountResetPassword.Control = config;
    AccountResetPassword.Init();

    AccountResetPassword.Token = $('[name=__RequestVerificationToken]').val();
};

AccountLogin.Init = function () {
    $("." + AccountLogin.Control.LoginConfirmButton).click(function () {
        AccountLogin.ConfirmLogin();
    });

    $("." + AccountLogin.Control.ExternalForgotPasswordAnchor).click(function () {
        $("." + SharedSideBar.Control.PopupForgotPassword).click();
    });

    var enterLoginExternalconfig = {
        Scope: "." + AccountLogin.Control.LoggingForm,
        ElementToClick: "." + AccountLogin.Control.LoginConfirmButton
    };
    NekroController.NekroEnterClick(enterLoginExternalconfig);
};

AccountLogin.ConfirmLogin = function() {
    var login = $("[name=" + AccountLogin.Control.LoginNameInput + "]").val().trim();
    var password = $("[name=" + AccountLogin.Control.LoginPasswordInput + "]").val().trim();
    var remember = $("[name=" + AccountLogin.Control.LoginRememberCheck + "]").is(":checked") ? true : false;
    if (login.length < 3 || password.length < 3) {
        AccountLogin.LoginValidation(false);
        return;
    }
    var loginAjaxConfig = {
        Url: "/Account/Login",
        Method: "POST",
        Params: { 'userName': login, 'password': password, 'rememberMe': remember, 'returnUrl': window.location.search.substring(1), '__RequestVerificationToken': AccountLogin.Token },
        SuccessHandler: AccountLogin.SuccessLoginHandler
    };
    NekroController.NekroAjaxAction(loginAjaxConfig);
};

AccountLogin.SuccessLoginHandler = function (result) {
    if (result.Success == true) {
        if (AccountLogin.Control.ReturnUrl != "") {
            window.location.href = AccountLogin.Control.ReturnUrl;
        } else {
            location.reload(true);
        }
    } else {
        AccountLogin.LoginValidation(true);
        return;
    }
};

AccountLogin.LoginValidation = function (responseError) {
    var messageString;
    if (responseError) {
        messageString =
            "<div class='loginErrorMessageExternal'>Coś się pokiełbasiło. Prawdopodobnie popsułeś - wpisz poprawny login i hasło!</div>";
    } else {
        messageString =
            "<div class='loginErrorMessageExternal'>Musisz uzupełnić oba pola. I to na dodatek poprawnie.</div>";
    }

    if ($("." + AccountLogin.Control.LoginError).length > 0) {
        $("." + AccountLogin.Control.LoginError).detach();
    }
    $("." + AccountLogin.Control.LoginErrorMessageContainer).hide().append(messageString).fadeIn("fast");
};