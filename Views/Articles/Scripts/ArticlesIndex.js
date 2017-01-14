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

    $('.singleIndexAnchor')
        .mouseover(function () {
            $(this).parent().find('h4').css('color', "#2B823C");
        })
        .mouseout(function () {
            $(this).parent().find('h4').css('color', 'black');
        });

    $('.indexSingleReview')
        .mouseover(function () {
            $(this).find('.indexReviewTitle').stop().fadeTo("slow", 1);
        })
        .mouseleave(function () {
            $(this).find('.indexReviewTitle').stop().fadeTo("slow", 0);
        });

    $('.articlesIndexSingleImage')
        .hover(function () {
            $(this).find('.bannerPanelImageMainIndex ').stop(true, false).removeAttr('style').addClass('indexBiggerSize', { duration: 700 });
        })
        .mouseleave(function () {
            $(this).find('.bannerPanelImageMainIndex ').stop(true, false).removeAttr('style').removeClass('indexBiggerSize', { duration: 350 });
        });

    $('.indexSingleArticleContainerDiary')
        .mouseover(function () {
            $(this).find('.imageOverlayColorDiary ').addClass('imageOverlayColorIndexNoOverlay', 400);
            $(this).find('.indexDiaryName').addClass('indexSingleDiaryAnchorFocus', 300);
            $(this).find('.indexDiaryName').animate({
                right: $(this).find(".indexDiaryName").parent().width() / 2 - $(this).find(".indexDiaryName").width() / 2
            }, 100);
        })
        .mouseleave(function () {
            $(this).find('.imageOverlayColorDiary ').removeClass('imageOverlayColorIndexNoOverlay', 0);
            $(this).find('.indexDiaryName').removeClass('indexSingleDiaryAnchorFocus', 50);
            $(this).find('.indexDiaryName').animate({
                right: 0
            }, 100);
        });
});