jQuery(document).ready(function ($) {
    //SLICK SLIDER
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
        autoplay: true,
        autoplaySpeed: 7000,
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

    //$('.sliderSection').on('afterChange', function (slick, currentSlide) {
    //    console.log(currentSlide);
    //    currentSlide.css("border-top", "#2B823C");
    //    currentSlide.css("border-bottom", "#2B823C");
    //});

    //var currentSlide = $('.sliderSection').slick('slickCurrentSlide');
    //currentSlide.style.borderTop = "#2B823C";
    //currentSlide.style.borderBottom = "#2B823C";
    //SCROLL
    //$('.sliderRight').slimScroll({
    //    height: '250px'
    //});
});