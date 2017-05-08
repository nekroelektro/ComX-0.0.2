jQuery(document).ready(function ($) {
    // USER DELETE/BLOCK HANDLING
    var userIdentificator;
    var blockOrDelete;
    $('.popupUserDelete').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });
    $('.popupUserDelete').click(function () {
        userIdentificator = $(this).data('id').toString();
        blockOrDelete = 'delete';
    });
    $(document).on('click', '.btnConfirmDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        if (blockOrDelete == 'delete') {
            window.location.href = "/Account/DeleteUser/?userId=" + userIdentificator;
        } else {
            $.ajax({
                url: "/Account/BlockingUser/",
                type: "POST",
                data: { 'userId': userIdentificator}
            })
            .done(function (response) {
                    location.reload(true);
                });
        }
    });
    $(document).on('click', '.btnCancelDeletion, .btnCancelEdit', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('.popupUserBlock').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });
    $('.popupUserBlock').click(function () {
        userIdentificator = $(this).data('id').toString();
        blockOrDelete = 'block';
    });

    // Add range handling
    $('#addUserRangeSubmitButton').click(function() {
        var userRange = $('[name=RoleId]').val();
        var user = $('.popupUserBlock').data('id').toString();
        $.ajax({
            url: "/Account/ChangeRole/",
            type: "POST",
            data: {'role' : userRange, 'userId': user }
        })
            .done(function (response) {
                location.reload(true);
            });
    });

    // Degrade user handling
    $('.popupUserDegrade').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });

    $('.popupUserDegrade').click(function () {
        userIdentificator = $(this).data('id').toString();
    });

    $(document).on('click', '.btnConfirmDegradation', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        $.ajax({
            url: "/Account/DegradeUser/",
            type: "POST",
            data: {'userId': userIdentificator }
        })
            .done(function (response) {
                location.reload(true);
            });
    });

    // Re-Sending code to mail handling
    $('.reconfirmationLink').click(function () {
        var userMailAdress = $('#userProfileMailAdress').text();
        var successMessage = "<p class='sucMessageAjaxConfirmationCode' style='color: red'>Czekaj...</p>";
        $('.userProfileOwnSection').append(successMessage);
        $.ajax({
            url: "/Account/SendConfirmationMail/",
            type: "POST",
            data: { 'userId': '', 'userMail': userMailAdress }
        })
            .done(function (response) {
                $('.sucMessageAjaxConfirmationCode').detach();
                successMessage = "<p class='sucMessageAjaxConfirmationCode' style='color: green'>WYSŁANO!</p>";
                $('.userProfileOwnSection').append(successMessage);
                setTimeout(function() {
                        $('.sucMessageAjaxConfirmationCode').fadeOut("slow");
                    },
                    3000);
            });
    });

    // HANDLING AVATAR UP AND DELETE
    var form;
    var formData;
    var handleAvatarUp = function () {
        // Serialize form data for injection to .NET
        form = $('.avUpFormContainer');
        formData = new FormData(form[0]);

        // Get image from control
        var fileInput = document.getElementById('imgUp');
        if (fileInput != null) {
            var file = fileInput.files[0];
            formData.set('avatar', file);
        }
    }

    var handleAvatarUpErrors = function (isResponse, message) {
        var errorString = '';
        if (isResponse) {
            var stringList = message.split('!');
            $.each(stringList,
            function (i, item) {
                var errorMessageElement = "<p>" + item + "</p>";
                errorString = errorString + errorMessageElement;
            });
        } else {
            if ($('[name=avatar]').val() == '') {
                errorString = "<p>No... ale musisz coś dodać!</p>";
            }
        }
        if (errorString != '') {
            if ($('.editErrorMessage').length > 0) {
                $('.editErrorMessage').detach();
            }
            $('.editErrorContainer').hide().append("<div class='editErrorMessage'>" + errorString + "</div>").fadeIn("fast");
            return false;
        } else {
            return true;
        }
    }

    $('#userProfileAvatarUp').click(function () {
        if (handleAvatarUpErrors(false)) {
            handleAvatarUp();
            $.ajax({
                url: "/Account/AddAvatar/",
                type: "POST",
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false, //for file upload
                data: formData,
                success: function (results) {
                    if (results.Success) {
                        location.reload(true);
                    } else {
                        handleAvatarUpErrors(true, results.Message);
                        return;
                    }
                }
            });
        }
    });

    $('.popupAvatarDelete').click(function () {
        userIdentificator = $(this).data('id').toString();
        blockOrDelete = 'deleteAvatar';
    });

    $(document).on('click', '.btnConfirmDeletionAvatar', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        window.location.href = "/Account/DeleteAvatar/?userId=" + userIdentificator;
    });

    // HANDLING PROFILE EDIT
    $('.profileEditDetails').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });

    function isEmailFormatCorrect(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('.btnConfirmEdit').click(function () {
        var newMail = $('[name=userMailInput]').val();
        if (isEmailFormatCorrect(newMail)) {
            $.ajax({
                url: "/Account/EditProfile/",
                type: "POST",
                data: { 'userMail': newMail}
            })
            .done(function (response) {
                location.reload(true);
            });
        } else {
            if ($('.editErrorMessage').length > 0) {
                $('.editErrorMessage').detach();
            }
            $('.modalPopupButtons').append("<div class='editErrorContainer'>" +
                "<div class='editErrorMessage'>Coś nie gra - może mail niepoprawny...</div> </div>").fadeIn("fast");
        }
    });
});