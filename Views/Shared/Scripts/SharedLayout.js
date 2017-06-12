$(document).ready(function () {
    //if ($('.sliderLatestIndexContainer').length > 0 || $(".detailsBannerPanel").length > 0) {
    //    //$(".elementsToPush").css("margin-top", $('.topMainElementsContainer').height());
    //    $(".elementsToPush").css("margin-top", $('.topNavigationItemsContainer').height());
    //}

    $(".bannerPanelInfo").css("width", $(".bodyLayout").width() + 30);

    $('#return-to-top').css({
        'right': $('.nekroPanel').width() + 10,
        'bottom': $('.bottomFooter').height()
    });
});

// ===== Scroll to Top ==== 
$(window).scroll(function () {
    if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
});
$('#return-to-top').click(function () { // When arrow is clicked
    $('body,html').animate({
        scrollTop: 0 // Scroll to top of body
    }, 500);
});

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-82687708-1', 'auto');
ga('send', 'pageview');