$(document).ready(function() {
    var currentlyActiveSub;

    var cbpHorizontalMenu = (function() {

        var $listItems = $("#cbp-hrmenu > ul > li"),
            $menuItems = $listItems.children("a"),
            $body = $("body"),
            current = -1;

        function init() {
            $menuItems.on("click", open);
            $listItems.on("click",
                function(event) {
                    event.stopPropagation();
                });
        }

        function open(event) {
            $(".moreFromCategoryTopNavigation").hide();

            var $item = $(event.currentTarget).parent("li"),
                idx = $item.index();

            var sliderElementMenu = $item.find(".cbp-hrsub");
            var posts = $item.find(".topNavigationLastAnchor");
            posts.hide();

            //second click which closes selected menu
            if (current !== -1) {
                $listItems.eq(current).find(".cbp-hrsub").slideUp("fast");
                $listItems.eq(current).removeClass("cbp-hropen");
                //$(".elementsToPush").css("margin-top", 0);
                posts.hide();
            }

            if (current === idx) {
                sliderElementMenu.slideUp("slow");
                $item.removeClass("cbp-hropen");
                //$(".elementsToPush").css("margin-top", 0);
                current = -1;
            } else {
                //for pushing elements during top menu displaying
                $item.addClass("cbp-hropen");
                sliderElementMenu.hide();
                sliderElementMenu.slideDown("slow",
                    function() {

                        //this crap is case-sensitive
                        $item.find('.topNavigationSubcategoriesElement:contains("Wszystkie")').trigger("click");
                        $(".moreFromCategoryTopNavigation").fadeIn("slow");
                    });
                current = idx;
                //this is for when user clicks outside navigation menu
                //$body.off('click').on('click', close);
            }

            return false;

        }

        function close(event) {
            $(".main").classList.remove("topMenuSingleActive");
            $(".main").toggleClass("topMenuSingleInActive");
            $listItems.eq(current).removeClass("cbp-hropen");
            current = -1;
        }

        return { init: init };

    })();

    $(function() {
        cbpHorizontalMenu.init();
    });

    //Sticky top menu:
    $(".main").sticky({ topSpacing: 0, zIndex: 6 });
    $(".main").on("sticky-start",
        function(e) {
            $(".topNavigationSearchIcon").show("slow");
            $(".absoluteLogo").show("slow");
            $(this).find(".absoluteLogo").animate({
                    marginTop: "-1.5em"
                },
                400);
            $(".cbp-hrsub-inner").css("width", "100%");
            $(".cbp-hrmenu").css("padding-left", "8em");
            $(".cbp-hrmenu > ul > li > a").css({
                paddingLeft: "1.7em",
                paddingRight: "1.7em"
            });
            $(".cbp-hrmenu").animate({ 'background-color': "rgba(0, 0, 0, 0.9)" }, 'fast');
            //$(".main").css("box-shadow", "0 0 10px 10px #222222");
        });
    $(".main").on("sticky-end",
        function() {
            $(".topNavigationSearchIcon").hide();
            if ($(".searchBarNav").is(":visible")) {
                $(".searchBarNav").hide();
            }
            $(".absoluteLogo").css("margin-top", "-6em");
            $(".absoluteLogo").hide();
            $(".cbp-hrsub-inner").css("width", "80%");
            $(".cbp-hrmenu").css("padding-left", "0em");
            $(".cbp-hrmenu > ul > li > a").css({
                paddingLeft: "2em",
                paddingRight: "2em"
            });
            $(".cbp-hrmenu").animate({ 'background-color': "rgba(0, 0, 0, 0.3)" }, 'fast');
        });

    $(".topNavigationLastAnchor")
        .mouseover(function() {
            $(this).find("#articleTopNavigationImage").addClass("transition");
            $(this).find(".articlesIndexLine").css("border", "1px solid #2B823C");
        })
        .mouseout(function() {
            $(this).find("#articleTopNavigationImage").removeClass("transition");
            $(this).find(".articlesIndexLine").css("border", "1px solid chocolate");
        });

    $(".topMainElementsContainer").on({
        mouseenter: function() {
            $(this).find(".cbp-hrmenu, .logoSection").animate({ 'background-color': "rgba(0, 0, 0, 0.9)" }, 'fast');
        },
        mouseleave: function () {
            if (!$('.absoluteLogo').is(":visible"))
            $(this).find(".cbp-hrmenu, .logoSection").animate({ 'background-color': "rgba(0, 0, 0, 0.3)" }, 'fast');
        }
    });

    // Subcategories tweaks
    NekroSub(true);
    //SEARCH
    var $container = $(".navMenuContainer");
    var searchIcon = $(".topNavigationSearchIcon");

    $container.find(".searchBar").addClass("searchBarNav");

    NekroSearch($container, searchIcon);
});