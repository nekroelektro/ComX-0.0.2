function AccountUserPanel(config) {
    AccountUserPanel.Control = config;
    AccountUserPanel.Init();

    AccountUserPanel.BlockOrDelete = "";
    AccountUserPanel.UserId = "";
    AccountUserPanel.RedirectContent = "";
    AccountUserPanel.FormData = "";

    AccountUserPanel.ChangePassForm = '';
    AccountUserPanel.ChangePassFormData = '';
}

AccountUserPanel.Init = function () {
    $('.' + AccountUserPanel.Control.ReconfirmationLink).click(function () {
        AccountUserPanel.HandleWelcomeMailReconfirmation();
    });

    $('#' + AccountUserPanel.Control.AddUserRangeSubmitButton).click(function () {
        AccountUserPanel.AddUserRange();
    });

    $('.' + AccountUserPanel.Control.BtnMessageSendConfirmation).click(function () {
        //refresh messages view only
        AccountUserPanel.RefreshMessages();
    });

    $('.' + AccountUserPanel.Control.PopupAvatarDelete).click(function () {
        AccountUserPanel.UserId = $(this).data('id').toString();
        AccountUserPanel.BlockOrDelete = 'deleteAvatar';
    });

    $('.' + AccountUserPanel.Control.PopupUserDelete).click(function () {
        AccountUserPanel.UserId = $(this).data('id').toString();
        AccountUserPanel.BlockOrDelete = 'delete';
    });

    $('.' + AccountUserPanel.Control.PopupUserBlock).click(function () {
        AccountUserPanel.UserId = $(this).data('id').toString();
        AccountUserPanel.BlockOrDelete = 'block';
    });

    $('.' + AccountUserPanel.Control.PopupUserDegrade).click(function () {
        AccountUserPanel.UserId = $(this).data('id').toString();
    });

    $('.' + AccountUserPanel.Control.BtnConfirmDeletion).click(function () {
        AccountUserPanel.ConfirmUserDeletion();
    });

    $('.' + AccountUserPanel.Control.BtnConfirmDegradation).click(function () {
        AccountUserPanel.ConfirmUserDegradation();
    });

    $('.' + AccountUserPanel.Control.SendPrivateMessage).click(function () {
        $(this).hide('slow');
        AccountUserPanel.OpenProfilePrivateMessage();
    });

    $('.' + AccountUserPanel.Control.BtnCancelSendMessage).click(function () {
        AccountUserPanel.CancelSendMessage();
    });
    
    $('.' + AccountUserPanel.Control.BtnConfirmEdit).click(function () {
        AccountUserPanel.ConfirmProfileEdit();
    });

    $('.' + AccountUserPanel.Control.BtnConfirmChangePass).click(function () {
        AccountUserPanel.ConfirmChangePassword();
    });

    $('.' + AccountUserPanel.Control.BtnConfirmSendMessage).click(function () {
        AccountUserPanel.SendProfileMessage($(this));
    });

    $('.' + AccountUserPanel.Control.BtnConfirmDeletionAvatar).click(function () {
        AccountUserPanel.ConfirmAvatarDeletion();
    });

    $('#' + AccountUserPanel.Control.UserProfileAvatarUp).click(function () {
        AccountUserPanel.AvatarUpload();
    });

    // POPUPS
    var messageSuccessPopConfig = {
        Title: "STATUS PRYWATNEJ WIADOMOŚCI",
        ClickedElement: $("." + AccountUserPanel.Control.MessageSuccessModalAnchor),
        ContainerElement: $('#' + AccountUserPanel.Control.MessageSuccessModal1),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(messageSuccessPopConfig);

    var deleteUserPopConfig = {
        Title: "USUŃ UŻYTKOWNIKA",
        ClickedElement: $("." + AccountUserPanel.Control.PopupUserDelete),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupUserDelete),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(deleteUserPopConfig);

    var blockUserPopConfig = {
        Title: "ZABLOKUJ UŻYTKOWNIKA",
        ClickedElement: $("." + AccountUserPanel.Control.PopupUserBlock),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupUserBlock),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(blockUserPopConfig);

    var degradeUserPopConfig = {
        Title: "ZDEGRADUJ UŻYTKOWNIKA",
        ClickedElement: $("." + AccountUserPanel.Control.PopupUserDegrade),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupUserDegrade),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(degradeUserPopConfig);

    var editUserPopConfig = {
        Title: "EDYTUJ PROFIL",
        ClickedElement: $("." + AccountUserPanel.Control.ProfileEditDetails),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupEditProfile),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(editUserPopConfig);

    var avatarDeleteUserPopConfig = {
        Title: "USUŃ AWATARA",
        ClickedElement: $("." + AccountUserPanel.Control.PopupAvatarDelete),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupAvatarDelete),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(avatarDeleteUserPopConfig);

    var passwordChangeUserPopConfig = {
        Title: "ZMIEŃ HASŁO",
        ClickedElement: $("." + AccountUserPanel.Control.PopupChangePassword),
        ContainerElement: $('#' + AccountUserPanel.Control.PopupChangePassword),
        Modal: true,
        AutoOpen: false,
        ClearBeforeClose: true
    };
    NekroController.NekroPop(passwordChangeUserPopConfig);
};

AccountUserPanel.HandleWelcomeMailReconfirmation = function() {
    var userMailAdress = $('#' + AccountUserPanel.Control.UserProfileMailAdress).text();
    var successMessage = "<p class='sucMessageAjaxConfirmationCode' style='color: red'>Czekaj...</p>";
    $('.' + AccountUserPanel.Control.UserProfileOwnSection).append(successMessage);
    $.ajax({
            url: "/Account/SendConfirmationMail/",
            type: "POST",
            data: { 'userId': '', 'userMail': userMailAdress }
        })
        .done(function (response) {
            $('.' + AccountUserPanel.Control.SucMessageAjaxConfirmationCode).detach();
            successMessage = "<p class='sucMessageAjaxConfirmationCode' style='color: green'>WYSŁANO!</p>";
            $('.' + AccountUserPanel.Control.UserProfileOwnSection).append(successMessage);
            setTimeout(function () {
                $('.' + AccountUserPanel.Control.SucMessageAjaxConfirmationCode).fadeOut("slow");
                },
                3000);
        });
};

AccountUserPanel.AddUserRange = function() {
    var userRange = $('[name=RoleId]').val();
    var user = $('.' + AccountUserPanel.Control.PopupUserBlock).data('id').toString();
    $.ajax({
            url: "/Account/ChangeRole/",
            type: "POST",
            data: { 'role': userRange, 'userId': user }
        })
        .done(function (response) {
            location.reload(true);
        });
};

AccountUserPanel.ConfirmUserDeletion = function() {
    $('.' + AccountUserPanel.Control.ShutNekroPop).click();
    if (AccountUserPanel.BlockOrDelete == 'delete') {
        window.location.href = "/Account/DeleteUser/?userId=" + AccountUserPanel.UserId;
    } else {
        $.ajax({
                url: "/Account/BlockingUser/",
                type: "POST",
                data: { 'userId': AccountUserPanel.UserId }
            })
            .done(function (response) {
                location.reload(true);
            });
    }
};

AccountUserPanel.ConfirmUserDegradation = function() {
    $('.' + AccountUserPanel.Control.ShutNekroPop).click();
    $.ajax({
            url: "/Account/DegradeUser/",
            type: "POST",
            data: { 'userId': AccountUserPanel.UserId }
        })
        .done(function (response) {
            location.reload(true);
        });
};

AccountUserPanel.ConfirmProfileEdit = function() {
    var newMail = $('[name=userMailInput]').val();
    if (NekroHelper.CheckEmail(newMail)) {
        $.ajax({
                url: "/Account/EditProfile/",
                type: "POST",
                data: { 'userMail': newMail }
            })
            .done(function(response) {
                location.reload(true);
            });
    } else {
        if ($('.' + AccountUserPanel.Control.EditErrorMessage).length > 0) {
            $('.' + AccountUserPanel.Control.EditErrorMessage).detach();
        }
        $('.' + AccountUserPanel.Control.ModalPopupButtons).append("<div class='editErrorContainer'>" +
            "<div class='editErrorMessage'>Coś nie gra - może mail niepoprawny...</div> </div>").fadeIn("fast");
    }
};

AccountUserPanel.ConfirmChangePassword = function () {
    var oldPass = $('#' + AccountUserPanel.Control.PassChangePresentPass).val();
    var newPass = $('#' + AccountUserPanel.Control.PassChangeNewPass).val();
    var confPass = $('#' + AccountUserPanel.Control.PassChangeConfirmNewPass).val();
    if (oldPass.length > 0 && newPass.length >= 6 && newPass === confPass) {
        AccountUserPanel.GetChangePasswordForm();
        $.ajax({
                url: "/Account/ChangePassword/",
                type: "POST",
                data: AccountUserPanel.ChangePassFormData,
                processData: false,
                contentType: false,
                dataType: "json"
            })
            .done(function (response) {
                if (response.Succeeded == false) {
                    AccountUserPanel.HandleChangePassError(true);
                } else {
                    NekroHelper.CloseCurrentPopup();
                    NekroHelper.ShowStatusMessagePopup($('#' + AccountUserPanel.Control.UserPanelModalPopupsContainer), true);
                }
            });
    } else {
        AccountUserPanel.HandleChangePassError(false);
    }
};

AccountUserPanel.GetChangePasswordForm = function() {
    // Serialize form data for injection to .NET
    AccountUserPanel.ChangePassForm = $('#' + AccountUserPanel.Control.ChangePassFormContainer);
    AccountUserPanel.ChangePassFormData = new FormData(AccountUserPanel.ChangePassForm[0]);

    AccountUserPanel.ChangePassFormData.set('OldPassword', $('#' + AccountUserPanel.Control.PassChangePresentPass).val()); 
    AccountUserPanel.ChangePassFormData.set('NewPassword', $('#' + AccountUserPanel.Control.PassChangeNewPass).val()); 
    AccountUserPanel.ChangePassFormData.set('ConfirmPassword', $('#' + AccountUserPanel.Control.PassChangeConfirmNewPass).val()); 
    AccountUserPanel.ChangePassFormData.set('__RequestVerificationToken', SharedSideBar.Token); 
};

AccountUserPanel.HandleChangePassError = function (isModelValid) {
    var errorString = '';
    isModelValid
        ? errorString = "Obecne hasło podałeś nieprawidłowe, wstyd!"
        : errorString = "Pamiętaj, że hasło musi mieć przynajmniej 6 znaków i żeby dwa ostatnie pola były takie same!";
    if ($('.' + AccountUserPanel.Control.EditErrorMessage).length > 0) {
        $('.' + AccountUserPanel.Control.EditErrorMessage).detach();
    }
    $('#' + AccountUserPanel.Control.ChangePassErrorContainer).hide().append("<div class='editErrorContainer'>" +
        "<div class='editErrorMessage'>" + errorString + "</div> </div>").fadeIn("fast");
};

AccountUserPanel.RefreshMessages = function () {
    $("." + AccountUserPanel.Control.ProfileContainer).empty();
    $("." + AccountUserPanel.Control.ProfileContainer).html(AccountUserPanel.RedirectContent);
};

AccountUserPanel.OpenProfilePrivateMessage = function () {
    $('.' + AccountUserPanel.Control.SendMessageContainer).removeClass('hidden');
    $('.' + AccountUserPanel.Control.SendMessageContainer).hide().slideDown('slow');
    var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
    if (editorInstanceEdit) {
        try {
            editorInstanceEdit.destroy(true);
        } catch (e) {
        }
    }
    CKEDITOR.replace('editPrivateMessageContainer');
    $('#' + AccountUserPanel.Control.EditPrivateMessageTitle).focus();
};

AccountUserPanel.CancelSendMessage = function () {
    var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
    if (editorInstanceEdit) {
        try {
            // Chrome plugin error fix
            editorInstanceEdit.focusManager.blur(true);
            editorInstanceEdit.destroy(true);
        } catch (e) {
        }
    }
    $('.' + AccountUserPanel.Control.SendMessageContainer).slideUp('slow',
        function () {
            $('.' + AccountUserPanel.Control.SendMessageContainer).addClass('hidden');
        });
    $('.' + AccountUserPanel.Control.SendPrivateMessage).show('slow');
};

AccountUserPanel.SendProfileMessage = function (control) {
    var user = control.data('id').toString();
    var userName = control.data('name').toString();
    var title = $('[name=editPrivateMessageTitle]').val();
    var body = CKEDITOR.instances['editPrivateMessageContainer'].getData();
    if (body != "" && title != "") {
        $.ajax({
                url: "/Account/SendMessage/",
                type: "POST",
                data: {
                    'receiver': user,
                    'title': title,
                    'body': body,
                    'isNewThread': true,
                    'threadId': null,
                    'userName': userName,
                    'isMessageView': false
                }
            })
            .done(function (response) {
                var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
                if (editorInstanceEdit) {
                    try {
                        // Chrome plugin error fix
                        editorInstanceEdit.focusManager.blur(true);
                        editorInstanceEdit.destroy(true);
                    } catch (e) { }
                }
                AccountUserPanel.RedirectContent = response;
                AccountUserPanel.SendMessageSuccess();
            });
    } else {
        if ($('.' + AccountUserPanel.Control.EditErrorMessage).length > 0) {
            $('.' + AccountUserPanel.Control.EditErrorMessage).detach();
        }
        $('.' + AccountUserPanel.Control.PopupSendMessageGet).append("<div class='editErrorContainer'>" +
            "<div class='editErrorMessage'>Musisz uzupełnić tytuł i treść wiadomości!</div> </div>").fadeIn("fast");
    }
};

AccountUserPanel.SendMessageSuccess = function() {
    $('.' + AccountUserPanel.Control.SendMessageContainer).addClass('hidden');
    $('.' + AccountUserPanel.Control.MessageSuccessModalAnchor).click();
};

AccountUserPanel.ConfirmAvatarDeletion = function() {
    $('.' + AccountUserPanel.Control.ShutNekroPop).click();
    window.location.href = "/Account/DeleteAvatar/?userId=" + AccountUserPanel.UserId;
};

AccountUserPanel.AvatarUpload = function () {
    if (AccountUserPanel.HandleAvatarUploadErrors(false)) {
        AccountUserPanel.HandleAvatarUpload();
        $.ajax({
            url: "/Account/AddAvatar/",
            type: "POST",
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false, //for file upload
            data: AccountUserPanel.FormData,
            success: function (results) {
                if (results.Success) {
                    location.reload(true);
                } else {
                    AccountUserPanel.HandleAvatarUploadErrors(true, results.Message);
                    return;
                }
            }
        });
    }
};

AccountUserPanel.HandleAvatarUpload = function() {
    // Serialize form data for injection to .NET
    var form = $('.' + AccountUserPanel.Control.AvUpFormContainer);
    AccountUserPanel.FormData = new FormData(form[0]);

    // Get image from control
    var fileInput = document.getElementById('imgUp');
    if (fileInput != null) {
        var file = fileInput.files[0];
        AccountUserPanel.FormData.set('avatar', file);
    }
};

AccountUserPanel.HandleAvatarUploadErrors = function (isResponse, message) {
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
        if ($('.' + AccountUserPanel.Control.EditErrorMessage).length > 0) {
            $('.' + AccountUserPanel.Control.EditErrorMessage).detach();
        }
        $('.' + AccountUserPanel.Control.EditErrorContainer).hide().append("<div class='editErrorMessage'>" + errorString + "</div>").fadeIn("fast");
        return false;
    } else {
        return true;
    }
};