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
    //$('.singleDiary')
    //    .mouseover(function () {
    //        $(this).find('.diaryTitle').stop().fadeTo("slow", 1);
    //    })
    //    .mouseout(function () {
    //        $(this).find('.diaryTitle').stop().fadeTo("slow", 0);
    //    });
});