$(document).ready(function() {
    $(".bannerPanelImageMain").animate({
            height: $(".detailsBannerPanel").height(),
            position: "absolute",
            top: 0
        },
        500);

    $(window).on('resize',
        function() {
            //var win = $(this);
            $(".bannerPanelImageMain").css('height',
                $(".detailsBannerPanel").height());
        });
});