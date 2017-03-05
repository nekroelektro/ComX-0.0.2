﻿jQuery(document).ready(function($) {
    var $loading = $('#loader').hide();

    var searchIcon = $('.logoSearch');
    var $container = $('.logoSection');

    // SEARCH FUNCTIONALITY
    NekroSearch($container, searchIcon);

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
                $('.loginContentInModal').html(data);
            }
        });
    });

    $(document).on('click', '.popupClose', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

    $('#logoImage').on("click",
        function() {
            window.location.href = "/";
        });

    
    $(document)
      .ajaxStart(function () {
          $loading.show();
      })
      .ajaxStop(function () {
          $loading.hide();
      });
});