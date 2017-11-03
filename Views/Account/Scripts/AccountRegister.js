function AccountRegister(config) {
    AccountRegister.Control = config;
    AccountRegister.Init();

    AccountRegister.Token = $('[name=__RequestVerificationToken]').val();
};

AccountRegister.Init = function() {
    $("." + AccountRegister.Control.RegisterConfirmButton).click(function () {
        AccountRegister.ConfirmRegistration();
    });

    var enterRegisterconfig = {
        Scope: "." + AccountRegister.Control.RegistrationForm,
        ElementToClick: "." + AccountRegister.Control.RegisterConfirmButton
    };
    NekroController.NekroEnterClick(enterRegisterconfig);
}

AccountRegister.ConfirmRegistration = function () {
    var errorText = "";
    var login = $("[name=" + AccountRegister.Control.RegisterNameInput + "]").val().trim();
    var mail = $("[name=" + AccountRegister.Control.RegisterMailInput + "]").val().trim();
    var password = $("[name=" + AccountRegister.Control.RegisterPassInput + "]").val().trim();
    var confirmPassword = $("[name=" + AccountRegister.Control.RegisterConfirmPassInput + "]").val().trim();

    //input error handling for registration
    if (login.length == 0 || mail.length == 0 || password.length == 0 || confirmPassword == 0) {
        errorText = errorText + "Musisz wypełnić wszystkie pola!";
    } else {
        if (login.length < 3 || login.length > 25) {
            errorText = errorText + "Login musi mieć przynajmniej 3 znaki, ale nie więcej niż 25!";
        }
        if (!NekroHelper.CheckEmail(mail)) {
            errorText = errorText + "Ten mail wygląda na kaprawy, popraw go lepiej!";
        }
        if (password.length < 6) {
            errorText = errorText + "Hasło musi mieć przynajmniej 6 znaków!";
        }
        if (password != confirmPassword) {
            errorText = errorText + "Hasło i jego potwierdzenie ewidentnie nie są takie same";
        }
    }
    if (errorText.length > 0) {
        AccountRegister.RegisterValidation(errorText);
        return;
    }
    var registertAjaxConfig = {
        Url: "/Account/Register",
        Method: "POST",
        Params: { 'userName': login, 'mail': mail, 'password': password, 'confirmPassword': confirmPassword, '__RequestVerificationToken': SharedSideBar.Token },
        SuccessHandler: AccountRegister.SuccessRegisterHandler
    };
    NekroController.NekroAjaxAction(registertAjaxConfig);
};

AccountRegister.RegisterValidation = function (errorString) {
    var stringList = errorString.split("!");
    var messageString = "";

    $.each(stringList,
        function (i, item) {
            var errorMessageElement = "<p>" + item + "</p>";
            messageString = messageString + errorMessageElement;
        });

    if ($("." + AccountRegister.Control.RegisterError).length > 0) {
        $("." + AccountRegister.Control.RegisterError).detach();
    }
    $("." + AccountRegister.Control.RegisterErrorMessageContainer).hide()
        .append("<div class='registerErrorMessageExternal'>" + messageString + "</div>").fadeIn("fast");
};

AccountRegister.SuccessRegisterHandler = function (result) {
    if (result.Success) {
        window.location.href = "/Account/UserPanel";
    } else {
        AccountRegister.RegisterValidation(result.Message);
        return;
    }
};