function NekroSearch($container, searchIcon)
{
    var searchContent;

    var searchBar = $container.find('.searchBar').hide();

    searchIcon.on("click",
        function () {
            searchBar.toggle('slide', { direction: 'right' }, 1000);
            $container.find("#searchBarMain").focus();
        });

    $container.find('#searchBarMain').on("keyup",
        function () {
            var searchTxt = this.value;;
            setTimeout(function () {
                if (searchTxt.length > 2) {
                    $.ajax({
                        type: "GET",
                        url: "/Articles/SearchResults",
                        data: { 'searchString': searchTxt }
                    }).done(function (content) {
                        searchLogic(content);
                    });
                } else {
                    if ($container.find('.searchResultsContainer').is(":visible")) {
                        $container.find('.searchResultsContainer').slideUp("fast");
                    }
                }
            },
                200);
        });

    function searchLogic(content) {
        searchContent = content;
        var isNoResultsVisible = $container.find('.searchNoResults').is(":visible");

        // open results
        $container.find('.searchResultsContainer').slideDown("fast");

        // if there is no result of search - show and hide all previous search results, also hide 'more' link if it is visible
        if (searchContent.length == 0) {
            if ($container.find('.searchNoResults').length == 0) {
                $container.find('.searchItemContainer').detach();

                if ($container.find('.searchResultsMore').is(":visible")) {
                    $container.find('.searchResultsMore').hide("fast");
                }

                if ($container.find('.searchResultsNoMore').is(":visible")) {
                    $container.find('.searchResultsNoMore').hide("fast");
                }

                var noResultsFoundHtmlString =
                    '<div class="searchNoResults">Niczego nie znalazłem...</div>';
                $container.find('.searchResultsElements').append(noResultsFoundHtmlString);
            }
        }
            // if search returns any result
        else {
            // if no results string is visible - hide it
            if ($container.find('.searchNoResults').length != 0) {
                $container.find('.searchNoResults').detach();
            }

            // append search results to results container
            handleSearch(searchContent);

            // if there are more than 5 results - show more results link (if it is not laready visible)
            if (searchContent.length > 5) {
                if (!$container.find('.searchResultsMore').is(":visible")) {
                    $container.find('.searchResultsMore').show("fast");
                }
                if ($container.find('.searchResultsNoMore').is(":visible")) {
                    $container.find('.searchResultsNoMore').hide("fast");
                }
            }
                // if there is already visible more resiult link and there is =< 4 results, hide it and show that's all string
            else {
                if ($container.find('.searchResultsMore').is(":visible")) {
                    $container.find('.searchResultsMore').hide("fast");
                }
                if (!$container.find('.searchResultsNoMore').is(":visible")) {
                    $container.find('.searchResultsNoMore').show("fast");
                }
            }
        }
    };

    function handleSearch(content) {
        var selectedSearchItems = content.slice(0, 5);
        var htmlSearchString = '';

        $.each(selectedSearchItems,
            function (i, item) {
                //get category and/or subcategory (depends if it's diary or not)
                var categoryString = item.Category;
                if (item.Subcategory) {
                    categoryString = categoryString + ', ' + item.Subcategory;
                }

                // Check if coded name got qutes - if it does, then add apostrphes before and after them
                console.log(item.CodedName);
                // create one node of searchresult
                var searchItem =
                    '<div class="searchItemContainer">' +
                        "<a class='searchItemAnchor' href='/" + item.CodedName + "'>" +
                            '<div class="searchItemImageContainer">' +
                                '<img src=' + item.ImageUrl + ' />' +
                            '</div>' +
                            '<div class="searchItemDetailsContainer">' +
                                '<div class="searchItemDetailsName">' +
                                    '<p>' + item.Name + '</p>' +
                                '</div>' +
                                '<hr class="articlesIndexLine" />' +
                                '<div class="searchItemDetailsTags">' +
                                    '<p>' +
                                        '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' + item.Date + '&nbsp;&nbsp;&nbsp;&nbsp; <span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ' + categoryString +
                                    '</p>' +
                                '</div>' +
                            '</div>' +
                        '</a>' +
                    '</div>';

                htmlSearchString = htmlSearchString + searchItem;
            });
        $container.find('.searchItemContainer').detach();
        $container.find('.searchResultsElements').hide().append(htmlSearchString).fadeIn("fast");
    };

    // For clicking outside of search (then close the results)
    $(document).mouseup(function (e) {
        if ($container.find('.searchResultsContainer').is(":visible")) {
            var searchResultsPanel = $container.find('.searchResultsContainer');
            var searchBarContainer = $container.find('#searchBarMain');
            if ((!searchResultsPanel.is(e.target) && searchResultsPanel.has(e.target).length === 0) &&
                (!searchBarContainer.is(e.target) && searchBarContainer.has(e.target).length === 0)) {
                searchResultsPanel.slideUp("fast");
            }
        } else {
            if (searchContent) {
                if ($container.find('#searchBarMain').is(e.target) && searchContent.length > 0) {
                    $container.find('.searchResultsContainer').slideDown("slow");
                }
            }
        }
    });
};