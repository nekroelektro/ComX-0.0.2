$(document).ready(function () {

    var cbpHorizontalMenu = (function () {

        var $listItems = $('#cbp-hrmenu > ul > li'),
            $menuItems = $listItems.children('a'),
            $body = $('body'),
            current = -1;

        function init() {
            $menuItems.on('click', open);
            $listItems.on('click', function (event) {
                event.stopPropagation();
            });
        }

        function open(event) {
            if (current !== -1) {
                $listItems.eq(current).removeClass('cbp-hropen');
                $(".elementsToPush").css("margin-top", 0);
            }

            var $item = $(event.currentTarget).parent('li'),
                idx = $item.index();

            if (current === idx) {
                $item.removeClass('cbp-hropen');
                $(".elementsToPush").css("margin-top", 0);
                current = -1;
            } else {
                $item.addClass('cbp-hropen');
                var subList = document.getElementsByClassName("cbp-hrsub");
                $(".elementsToPush").css("margin-top", $(subList[idx]).height() + 20);
                current = idx;
                $body.off('click').on('click', close);
            }

            return false;

        }

        function close(event) {
            $(".main").classList.remove("topMenuSingleActive");
            $(".main").toggleClass("topMenuSingleInActive");
            $listItems.eq(current).removeClass('cbp-hropen');
            current = -1;
        }

        return { init: init };

    })();

    $(function () {
        cbpHorizontalMenu.init();
    });

    //Sticky top menu:
    $(".main").sticky({ topSpacing: 0, zIndex: 6 });
    $('.main').on('sticky-start', function (e) {
        $('.absoluteLogo').show();
        $(".cbp-hrsub-inner").css("width", "100%");
        $(".main").css("box-shadow", "0 0 10px 10px #222222");
    });
    $('.main').on('sticky-end', function () {
        $('.absoluteLogo').hide();
        $(".cbp-hrsub-inner").css("width", "80%");
    });

    $('.singleLastArticleTopNavigation')
        .mouseover(function () {
            $(this).find('.titleTopNavigation').show();
        })
        .mouseout(function () {
            $(this).find('.titleTopNavigation').hide();
        });
});