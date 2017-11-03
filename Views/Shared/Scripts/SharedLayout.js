function SharedLayout(config) {
    SharedLayout.Control = config;
    SharedLayout.Init();
    SharedLayout.SubmitGoogleTracking();
};

SharedLayout.Init = function () {
    $(window).on('load', function () {
        $("#" + SharedLayout.Control.LoadingOverlay).hide();
        if (SharedLayout.Control.IsAfterConfirmation == "True") {
            SharedLayout.ShowConfirmationMessage();
        }
    });

    var lazyConfig = {
        Container: $('.bodyContent')
    };
    NekroController.NekroLazy(lazyConfig);

    $("#" + SharedLayout.Control.ScrollTopArrow).css({
        'right': $("#" + SharedLayout.Control.NekroPanel).width() + 10,
        'bottom': $("#" + SharedLayout.Control.IndexFooter).height()
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) {
            $("#" + SharedLayout.Control.ScrollTopArrow).fadeIn(200);
        } else {
            $("#" + SharedLayout.Control.ScrollTopArrow).fadeOut(200);
        }
    });

    $("#" + SharedLayout.Control.ScrollTopArrow).click(function() {
        $('body,html').animate({
                scrollTop: 0
            },
            500);
    });
};

SharedLayout.ShowConfirmationMessage = function () {
    $("." + SharedLayout.Control.ConfirmationOverlayContainer).append("<div>REJESTRACJA ZOSTAŁA POTWIERDZONA</div>");
    $("#" + SharedLayout.Control.ConfirmationOverlay).removeClass('notVisible');
    setTimeout(function() {
        $("#" + SharedLayout.Control.ConfirmationOverlay).addClass('notVisible');
    }, 2500);
}

SharedLayout.SubmitGoogleTracking = function() {
    (function(i, s, o, g, r, a, m) {
        i["GoogleAnalyticsObject"] = r;
        i[r] = i[r] ||
            function() {
                (i[r].q = i[r].q || []).push(arguments);
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
    })(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

    ga("create", "UA-82687708-1", "auto");
    ga("send", "pageview");
};