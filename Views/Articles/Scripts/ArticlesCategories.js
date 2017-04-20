$(document).ready(function () {
    NekroSub(false);
    //$(".elementsToPush").css("margin-top", $('.topMainElementsContainer').height());
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