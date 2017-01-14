jQuery(document).ready(function($) {
    $('.popupLoginModal, .popupRegisterModal').magnificPopup({
        type: 'inline',
        preloader: false,
        modal: true,
        closeBtnInside: true,
        showCloseBtn: true
    });

    $('.popupLoginModal').click(function () {
        $.ajax({
            url: "/Account/Login/",
            method: 'GET',
            success: function (data) {
                $('.loginContentInModal').html(data);
            }
        });
    });

    $('.popupRegisterModal').click(function () {
        $.ajax({
            url: "/Account/Register/",
            method: 'GET',
            success: function (data) {
                $('.registerContentInModal').html(data);
            }
        });
    });

    $(document).on('click', '.popupClose', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});