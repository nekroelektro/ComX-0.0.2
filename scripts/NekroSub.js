function NekroSub(isNavigation) {
    var currentlyActiveSubInCategories;
    var detachedList = $(".indexSingleArticleContainer");

    if (isNavigation) {
        $(".topNavigationSubcategoriesElement").on("click",
            function() {
                currentlyActiveSubInCategories = $(this);
                var selectedSubText = currentlyActiveSubInCategories.text();
                var closestContainer = currentlyActiveSubInCategories.closest(".lastArticlesFromCategoryTopNavigation");
                var subElements = closestContainer.find(".topNavigationLastAnchor");
                var x = 0;
                subElements.hide();
                subElements.each(function() {
                    // take first 4 posts
                    if (x <= 3) {
                        //this crap is case sensitive too
                        if (selectedSubText != "Wszystkie") {
                            if ($(this).data("sub").toString() != selectedSubText) {
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
                makeSubActive(currentlyActiveSubInCategories);
            });
    } else {
        $(".categorySubElement").on("click",
            function() {
                currentlyActiveSubInCategories = $(this);
                var selectedSubText = currentlyActiveSubInCategories.text();
                detachedList.each(function() {
                    // detach - remove post from dom (and remember it in dom cache - only for one loop)
                    $(this).detach();
                    //this crap is case sensitive too
                    if (selectedSubText != "Wszystkie") {
                        if ($(this).data("sub").toString() == selectedSubText) {
                            $(this).hide().appendTo("#content").fadeIn(1000);
                        }
                    } else {
                        $(this).hide().appendTo("#content").fadeIn(1000);
                    }
                });
                // paging of existed posts
                $("#pagerCategories").pajinate({
                    num_page_links_to_display: 3,
                    items_per_page: 10
                });
                makeSubActive(currentlyActiveSubInCategories);
            });
    }

    // For categories, NOT for navigation
    var startSubElement = $('.categorySubElement:contains("Wszystkie")');
    startSubElement.trigger("click");


    // hover over currently NOT active subs
    var subElement = isNavigation == 1 ? $(".topNavigationSubcategoriesElement") : $(".categorySubElement");
    subElement
        .mouseover(function() {
            if ($(this) != currentlyActiveSubInCategories) {
                $(this).css({
                    color: "#2B823C",
                    borderBottom: "#2b823c solid 4px"
                });
            }
        })
        .mouseout(function() {
            if ($(this) != currentlyActiveSubInCategories) {
                $(this).css({
                    color: "white",
                    borderBottom: "white solid 4px"
                });
            }
        });

    // add styles to currently active sub
    function makeSubActive(activeSub) {
        activeSub.addClass("topNavigationSubcategoriesElementHover").siblings()
            .removeClass("topNavigationSubcategoriesElementHover");
    };
};