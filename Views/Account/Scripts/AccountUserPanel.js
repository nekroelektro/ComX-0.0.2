jQuery(document).ready(function ($) {
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
            window.location.href = "/Account/BlockingUser/?userId=" + userIdentificator;
        }
    });
    $(document).on('click', '.btnCancelDeletion', function (e) {
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
    $('.popupAvatarDelete').click(function () {
        userIdentificator = $(this).data('id').toString();
        blockOrDelete = 'deleteAvatar';
    });

    $(document).on('click', '.btnConfirmDeletionAvatar', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        window.location.href = "/Account/DeleteAvatar/?userId=" + userIdentificator;
    });
});