function SharedSideBar(config) {
    SharedSideBar.Control = config;
    SharedSideBar.Init();

    SharedSideBar.Token = $("[name=__RequestVerificationToken]").val();
};

SharedSideBar.Init = function () {
    $("." + SharedSideBar.Control.SideLogoutAnchor).click(function() {
        SharedSideBar.LogOut();
    });

    $("." + SharedSideBar.Control.LoginConfirmButton).click(function() {
        SharedSideBar.ConfirmLogin();
    });

    $("." + SharedSideBar.Control.RegisterConfirmButton).click(function () {
        SharedSideBar.ConfirmRegistration();
    });

    var searchConfig = {
        Container: $("." + SharedSideBar.Control.SideBarSearchComponent),
        SearchIcon: $("." + SharedSideBar.Control.SideSearchAnchor)
    };
    NekroController.NekroSearch(searchConfig);

    var enterLoginconfig = {
        Scope: "." + SharedSideBar.Control.LoggingForm,
        ElementToClick: "." + SharedSideBar.Control.LoginConfirmButton
    };
    NekroController.NekroEnterClick(enterLoginconfig);

    var enterRegisterconfig = {
        Scope: "." + SharedSideBar.Control.RegistrationForm,
        ElementToClick: "." + SharedSideBar.Control.RegisterConfirmButton
    };
    NekroController.NekroEnterClick(enterRegisterconfig);

    NekroController.NekroNavigator();

    var slideLoginConfig = {
        ElementClicked: $("." + SharedSideBar.Control.SideLoginAnchor),
        ElementToShow: $("." + SharedSideBar.Control.SideLoginBody)
    };
    NekroController.ShowDivNicely(slideLoginConfig);

    var slideRegisterConfig = {
        ElementClicked: $("." + SharedSideBar.Control.SideRegisterAnchor),
        ElementToShow: $("." + SharedSideBar.Control.SideRegisterBody)
    };
    NekroController.ShowDivNicely(slideRegisterConfig);

    var slideProfileConfig = {
        ElementClicked: $("." + SharedSideBar.Control.SideProfileAnchor),
        ElementToShow: $("." + SharedSideBar.Control.SideProfileBody)
    };
    NekroController.ShowDivNicely(slideProfileConfig);

    SharedSideBar.AttachLinks();

    SharedSideBar.InitializeSideMenu();
};

SharedSideBar.AttachLinks = function() {
    $("." + SharedSideBar.Control.SideConfigurationAnchor).on("click",
        function() {
            window.location.href = "/Configuration/Articles";
        });

    $("." + SharedSideBar.Control.SideShowProfileAnchor).on("click",
        function() {
            window.location.href = "/Account/UserPanel";
        });

    $("." + SharedSideBar.Control.SideMessagesAnchor).on("click",
        function() {
            window.location.href = "/Account/Messages";
        });

    // CONFIG ANCHORS
    if ($("." + SharedSideBar.Control.SideConfigSection).length > 0) {
        $("." + SharedSideBar.Control.SideConfigurationArticlesAnchor).on("click",
            function() {
                window.location.href = "/Configuration/Articles";
            });
        $("." + SharedSideBar.Control.SideConfigurationUsersAnchor).on("click",
            function() {
                window.location.href = "/Configuration/Users";
            });
        $("." + SharedSideBar.Control.SideConfigurationCategoriesAnchor).on("click",
            function() {
                window.location.href = "/Configuration/Categories";
            });
        $("." + SharedSideBar.Control.SideConfigurationRolesAnchor).on("click",
            function() {
                window.location.href = "/Configuration/Roles";
            });
        $("." + SharedSideBar.Control.SideConfigurationGalleryAnchor).on("click",
            function() {
                window.location.href = "/Configuration/Gallery";
            });
        $("." + SharedSideBar.Control.SideConfigurationSiteSettingsAnchor).on("click",
            function() {
                window.location.href = "/Configuration/SiteSettings";
            });
    };
};

SharedSideBar.InitializeSideMenu = function() {
    $("." + SharedSideBar.Control.SideBarMenuSection + " " + "." + SharedSideBar.Control.SideTitle).on("click",
        function() {
            var subElement = $(this).parent().find("." + SharedSideBar.Control.SideBody);
            var current = $(".currentSideTooltip");
            if (current.length > 0) {
                current.slideUp("fast");
                current.removeClass("currentSideTooltip");
            }
            if (!subElement.is(":visible")) {
                subElement.addClass("currentSideTooltip");
                subElement.css({
                    'position': "absolute",
                    'right': $(".nekroPanel").width() + 10,
                    'width': $(".nekroPanel").width(),
                    'bottom': $(".bottomFooter").height(),
                    'background': "rgba(0, 0, 0, 0.8)"
                });
                subElement.slideDown("slow");
            }
        });
};

