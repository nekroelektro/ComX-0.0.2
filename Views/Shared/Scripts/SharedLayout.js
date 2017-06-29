function SharedLayout(config) {
    SharedLayout.Control = config;
    SharedLayout.Init();
    SharedLayout.SubmitGoogleTracking();
};

SharedLayout.Init = function () {
    $(window).on('load', function () {
        $("#" + SharedLayout.Control.LoadingOverlay).fadeOut(1000);
    });

    $("#" + SharedLayout.Control.LogoImage).on({
        "mouseover": function() {
            this.src = "/Content/images/logoNew17green.png";
        },
        "mouseout": function() {
            this.src = "/Content/images/logoNew17.png";
        }
    });

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