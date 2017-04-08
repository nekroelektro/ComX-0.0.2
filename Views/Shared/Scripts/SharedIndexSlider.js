//jQuery(document).ready(function () {
    //SLICK SLIDER
    var time = 2;
    var $bar,
        $slick,
        isPause,
        tick,
        percentTime;
    $slick = $('.sliderSection');
    $slickOne = $('.sliderOne');

    $('.sliderOne').slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: '.sliderSection',
        slide: '.slideElementUpper'
    });
    $(".sliderSection").slick({
        slidesToShow: 4,
        slide: '.slideElementDown',
        asNavFor: '.sliderOne',
        arrows: false,
        focusOnSelect: true
    });
    
    // reset progressbar when user slide
    $('.sliderOne').on('swipe', function (event, slick, direction) {
        startProgressbar();
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
                $('.sliderSection').find('.slick-slide').removeClass('slick-current');
                $slick.slick('slickNext');
                $slickOne.slick('slickNext');
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
//});