SharedSideBar.ConfirmLogin = function() {
    var login = $("[name=userNameInput]").val().trim();
    var password = $("[name=passInput]").val().trim();
    var remember = $("[name=rememberCheckbox]").is(":checked") ? true : false;
    if (login.length < 3 || password.length < 3) {
        SharedSideBar.LoginValidation(false);
        return;
    }
    var loginAjaxConfig = {
        Url: "/Account/Login",
        Method: "POST",
        Params: { 'userName': login, 'password': password, 'rememberMe': remember, '__RequestVerificationToken': SharedSideBar.Token},
        SuccessHandler: SharedSideBar.SuccessLoginHandler
    };
    NekroController.NekroAjaxAction(loginAjaxConfig);
};

SharedSideBar.SuccessLoginHandler = function(result) {
    if (result) {
        location.reload(true);
    } else {
        SharedSideBar.LoginValidation(true);
        return;
    }
};

SharedSideBar.LoginValidation = function (responseError) {
    var messageString;
    if (responseError) {
        messageString =
            "<div class='loginErrorMessage'>Coś się pokiełbasiło. Prawdopodobnie popsułeś - wpisz poprawny login i hasło!</div>";
    } else {
        messageString =
            "<div class='loginErrorMessage'>Musisz uzupełnić oba pola. I to na dodatek poprawnie.</div>";
    }

    if ($("." + SharedSideBar.Control.LoginError).length > 0) {
        $("." + SharedSideBar.Control.LoginError).detach();
    }
    $("." + SharedSideBar.Control.LoginErrorMessageContainer).hide().append(messageString).fadeIn("fast");
};

SharedSideBar.ConfirmRegistration = function() {
    var errorText = "";
    var login = $("[name=userNameRegInput]").val().trim();
    var mail = $("[name=mailRegInput]").val().trim();
    var password = $("[name=passwordRegInput]").val().trim();
    var confirmPassword = $("[name=confirmPasswordRegInput]").val().trim();

    //input error handling for registration
    if (login.length == 0 || mail.length == 0 || password.length == 0 || confirmPassword == 0) {
        errorText = errorText + "Musisz wypełnić wszystkie pola!";
    } else {
        if (login.length < 3 || login.length > 25) {
            errorText = errorText + "Login musi mieć przynajmniej 3 znaki, ale nie więcej niż 25!";
        }
        if (!NekroParams.CheckEmail(mail)) {
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
        SharedSideBar.RegisterValidation(errorText);
        return;
    }
    var registertAjaxConfig = {
        Url: "/Account/Register",
        Method: "POST",
        Params: {'userName': login, 'mail': mail, 'password': password, 'confirmPassword': confirmPassword, '__RequestVerificationToken': SharedSideBar.Token},
        SuccessHandler: SharedSideBar.SuccessRegisterHandler
    };
    NekroController.NekroAjaxAction(registertAjaxConfig);
};

SharedSideBar.SuccessRegisterHandler = function (result) {
    if (result.Success) {
        location.reload(true);
    } else {
        SharedSideBar.RegisterValidation(result.Message);
        return;
    }
};

SharedSideBar.RegisterValidation = function (errorString) {
    var stringList = errorString.split("!");
    var messageString = "";

    $.each(stringList,
        function (i, item) {
            var errorMessageElement = "<p>" + item + "</p>";
            messageString = messageString + errorMessageElement;
        });

    if ($("." + SharedSideBar.Control.RegisterError).length > 0) {
        $("." + SharedSideBar.Control.RegisterError).detach();
    }
    $("." + SharedSideBar.Control.RegisterErrorMessageContainer).hide()
        .append("<div class='registerErrorMessage'>" + messageString + "</div>").fadeIn("fast");
};

SharedSideBar.LogOut = function () {
    var logoutAjaxConfig = {
        Url: "/Account/LogOff",
        Method: "POST",
        Params: { '__RequestVerificationToken': SharedSideBar.Token }
    };
    NekroController.NekroAjaxAction(logoutAjaxConfig);
};