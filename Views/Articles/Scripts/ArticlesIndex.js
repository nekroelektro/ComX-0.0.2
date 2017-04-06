﻿$(document).ready(function () {
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

    //NekroSub(false);

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

    $('#indexSeeDiaryCategory').click(function () {
        $.ajax({
            url: "/Articles/Diary/",
            method: 'GET',
            success: function (data) {
                $('.mainBodyContainer').html(data);
                $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
            }
        });
    });

    $('#indexSeeMusicReviewsCategory').click(function () {
        $.ajax({
            url: "/Categories/Recenzje",
            method: 'GET',
            success: function (data) {
                $('.mainBodyContainer').html(data);
                $('.categorySubElement:contains("Muzyka")').trigger("click");
                $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
            }
        });
    });

    $('.navigationBackButton').click(function() {
        $.ajax({
            url: "/Articles/Index/",
            method: 'GET',
            success: function (data) {
                $('.mainBodyContainer').html(data);
                $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
            }
        });
    });
});