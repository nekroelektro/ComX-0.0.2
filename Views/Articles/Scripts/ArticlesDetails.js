(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.7";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-82687708-1', 'auto');
ga('send', 'pageview');

$(document).ready(function() {
    $(".topDetailPanelButtons").sticky({ topSpacing: 60, zIndex: 5 });

    var currentCategory = $("#categoryNameContainer").val();
    if (currentCategory == "") {
        currentCategory = "Pamiętnik";
    }

    $('.topNavigationItem:contains(' + currentCategory + ')').css({
            backgroundColor: '#2B823C',
            color: 'white'
    });

    // For wide article image and moving sidebar under article image
    var bannerPanel = $('.detailsBannerPanel');
    if (bannerPanel.length > 0) {
        //make background image from image container of article details
        var backgroundImageSrc = $('.bannerPanelDetailsMainImage img').attr('src');
        $('body').css({ 'background-image': 'url(' + backgroundImageSrc + ')', 'background-repeat' : 'no-repeat', 'background-attachment': 'fixed', 'background-size': '100% 100%' });
        $('.elementsToPush').css('margin-top', 0);
        var windowScreen = $(window);
        bannerPanel.css('height', windowScreen.height() - $('.bottomFooter ').height());

        windowScreen.on('resize', function () {
            var win = $(this);
            bannerPanel.css('width', win.width());
            bannerPanel.css('height', win.height() - $('.bottomFooter ').height());
        });

        $('.bannerPanelInfo').css('width', $('.bodyLayout').width() + 30);
        var imageHeight = bannerPanel.height();
        $('.articleDetail').css('margin-top', imageHeight);
        if ($('.topDetailPanel').length > 0) {
            $('.topDetailPanel').css('margin-top', $(".topMainElementsContainer").height());
        }
        $('.mainSideBar').css('margin-top', imageHeight);
    }
});
