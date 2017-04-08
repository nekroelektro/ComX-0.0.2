jQuery(document).ready(function() {
    //SLICK SLIDER
    var time = 2;
    var $bar,
        $slick,
        isPause,
        tick,
        percentTime;
    $slick = $(".sliderSection");
    $slickOne = $(".sliderOne");

    $(".sliderOne").slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: ".sliderSection",
        slide: ".slideElementUpper"
    });
    $(".sliderSection").slick({
        slidesToShow: 4,
        slide: ".slideElementDown",
        asNavFor: ".sliderOne",
        arrows: false,
        focusOnSelect: true
    });

    // reset progressbar when user slide
    $(".sliderOne").on("swipe",
        function(event, slick, direction) {
            startProgressbar();
        });

    $bar = $(".slider-progress .progress");
    $(".sliderOne").on({
        mouseenter: function() {
            isPause = true;
        },
        mouseleave: function() {
            isPause = false;
        }
    });

    $(document).on("click",
        ".sliderSection",
        function(e) {
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
                $(".sliderSection").find(".slick-slide").removeClass("slick-current");
                $slick.slick("slickNext");
                $slickOne.slick("slickNext");
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $bar.css({
            width: 0 + "%"
        });
        clearTimeout(tick);
    }

    startProgressbar();

    //Slider enlargement handling
    if ($(".indexSliders").length > 0) {
        //dynamic background image
        $('body').css({ 'background-image': 'url(../Content/images/backgroundIM.png)', 'background-repeat': 'no-repeat', 'background-attachment': 'fixed', 'background-size': '100% 100%' });

        var windowScreenIndex = $(window);
        var correctSliderSizeWidth = windowScreenIndex.height() -
            $(".bottomFooter ").height() -
            $(".topMainElementsContainer").height();

        $(".indexSliders, .slideElementUpper, .sliderSection")
            .css("height", correctSliderSizeWidth);
        $(".slideElementDown ").css("height", (correctSliderSizeWidth / 2));

        windowScreenIndex.on("resize",
            function() {
                var winIndex = $(this);
                var correct = winIndex.height() -
                    $(".bottomFooter ").height() -
                    $(".topMainElementsContainer").height();
                $(".indexSliders").css("width", winIndex.width());
                $(".indexSliders, .slideElementUpper, .sliderSection").css("height",
                    correct);

                $(".slideElementDown ").css("height", (correct / 2));
            });
    }
});