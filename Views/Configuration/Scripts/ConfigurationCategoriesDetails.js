jQuery(document).ready(function ($) {
    var categoryIdentificator;
    $('.popupCategoryDelete').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });
    $('.popupCategoryDelete').click(function () {
        categoryIdentificator = $(this).data('id').toString();
    });
    $(document).on('click', '.btnConfirmDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        window.location.href = "/Configuration/DeleteCategory?categoryId=" + categoryIdentificator;
    });
    $(document).on('click', '.btnCancelDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});