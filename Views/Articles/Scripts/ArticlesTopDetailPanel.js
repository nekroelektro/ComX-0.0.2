$(document).ready(function() {
    var topHeight = $(".topMainElementsContainer").height();
    $(".bannerPanelImageMain").animate({
            height: $(".detailsBannerPanel").height() -
                ($(".bannerPanelInfo").height() + topHeight) -
                28, // 28 is a height of bannerPanelInfo padding top plus bottom
            position: "absolute",
            top: topHeight
        },
        500);

    $(window).on('resize',
        function() {
            //var win = $(this);
            $(".bannerPanelImageMain").css('height', $(".detailsBannerPanel").height() -
                ($(".bannerPanelInfo").height() + topHeight) -
                28)
        });
});