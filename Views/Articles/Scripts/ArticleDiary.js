$(document).ready(function () {
    $('.singleDiary')
        .mouseover(function () {
            $(this).find('.diaryTitle').stop().fadeTo("slow", 1);
        })
        .mouseout(function () {
            $(this).find('.diaryTitle').stop().fadeTo("slow", 0);
        });
});