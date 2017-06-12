$(document).ready(function () {
    var searchConfig = {
        Container: $('.sideBarSearchComponent'),
        SearchIcon: $('.sideSearchAnchor')
    };
    NekroController.NekroSearch(searchConfig);

    var enterLoginconfig = {
        Scope: '.loggingForm',
        ElementToClick: '.loginConfirmButton'
    };
    NekroController.NekroEnterClick(enterLoginconfig);

    var enterRegisterconfig = {
        Scope: '.registrationForm',
        ElementToClick: '.registerConfirmButton'
    }
    NekroController.NekroEnterClick(enterRegisterconfig);
    
    NekroController.NekroNavigator();

    var slideLoginConfig = {
        ElementClicked: $('.sideLoginAnchor'),
        ElementToShow: $('.sideLoginBody')
    };
    NekroController.ShowDivNicely(slideLoginConfig);

    var slideRegisterConfig = {
        ElementClicked: $('.sideRegisterAnchor'),
        ElementToShow: $('.sideRegisterBody')
    };
    NekroController.ShowDivNicely(slideRegisterConfig);

    var slideProfileConfig = {
        ElementClicked: $('.sideProfileAnchor'),
        ElementToShow: $('.sideProfileBody')
    };
    NekroController.ShowDivNicely(slideProfileConfig);

    $('.sideConfigurationAnchor').on("click",
        function() {
            window.location.href = '/Configuration/Articles';
        });

    $('.sideShowProfileAnchor').on("click",
        function () {
            window.location.href = '/Account/UserPanel';
        });

    $('.sideMessagesAnchor').on("click",
        function () {
            window.location.href = '/Account/Messages';
        });

    $('.sideBarMenuSection .sideTitle').on("click",
        function() {
            var subElement = $(this).parent().find(".sideBody");
            var current = $('.currentSideTooltip');
            if (current.length > 0) {
                current.slideUp('fast');
                current.removeClass('currentSideTooltip');
            }
            if (!subElement.is(":visible")) {
                subElement.addClass('currentSideTooltip');
                subElement.css({
                    'position': 'absolute',
                    'right': $('.nekroPanel').width()+10,
                    'width': $('.nekroPanel').width(),
                    'bottom': 0,
                    'background': 'rgba(0, 0, 0, 0.8)'
                });
                subElement.slideDown('slow');
            }
        });

    // HANDLING SIDEBAR LOGGING
    var token = $('[name=__RequestVerificationToken]').val();
    $('.loginConfirmButton').click(function () {
        var login = $('[name=userNameInput]').val().trim();
        var password = $('[name=passInput]').val().trim();
        var remember = $('[name=rememberCheckbox]').is(':checked') ? true : false;
        if (login.length < 3 || password.length < 3) {
            handleLoginError(false);
            return;
        }
        $.ajax({
            url: "/Account/Login",
            method: "POST",
            data: { 'userName': login, 'password': password, 'rememberMe': remember, '__RequestVerificationToken': token },
            success: function (isOk) {
                if (isOk) {
                    location.reload(true);
                } else {
                    handleLoginError(true);
                    return;
                }
            }
        });
    });

    function handleLoginError(responseError) {
        var messageString;
        if (responseError) {
            messageString = "<div class='loginErrorMessage'>Coś się pokiełbasiło. Prawdopodobnie popsułeś - wpisz poprawny login i hasło!</div>";
        } else {
            messageString = "<div class='loginErrorMessage'>Musisz uzupełnić oba pola. I to na dodatek poprawnie.</div>";
        }

        if ($('.loginErrorMessage').length > 0) {
            $('.loginErrorMessage').detach();
        }
        $('.loginErrorMessageContainer').hide().append(messageString).fadeIn("fast");
    }

    $('.sideLogoutAnchor').on("click",
        function () {
            $.ajax({
                url: "/Account/LogOff",
                method: "POST",
                data: { '__RequestVerificationToken': token },
                success: function () {
                    location.reload(true);
                }
            });
        });

    // Handling side Register
    $('.registerConfirmButton').click(function () {
        var errorText = '';
        var login = $('[name=userNameRegInput]').val().trim();
        var mail = $('[name=mailRegInput]').val().trim();
        var password = $('[name=passwordRegInput]').val().trim();
        var confirmPassword = $('[name=confirmPasswordRegInput]').val().trim();

        //input error handling for registration
        if (login.length == 0 || mail.length == 0 || password.length == 0 || confirmPassword == 0) {
            errorText = errorText + "Musisz wypełnić wszystkie pola!";
        } else {
            if (login.length < 3 || login.length > 25) {
                errorText = errorText + "Login musi mieć przynajmniej 3 znaki, ale nie więcej niż 25!";
            }
            if (!isEmailFormatCorrect(mail)) {
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
            handleRegisterError(errorText);
            return;
        }

        $.ajax({
            url: "/Account/Register",
            method: "POST",
            data: { 'userName': login, 'mail': mail, 'password': password, 'confirmPassword': confirmPassword, '__RequestVerificationToken': token },
            success: function (results) {
                if (results.Success) {
                    location.reload(true);
                } else {
                    handleRegisterError(results.Message);
                    return;
                }
            }
        });
    });

    function handleRegisterError(errorString) {
        var stringList = errorString.split('!');
        var messageString = '';

        $.each(stringList,
            function (i, item) {
                var errorMessageElement = "<p>" + item + "</p>";
                messageString = messageString + errorMessageElement;
            });

        if ($('.registerErrorMessage').length > 0) {
            $('.registerErrorMessage').detach();
        }
        $('.registerErrorMessageContainer').hide().append("<div class='registerErrorMessage'>" + messageString + "</div>").fadeIn("fast");
    }

    function isEmailFormatCorrect(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
});