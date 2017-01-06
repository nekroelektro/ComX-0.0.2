﻿jQuery(document).ready(function ($) {
    $('.indexSingleArticleContainerDiary')
        .mouseover(function () {
            $(this).find('.imageOverlayColorDiary ').stop(true, true).addClass('imageOverlayColorIndexNoOverlay', 400);
            $(this).find('h4').css('background', "black");
        })
        .mouseleave(function () {
            $(this).find('.imageOverlayColorDiary ').removeClass('imageOverlayColorIndexNoOverlay', 0);
            $(this).find('h4').css('background', "none");
        });

    //$('.sliderLink')
    //    .mouseover(function () {
    //        $(this).find('.bannerPanelImageMainSlider img').stop(true, true).addClass('indexBiggerSize', 1000);
    //    })
    //    .mouseleave(function () {
    //        $(this).find('.bannerPanelImageMainSlider img').stop(true, true).removeClass('indexBiggerSize', 400);
    //    });

    //SLICK SLIDER
    var time = 2;
    var $bar,
        $slick,
        isPause,
        tick,
        percentTime;
    $slick = $('.sliderSection');

    $('.sliderOne').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.sliderSection'
    });
    $(".sliderSection").slick({
        dots: false,
        infinite: true,
        centerMode: true,
        asNavFor: '.sliderOne',
        slidesToShow: 3,
        //autoplay: true,
        //autoplaySpeed: 7000,
        focusOnSelect: true,
        slidesToScroll: 2,
        variableWidth: true,
        draggable: false,
        arrows: false,
        responsive: [
{
    breakpoint: 1024,
    settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
    }
},
{
    breakpoint: 600,
    settings: {
        slidesToShow: 2,
        slidesToScroll: 2
    }
},
{
    breakpoint: 480,
    settings: {
        slidesToShow: 1,
        slidesToScroll: 1
    }
}
        ]
    });

    $bar = $('.slider-progress .progress');
    $('.sliderOne').on({
        mouseenter: function() {
            isPause = true;
        },
        mouseleave: function() {
            isPause = false;
        }
    });

    $(document).on('click', '.sliderSection', function (e) {
        startProgressbar();
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (isPause === false) {
            percentTime += 0.4 / (time + 0.1);
            $bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slick.slick('slickNext');
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }

    startProgressbar();
});