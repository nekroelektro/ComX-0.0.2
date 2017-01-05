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
        .mouseout(function () {
            $(this).find('.indexReviewTitle').stop().fadeTo("slow", 0);
        });
});