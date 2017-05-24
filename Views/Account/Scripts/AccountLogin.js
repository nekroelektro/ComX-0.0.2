jQuery(document).ready(function ($) {
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
                    $('.popupClose').click();
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

    var config = {
        Scope: '.loginContainer',
        ElementToClick: '.loginConfirmButton'
    }
    NekroEnterClick(config);
});