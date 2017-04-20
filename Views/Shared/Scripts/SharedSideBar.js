$(document).ready(function () {
    $(".sideBar").sticky({ topSpacing: 60, zIndex: 4, widthFromWrapper: true });

    $(".sideBarComponent").on('click',
        function () {
            var menuActive = $('.activeSideMenu');
            if (menuActive.length > 0) {
                if (menuActive.is($(this))) {
                    $(this).find('.sideBody').hide('slow');
                    $(this).removeClass('activeSideMenu');
                } else {
                    menuActive.find('.sideBody').hide('slow');
                    menuActive.removeClass('activeSideMenu');

                    $(this).find('.sideBody').show('slow');
                    $(this).addClass('activeSideMenu');
                }
            } else {
                $(this).find('.sideBody').show('slow');
                $(this).addClass('activeSideMenu');
            }
        });

    $(".sideRandomPosts").click();
});