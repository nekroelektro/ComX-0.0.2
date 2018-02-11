function SharedIndexSlider(config) {
    SharedIndexSlider.Control = config;
    SharedIndexSlider.Init();
};

SharedIndexSlider.Init = function () {
    SharedIndexSlider.IndexSliderInitialization();
        setTimeout(function() {
                var heightSlidersConfig = {
                    Element: $("." + SharedIndexSlider.Control.IndexSliders)
                }
                NekroController.NekroDynamicSize(heightSlidersConfig);

                var heightUpperElementsConfig = {
                    Element: $("." + SharedIndexSlider.Control.SlideElementUpper)
                }
                NekroController.NekroDynamicSize(heightUpperElementsConfig);
            },
        500);

        //var container = document.querySelector(SharedIndexSlider.Control.SliderOne);
        //container.addEventListener('click', function(e) {
        //    if (e.target != e.currentTarget) {
        //        e.preventDefault;
        //        console.log(e.target);
        //    }
        //    e.stopPropagation();
        //}, false);

    //$("." + SharedIndexSlider.Control.SlideElementUpperAnchor).click(function(e) {
    //    e.preventDefault();
    //    var url = $(this).attr('href');

    //    $.ajax({
    //        url: "/Articles/Details/",
    //        method: 'GET',
    //        data: { "id": url.substring(1) },
    //        success: function (result) {
    //            console.log(result);
    //            $('.elementsToPush').html(result);
    //            //$("html, body").animate({ scrollTop: $('.mainBodyContainer').offset().top - 60 }, 'slow');
    //        }
    //    });

    //    history.pushState(null, null, url);
    //});
};

SharedIndexSlider.IndexSliderInitialization = function () {
    //SLICK SLIDER
    var time = 2;
    var $bar,
        $slick,
        isPause,
        tick,
        percentTime;
    $slick = $("." + SharedIndexSlider.Control.SliderSmall);
    $slickOne = $("." + SharedIndexSlider.Control.SliderBig);

    $("." + SharedIndexSlider.Control.SliderBig).slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: "." + SharedIndexSlider.Control.SliderSmall,
        slide: "." + SharedIndexSlider.Control.SlideElementUpper
    });

    $("." + SharedIndexSlider.Control.SliderSmall).slick({
        slidesToShow: 4,
        slide: "." + SharedIndexSlider.Control.SlideElementDown,
        asNavFor: "." + SharedIndexSlider.Control.SliderBig,
        arrows: false,
        focusOnSelect: true
    });

    // reset progressbar when user slide
    $("." + SharedIndexSlider.Control.SliderBig).on("swipe",
        function (event, slick, direction) {
            startProgressbar();
        });

    $bar = $(".slider-progress .progress");
    $("." + SharedIndexSlider.Control.SliderBig).on('click',
        function () {
            isPause = true;
        });

    $(document).on("click",
        "." + SharedIndexSlider.Control.SliderSmall,
        function (e) {
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
                $("." + SharedIndexSlider.Control.SliderSmall).find(".slick-slide").removeClass("slick-current");
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
}