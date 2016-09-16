jQuery(document).ready(function ($) {
    var categoryIdentificator;
    $('.popupSeriesDelete').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true
    });
    $('.popupSeriesDelete').click(function () {
        categoryIdentificator = $(this).data('id').toString();
    });
    $(document).on('click', '.btnConfirmDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
        window.location.href = '@Url.Action("DeleteSeries", "Configuration")?categoryId=' + categoryIdentificator;
    });
    $(document).on('click', '.btnCancelDeletion', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});