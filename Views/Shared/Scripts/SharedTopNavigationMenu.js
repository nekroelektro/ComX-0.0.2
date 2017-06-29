function SharedTopNavigationMenu(config) {
    SharedTopNavigationMenu.Control = config;  
};

$(document).ready(function () {
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
                posts.hide();
            }

            if (current === idx) {
                sliderElementMenu.slideUp("slow");
                $item.removeClass("cbp-hropen");
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

    $(".topNavigationLastAnchor")
        .mouseover(function() {
            $(this).find("#articleTopNavigationImage").addClass("transition");
            $(this).find(".articlesIndexLine").css("border", "1px solid #2B823C");
        })
        .mouseout(function() {
            $(this).find("#articleTopNavigationImage").removeClass("transition");
            $(this).find(".articlesIndexLine").css("border", "1px solid chocolate");
        });

    $('#logoImage').on("click",
        function() {
            window.location.href = "/";
        });

    // Subcategories tweaks
    NekroSub(true);
});