function SharedTopNavigationMenu(config) {
    SharedTopNavigationMenu.Control = config;
    SharedTopNavigationMenu.Init();
};

SharedTopNavigationMenu.Init = function () {
    NekroSub(true);

    // Elements by class because if id it will be not be unique
    var navBlackConfig = {
        Container: $("." + SharedTopNavigationMenu.Control.NavLastArticles),
        Element: $("." + SharedTopNavigationMenu.Control.NavSingleElement),
        OverlayElement: $("." + SharedTopNavigationMenu.Control.NavImageOverlay)
    }
    NekroController.NekroBlackened(navBlackConfig);

    $("#" + SharedTopNavigationMenu.Control.LogoImage).on({
        "mouseover": function () {
            this.src = "/Content/images/logoNew17green.png";
        },
        "mouseout": function () {
            this.src = "/Content/images/logoNew17.png";
        }
    });

    $("#" + SharedTopNavigationMenu.Control.LogoImage).on("click",
        function () {
            window.location.href = "/";
        });

    $("#" + SharedTopNavigationMenu.Control.NavigationLastAnchor)
        .mouseover(function () {
            $(this).find("#" + SharedTopNavigationMenu.Control.NavigationImage).addClass("transition");
            $(this).find("#" + SharedTopNavigationMenu.Control.IndexLine).css("border", "1px solid #2B823C");
        })
        .mouseout(function () {
            $(this).find("#" + SharedTopNavigationMenu.Control.NavigationImage).removeClass("transition");
            $(this).find("#" + SharedTopNavigationMenu.Control.IndexLine).css("border", "1px solid chocolate");
        });

    SharedTopNavigationMenu.InitializeNavMenu();
};

SharedTopNavigationMenu.InitializeNavMenu = function() {
    var $listItems = $("#cbp-hrmenu > ul > li"),
        $menuItems = $listItems.children("a"),
        $body = $("body"),
        current = -1;
    
        $menuItems.on("click", open);
        $listItems.on("click",
            function (event) {
                event.stopPropagation();
            });

    function open(event) {
        $(".moreFromCategoryTopNavigation").hide();

        var $item = $(event.currentTarget).parent("li"),
            idx = $item.index();

        var sliderElementMenu = $item.find(".cbp-hrsub");
        var posts = $item.find("#" + SharedTopNavigationMenu.Control.NavigationLastAnchor);
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
                function () {

                    //this crap is case-sensitive
                    $item.find('.topNavigationSubcategoriesElement:contains("Wszystkie")').trigger("click");
                    $(".moreFromCategoryTopNavigation").fadeIn("slow");
                });
            current = idx;
        }
        return false;
    }
};