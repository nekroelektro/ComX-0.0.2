(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7";
    fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));

(function(i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject"] = r;
    i[r] = i[r] ||
        function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");

ga("create", "UA-82687708-1", "auto");
ga("send", "pageview");

$(document).ready(function() {
    $(".topDetailPanelButtons").sticky({ topSpacing: 60, zIndex: 5 });

    var postsheight = $(window).height()/2;
    $('.articlesIndexTable').css('height', postsheight);
    $('.indexSingleArticleContainer').css('height', postsheight / 2);

    var currentCategory = $("#categoryNameContainer").val();
    if (currentCategory == "") {
        currentCategory = "Pamiętnik";
    }

    $(".topNavigationItem:contains(" + currentCategory + ")").css({
        backgroundColor: "#2B823C",
        color: "white"
    });

    // Handling of document deletion
    $(".popupDocumentDelete").magnificPopup({
        type: "inline",
        preloader: false,
        modal: true
    });

    $(document).on("click",
        ".btnCancelDelete",
        function(e) {
            e.preventDefault();
            $.magnificPopup.close();
        });

    $(".submitDeleteDocumentForm").click(function () {
        var artId = $(this).data('id').toString();
        var isDiary = $(this).data('diary').toString();
        $.ajax({
            url: "/Articles/Delete/",
            type: "POST",
            data: {'id': artId, 'isDiary': isDiary }
        }).done(function (response) {
            $.magnificPopup.close();
            window.location.href = response.Url;
        });
    });

    // For wide article image and moving sidebar under article image
    var bannerPanel = $(".detailsBannerPanel");
    if (bannerPanel.length > 0) {
        //make background image from image container of article details
        var backgroundImageSrc = $(".bannerPanelDetailsMainImage img").attr("src");
        $("body").css({
            'background-image': "url(" + backgroundImageSrc + ")",
            'background-repeat': "no-repeat",
            'background-attachment': "fixed",
            'background-size': "100% 100%"
        });
        //$(".elementsToPush").css("margin-top", 0);

        $(".bannerPanelImageMain").animate({
                height: $(".detailsBannerPanel").height(),
                position: "absolute",
                top: 0
            },
            500);

        var windowScreen = $(window);
        bannerPanel.css("height", windowScreen.height() - $(".bottomFooter ").height());
        var imageHeight = bannerPanel.height();
        windowScreen.on("resize",
            function() {
                var win = $(this);
                bannerPanel.css("width", win.width());
                bannerPanel.css("height", win.height() - $(".bottomFooter ").height());
                $(".articleDetail, .mainSideBar").css("margin-top", bannerPanel.height());
            });

        $(".articleDetail, .mainSideBar").css("margin-top", imageHeight);
        if ($(".topDetailPanel").length > 0) {
            $(".topDetailPanel").css("margin-top", $(".topMainElementsContainer").height());
        }
    }
});