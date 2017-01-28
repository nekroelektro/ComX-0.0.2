$(document).ready(function () {
    // PACKERY
    var $grid = $('.content').packery({
        // options
        itemSelector: '.singleIndexArticle',
        gutter: 13,
        percentPosition: true,
        transitionDuration: '0.1s'
    });


    $grid.imagesLoaded().progress(function () {
        $grid.packery();
    });


    $('#pager').pajinate({
        //num_page_links_to_display: 3,
        items_per_page: 8,
        show_first_last: false
});

    $(".page_navigation a").click(function () {
        $('html, body').animate({
            scrollTop: $("#content").offset().top - 65
        }, 600);
    });

    $('.grid').jscroll({
        padding: 20,
        nextSelector: 'a.next_link',
        contentSelector: '.singleIndexArticle'
    });

    $('.indexSingleReviewAnchor')
        .mouseover(function () {
            $(this).find("#reviewIndexImage").addClass('transition');
        })
        .mouseleave(function () {
            $(this).find("#reviewIndexImage").removeClass('transition');
        });

    $('.indexSingleArticleContainerDiary')
        .mousemove(function (e) {
            var flyingWindow = $(this).find('.flyingWindow');
            flyingWindow.scrollTop();
            flyingWindow.scrollLeft();
            flyingWindow.css({
                left: e.clientX + 15,
                top: e.clientY + 15
            });
            if (flyingWindow.style.bottom <= 0) {
                flyingWindow.css('bottom', 0);
            }
        })
        .mouseover(function () {
            //$(this).find('.imageOverlayColorDiary ').addClass('imageOverlayColorIndexNoOverlay', 400);
            //$(this).find('.indexDiaryName').addClass('indexSingleDiaryAnchorFocus', 300);
            //$(this).find('.indexDiaryName').animate({
            //    right: $(this).find(".indexDiaryName").parent().width() / 2 - $(this).find(".indexDiaryName").width() / 2
            //}, 100);
        })
        .mouseleave(function () {
            //$(this).find('.imageOverlayColorDiary ').removeClass('imageOverlayColorIndexNoOverlay', 0);
            //$(this).find('.indexDiaryName').removeClass('indexSingleDiaryAnchorFocus', 50);
            //$(this).find('.indexDiaryName').animate({
            //    right: 0
            //}, 100);
        });
});