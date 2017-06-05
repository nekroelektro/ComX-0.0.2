jQuery(document).ready(function ($) {
    var token = $('[name=__RequestVerificationToken]').val();
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
            data: { 'userName': login, 'mail' : mail, 'password': password, 'confirmPassword': confirmPassword, '__RequestVerificationToken': token },
            success: function (results) {
                if (results.Success) {
                    $('.popupClose').click();
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
            function(i, item) {
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

    var config = {
        Scope: '.registrationContainer',
        ElementToClick: '.registerConfirmButton'
    }
    NekroController.NekroEnterClick(config);
});