$(document).ready(function () {
    $('#diaryList').pajinate({
        items_per_page: 10,
        show_first_last: false
    });
    $('.navigationBackButton').click(function () {
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