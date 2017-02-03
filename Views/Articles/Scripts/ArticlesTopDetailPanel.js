$(document).ready(function () {
    if ($('.bannerSeriesTitle').length == 0) {
        $('.bannerPanelImageMain').animate({
            height: $('.detailsBannerPanel').height() - $('.bannerPanelInfo').height() - 28
        }, 500);
    } else {
        $('.bannerPanelImageMain').animate({
            height: 78 + '%'
        }, 500);
    }
});