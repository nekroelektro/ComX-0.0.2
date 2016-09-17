jQuery(document).ready(function ($) {
    var roleIdentificator;
    $('.popupRoleDelete').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });
    $('.popupRoleDelete').click(function () {
        roleIdentificator = $(this).data('id').toString();
    });
    $(document).on('click', '.btnConfirmDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        window.location.href = "/Configuration/DeleteRole?roleId=" + roleIdentificator;
    });
    $(document).on('click', '.btnCancelDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});