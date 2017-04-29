$(document).ready(function () {
    //$(".elementsToPush").css("margin-top", $('.topMainElementsContainer').height());
    $('#diaryCatalog').pajinate({
        items_per_page: 9,
        show_first_last: false
    });
    $('#diarySortCatalog').click(function () {
        $('#diaryList').hide(500);
        $('#diaryCatalog').show(500);
    });
    $('#diarySortList').click(function () {
        //$('#diaryList').css({ display: 'block' });
        $('#diaryCatalog').hide(500);
        $('#diaryList').show(500);
        $('#diaryList').pajinate({
            items_per_page: 10,
            show_first_last: false
            //item_container_id: '#contentList',
            //nav_panel_id: '.page_navigation2'
        });
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