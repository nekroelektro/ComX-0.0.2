function NekroSub() {
    var currentlyActiveSubInCategories;

    var detachedList = $('.indexSingleArticleContainer');
    $('.categorySubElement').on("click", function () {
        currentlyActiveSubInCategories = $(this);
        var selectedSubText = currentlyActiveSubInCategories.text();
        detachedList.each(function () {
            // detach - remove post from dom (and remember it in dom cache - only for one loop)
            $(this).detach();
            //this crap is case sensitive too
            if (selectedSubText != "Wszystkie") {
                if ($(this).data('sub').toString() == selectedSubText) {
                    $(this).hide().appendTo('#content').fadeIn(1000);
                }
            } else {
                $(this).hide().appendTo('#content').fadeIn(1000);
            }
        });
        // paging of existed posts
        $('#pagerCategories').pajinate({
            num_page_links_to_display: 3,
            items_per_page: 10
        });
        currentlyActiveSubInCategories.addClass('topNavigationSubcategoriesElementHover').siblings().removeClass("topNavigationSubcategoriesElementHover");;
    });

    var startSubElement = $('.categorySubElement:contains("Wszystkie")');
    startSubElement.trigger("click");

    $('.categorySubElement')
        .mouseover(function () {
            if ($(this) != currentlyActiveSubInCategories) {
                $(this).css({
                    color: "#2B823C",
                    borderBottom: '#2b823c solid 4px'
                });
            }
        })
        .mouseout(function () {
            if ($(this) != currentlyActiveSubInCategories) {
                $(this).css({
                    color: "white",
                    borderBottom: 'white solid 4px'
                });
            }
        });
}