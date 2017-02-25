$(document).ready(function () {
    var currentlyActiveSub;
    var currentAllPosts;

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
            $('.moreFromCategoryTopNavigation').hide();

            var $item = $(event.currentTarget).parent('li'),
                idx = $item.index();

            var sliderElementMenu = $item.find('.cbp-hrsub');           
            var posts = $item.find('.topNavigationLastAnchor');
            posts.hide();

            //second click which closes selected menu
            if (current !== -1) {
                $listItems.eq(current).find('.cbp-hrsub').slideUp("fast");
                $listItems.eq(current).removeClass('cbp-hropen');
                $(".elementsToPush").css("margin-top", 0);
                posts.hide();
            }

            if (current === idx) {
                sliderElementMenu.slideUp("slow");
                $item.removeClass('cbp-hropen');
                $(".elementsToPush").css("margin-top", 0);
                current = -1;
            } else {
                //for pushing elements during top menu displaying
                $item.addClass('cbp-hropen');
                sliderElementMenu.hide();
                sliderElementMenu.slideDown("slow", function() {
                    //posts.slice(0, 4).show('slide', {direction: 'right'}, 500);
                    //posts.slice(0, 4).fadeIn("slow");

                    //this crap is case-sensitive
                    $item.find('.topNavigationSubcategoriesElement:contains("Wszystkie")').trigger("click");
                    $('.moreFromCategoryTopNavigation').fadeIn("slow");
                });
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
        $(".cbp-hrmenu > ul > li > a").css({
            paddingLeft: "1.7em",
            paddingRight: "1.7em"
        });
        //$(".main").css("box-shadow", "0 0 10px 10px #222222");
    });
    $('.main').on('sticky-end', function () {
        $('.absoluteLogo').css("margin-top", "-6em");
        $('.absoluteLogo').hide();
        $(".cbp-hrsub-inner").css("width", "80%");
        $(".cbp-hrmenu").css("padding-left", "0em");
        $(".cbp-hrmenu > ul > li > a").css({
            paddingLeft: "2em",
            paddingRight: "2em"
        });
    });

    $('.topNavigationLastAnchor')
        .mouseover(function () {
                $(this).find("#articleTopNavigationImage").addClass('transition');
                $(this).find('.articlesIndexLine').css("border", "1px solid #2B823C");
        })
        .mouseout(function () {
                $(this).find("#articleTopNavigationImage").removeClass('transition');
                $(this).find('.articlesIndexLine').css("border", "1px solid chocolate");
        });

    // Subcategories tweaks
    var handlePostsAfterSubChange = function (postArray) {
        $("#detailsCommentSection").empty();
        $("#detailsCommentSection").html(container);
    }

    $('.topNavigationSubcategoriesElement').on("click", function () {
        currentlyActiveSub = $(this);
        var selectedSubText = currentlyActiveSub.text();
        var closestContainer = currentlyActiveSub.closest('.lastArticlesFromCategoryTopNavigation');
        var subElements = closestContainer.find('.topNavigationLastAnchor');
        var x = 0;
        subElements.hide();
        subElements.each(function () {
            //this crap is case sensitive too
            if (x <= 3) {
                if (selectedSubText != "Wszystkie") {
                    if ($(this).data('sub').toString() != selectedSubText) {
                        //$(this).fadeOut(500);
                    } else {
                        $(this).fadeIn("slow");
                        x++;
                    }
                } else {
                    $(this).fadeIn("slow");
                    x++;
                }
            }
        });
        currentlyActiveSub.addClass('topNavigationSubcategoriesElementHover').siblings().removeClass("topNavigationSubcategoriesElementHover");;
    });

    $('.topNavigationSubcategoriesElement')
        .mouseover(function () {
            if ($(this) != currentlyActiveSub) {
                $(this).css({
                    color: "#2B823C",
                    borderBottom: '#2b823c solid 4px'
                });
            }
        })
        .mouseout(function () {
            if ($(this) != currentlyActiveSub) {
                $(this).css({
                    color: "white",
                    borderBottom: 'white solid 4px'
                });
            }
        });
});