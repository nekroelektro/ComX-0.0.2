﻿$(document).ready(function () {
    $('#pager').pajinate({
        items_per_page: 6,
        show_first_last: false
    });

    $(".indexDiaryPreviewWindow").slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: ".indexDiaryList",
        slide: ".bannerPanelImageContainerIndexDiary"
    });
    $(".indexDiaryList").slick({
        slidesToShow: 7,
        slide: ".indexSingleArticleContainerDiary",
        asNavFor: ".indexDiaryPreviewWindow",
        arrows: false,
        focusOnSelect: true
    });

    $(".page_navigation a").click(function () {
        $('html, body').animate({
            scrollTop: $("#pager").offset().top - 59
        }, 600);
    });

    var postsBlackConfig = {
        Container: $(".articlesIndexTable"),
        Element: $(".articlesIndexSingleImage"),
        OverlayElement: $('.imageOverlayColorIndex')
    }
    NekroController.NekroBlackened(postsBlackConfig);

    var reviewsBlackConfig = {
        Container: $(".indexReviewsContainer"),
        Element: $(".indexSingleReview"),
        OverlayElement: $('.imageOverlayColorIndex')
    }
    NekroController.NekroBlackened(reviewsBlackConfig);

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
    if ($('.sliderLatestIndexContainer').length > 0) {
        $('.indexDiaryList').css('height', reviewHeight);
        $('.indexSingleArticleContainerDiary').css('height', reviewHeight / 7);
    }
    //Redirections after clicking anchors in indexpage
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
                        },
                        500);
    });
});