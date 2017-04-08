$(document).ready(function () {
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
                setTimeout(function() {
                        $('.categorySubElement:contains("Muzyka")').trigger("click");
                        $("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
                    },
                    300);

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