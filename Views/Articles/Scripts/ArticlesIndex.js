$(document).ready(function () {
    $('#pager').pajinate({
        //num_page_links_to_display: 3,
        items_per_page: 4,
        show_first_last: false
    });

    $(".page_navigation a").click(function () {
        $('html, body').animate({
            scrollTop: $("#pager").offset().top - 59
        }, 600);
    });

    //NekroSub(false);

    $('.indexSingleReviewAnchor')
        .mouseover(function () {
            $(this).find("#reviewIndexImage").addClass('transition');
        })
        .mouseleave(function () {
            $(this).find("#reviewIndexImage").removeClass('transition');
        });

    // Sizing of index elements
    var windowScreen = $(window);
    var containerHeight = windowScreen
        .height() -
        $('.articlesIndexHeader').height() -
        $('.bottomFooter ').height() -
        58;

    var postsheight = containerHeight - $('.page_navigation').height() - 18;
    $('.articlesIndexTable').css('height', postsheight);
    $('.indexSingleArticleContainer').css('height', postsheight / 2);

    var reviewHeight = containerHeight - $('.moreMusicReviews').height();
    $('.indexReviewsContainer').css('height', $('.indexSingleReview').width()*2);
    $('.indexSingleReview').css('height', $('.indexSingleReview').width());

    $('.indexDiaryList').css('height', reviewHeight);
    $('.indexSingleArticleContainerDiary').css('height', reviewHeight / 10);

    // Diaries floating windows
    $('.indexSingleArticleContainerDiary')
        .mousemove(function(e) {
            var flyingWindow = $(this).find('.flyingWindow');
            flyingWindow.scrollTop();
            flyingWindow.scrollLeft();
            flyingWindow.css({
                left: e.clientX + 15,
                top: e.clientY + 15
            });
        });

    $('#indexSeeDiaryCategory').click(function () {
        window.location.href = "/Articles/Diary";
        //$.ajax({
        //    url: "/Articles/Diary/",
        //    method: 'GET',
        //    success: function (data) {
        //        $('.mainBodyContainer').html(data);
        //        $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
        //    }
        //});
    });

    $('#indexSeeMusicReviewsCategory').click(function () {
        window.location.href = "/Categories/Recenzje";
        setTimeout(function() {
                            $('.categorySubElement:contains("Muzyka")').trigger("click");
                            //$("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
                        },
                        500);
        //$.ajax({
        //    url: "/Categories/Recenzje",
        //    method: 'GET',
        //    success: function (data) {
        //        $('.mainBodyContainer').html(data);
        //        setTimeout(function() {
        //                $('.categorySubElement:contains("Muzyka")').trigger("click");
        //                $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
        //            },
        //            500);
        //    }
        //});
    });
});