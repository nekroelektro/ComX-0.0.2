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
                //for pushing elements during top menu displaying
                $item.addClass('cbp-hropen');
                var subList = document.getElementsByClassName("cbp-hrsub");
                //$(".elementsToPush").css("margin-top", $(subList[idx]).height() + 20);
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
        $(this).find('.absoluteLogo').animate({
            marginTop: '-1.5em'
        }, 400);
        $(".cbp-hrsub-inner").css("width", "100%");
        $(".cbp-hrmenu").css("padding-left", "8em");
        //$(".main").css("box-shadow", "0 0 10px 10px #222222");
    });
    $('.main').on('sticky-end', function () {
        $('.absoluteLogo').css("margin-top", "-6em");
        $('.absoluteLogo').hide();
        $(".cbp-hrsub-inner").css("width", "80%");
        $(".cbp-hrmenu").css("padding-left", "0em");
    });

    $('.singleLastArticleTopNavigation')
        .mouseover(function () {
            //$(this).find('.titleTopNavigation').show(500);
            $(this).find('.articlesIndexLine').css("border", "1px solid #2B823C");
        })
        .mouseout(function () {
            $(this).find('.articlesIndexLine').css("border", "1px solid chocolate");
        });

    
});