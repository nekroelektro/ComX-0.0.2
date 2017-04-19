$(document).ready(function () {
    $('#diarySortCatalog').click(function () {
        $('#diaryList').hide(500);
        $('#diaryCatalog').show(500);
    });
    $('#diarySortList').click(function () {
        //$('#diaryList').css({ display: 'block' });
        $('#diaryCatalog').hide(500);
        $('#diaryList').show(500);
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