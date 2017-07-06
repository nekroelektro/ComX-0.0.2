function NekroController() {}

NekroController.NekroNavigator = function(config) {
    var htmlString = "";
    var navigationElements = $("div[data-isnavpanel=true]");
    if (navigationElements.length > 0) {
        var navigationArray = [];
        $.each(navigationElements,
            function() {
                navigationArray.push($(this).attr("id"));
            });

        //Build navigator html based on navigationArray
        $.each(navigationArray,
            function(i, item) {
                var iconString = "";
                if (item == "Start") {
                    iconString = "play-circle";
                } else if (item == "Newsy") {
                    iconString = "globe";
                } else if (item == "Posty") {
                    iconString = "th-large";
                } else if (item == "Pamiętnik") {
                    iconString = "book";
                } else if (item == "Recenzje") {
                    iconString = "cd";
                } else if (item == "Artykuł") {
                    iconString = "align-left";
                } else if (item == "Komentarze") {
                    iconString = "comment";
                } else if (item == "Detale") {
                    iconString = "zoom-in";
                } else if (item == "Kategoria") {
                    iconString = "tags";
                } else if (item == "Szukaczka") {
                    iconString = "search";
                } else if (item == "Profil") {
                    iconString = "user";
                } else if (item == "Wiadomości") {
                    iconString = "envelope";
                }

                var itemString =
                    "<li><a href=#" +
                        item +
                        ">" +
                        '<div class="sideTitle navigatorMenuClickItem">' +
                        '<p><span class="glyphicon glyphicon-' +
                        iconString +
                        ' navigatorIcon" aria-hidden="true"></span>' +
                        '<div class="navigatorMenuItemName">' +
                        item +
                        "</div></p>" +
                        "</div>" +
                        "</a></li>";

                htmlString = htmlString + itemString;
            });
        htmlString = "<nav class='navbar'><ul class='nav nav-pills nav-stacked sideNavigator'>" + htmlString + "</ul></nav>";
        $(".mainNavigatorContainerAllItems").hide().append(htmlString).fadeIn("fast");

        //Select first element on start
        $('.sideNavigator li:first-child').addClass('active');
        $('.navigatorMenuItemName:contains("Start")').parent().addClass("activeNavigatorItem");

        // click on navigator item
        $(".navigatorMenuClickItem").click(function() {
            var searchedStringId = $(this).text();
            var element = $("#" + searchedStringId);
            $("html, body").animate({
                    scrollTop: element.offset().top - 58
                },
                1250,
                function() {
                    $(this).addClass("activeNavigatorItem");
                });
        });
    } else {
        $(".sideBarNavigationComponent").hide();
    }
};

NekroController.NekroEnterClick = function(config) {
    $(config.Scope).keypress(function(e) {
        if (e.which == 13) {
            $(config.ElementToClick).click();
            return false; //<---- Add this line
        }
    });
};

NekroController.ShowDivNicely = function(config) {
    config.ElementClicked.on("click",
        function() {
            config.ShowDuration = config.ShowDuration != null ? config.ShowDuration : 1000;
            config.HideDuration = config.HideDuration != null ? config.HideDuration : 200;
            config.OnlyMe = config.OnlyMe != null ? config.OnlyMe : true;

            var existingElement = $(".nicelyVisible");
            if (existingElement.length > 0) {
                existingElement.slideUp(config.HideDuration);
                existingElement.removeClass("nicelyVisible");
            }
            if (!config.ElementToShow.is(":visible")) {
                config.ElementToShow.slideDown(config.ShowDuration);
                config.ElementToShow.addClass("nicelyVisible");
            }
        });
};

NekroController.NekroSearch = function(config) {
    var request;
    var searchContent;
    var searchString;

    var searchBar = config.Container.find(".searchBar").hide();
    config.SearchIcon.on("click",
        function() {
            searchBar.toggle("slow");
            config.Container.find("#searchBarMain").focus();
        });

    config.Container.find("#searchBarMain").on("keyup",
        function() {
            // if there is any pending AJAX request - abort it (for fast typing)
            if (request) {
                request.abort();
            }

            var searchTxt = this.value;
            searchString = searchTxt;
            setTimeout(function() {
                    if (searchTxt.length > 2) {
                        request = $.ajax({
                            type: "GET",
                            url: "/Articles/SearchResultsLive",
                            data: { 'searchString': searchTxt }
                        }).done(function(content) {
                            searchLogic(content);
                        });
                    } else {
                        searchContent = null;
                        if (config.Container.find(".searchResultsContainer").is(":visible")) {
                            config.Container.find(".searchResultsContainer").slideUp("fast");
                        }
                    }
                },
                200);
        });

    function searchLogic(content) {
        searchContent = content;
        var isNoResultsVisible = config.Container.find(".searchNoResults").is(":visible");
        var resultContainer = config.Container.find(".searchResultsContainer");
        // open results
        resultContainer.css({ 'right': $(".nekroPanel").width() + 10, 'top': $(".topMainElementsContainer").height() });
        resultContainer.slideDown("fast");

        // if there is no result of search - show and hide all previous search results, also hide 'more' link if it is visible
        if (searchContent.length == 0) {
            if (config.Container.find(".searchNoResults").length == 0) {
                config.Container.find(".searchItemContainer").detach();

                if (config.Container.find(".searchResultsMore").is(":visible")) {
                    config.Container.find(".searchResultsMore").hide("fast");
                }

                if (config.Container.find(".searchResultsNoMore").is(":visible")) {
                    config.Container.find(".searchResultsNoMore").hide("fast");
                }

                var noResultsFoundHtmlString =
                    '<div class="searchNoResults">Niczego nie znalazłem...</div>';
                config.Container.find(".searchResultsElements").append(noResultsFoundHtmlString);
            }
        }
        // if search returns any result
        else {
            // if no results string is visible - hide it
            if (config.Container.find(".searchNoResults").length != 0) {
                config.Container.find(".searchNoResults").detach();
            }

            // append search results to results container
            handleSearch(searchContent);

            // if there are more than 5 results - show more results link (if it is not laready visible)
            if (searchContent.length > 5) {
                if (!config.Container.find(".searchResultsMore").is(":visible")) {
                    config.Container.find(".searchResultsMore").show("fast");
                }
                if (config.Container.find(".searchResultsNoMore").is(":visible")) {
                    config.Container.find(".searchResultsNoMore").hide("fast");
                }
            }
            // if there is already visible more resiult link and there is =< 4 results, hide it and show that's all string
            else {
                if (config.Container.find(".searchResultsMore").is(":visible")) {
                    config.Container.find(".searchResultsMore").hide("fast");
                }
                if (!config.Container.find(".searchResultsNoMore").is(":visible")) {
                    config.Container.find(".searchResultsNoMore").show("fast");
                }
            }
        }
    };

    function handleSearch(content) {
        var selectedSearchItems = content.slice(0, 5);
        var htmlSearchString = "";

        $.each(selectedSearchItems,
            function(i, item) {
                //get category and/or subcategory (depends if it's diary or not)
                var categoryString = item.Category;
                if (item.Subcategory != "Pamiętnik") {
                    categoryString = categoryString + ", " + item.Subcategory;
                }
                // create one node of searchresult
                var searchItem =
                    '<div class="searchItemContainer">' +
                        "<a class='searchItemAnchor' href='/" +
                        item.CodedName +
                        "'>" +
                        '<div class="searchItemImageContainer">' +
                        "<img src=" +
                        item.ImageUrl +
                        " />" +
                        "</div>" +
                        '<div class="searchItemDetailsContainer">' +
                        '<div class="searchItemDetailsName">' +
                        "<p>" +
                        item.Name +
                        "</p>" +
                        "</div>" +
                        '<hr class="articlesIndexLine" />' +
                        '<div class="searchItemDetailsTags">' +
                        "<p>" +
                        '<span class="glyphicon glyphicon-time" aria-hidden="true"></span> ' +
                        item.Date +
                        '&nbsp;&nbsp;&nbsp;&nbsp; <span class="glyphicon glyphicon-tags" aria-hidden="true"></span> ' +
                        categoryString +
                        "</p>" +
                        "</div>" +
                        "</div>" +
                        "</a>" +
                        "</div>";

                htmlSearchString = htmlSearchString + searchItem;
            });
        config.Container.find(".searchItemContainer").detach();
        config.Container.find(".searchResultsElements").hide().append(htmlSearchString).fadeIn("fast");
    };

    // For clicking outside of search (then close the results)
    $(document).mouseup(function(e) {
        if (config.Container.find(".searchResultsContainer").is(":visible")) {
            var searchResultsPanel = config.Container.find(".searchResultsContainer");
            var searchBarContainer = config.Container.find("#searchBarMain");
            if ((!searchResultsPanel.is(e.target) && searchResultsPanel.has(e.target).length === 0) &&
                (!searchBarContainer.is(e.target) && searchBarContainer.has(e.target).length === 0)) {
                searchResultsPanel.slideUp("fast");
            }
        } else {
            if (searchContent) {
                if (config.Container.find("#searchBarMain").is(e.target) && searchContent.length > 0) {
                    config.Container.find(".searchResultsContainer").slideDown("slow");
                }
            }
        }
    });

    config.Container.find(".searchResultsMore").on("click",
        function() {
            window.location.href = "/Articles/SearchResults/" + "?searchString=" + searchString;
        });
};

NekroController.NekroPop = function(config) {
    config.ContainerElement.dialog({
        title: config.Title,
        dialogClass: "no-close",
        modal: config.Modal,
        autoOpen: config.AutoOpen,
        width: config.Width
    });

    config.ClickedElement.click(function() {
        config.ContainerElement.dialog("open");
    });

    $(".shutNekroPop").click(function() {
        config.ContainerElement.dialog("close");
    });
};

// Highlight one element in collection, darker background for the rest
NekroController.NekroBlackened = function(config) {
    var elements = config.Container.find(config.Element);
    elements.on({
        "mouseover": function() {
            var currentItem = $(this);
            $.each(elements,
                function() {
                    if (!$(this).is(currentItem)) {
                        $(this).find(config.OverlayElement).css({
                            'z-index': 4
                        });
                    }
                });
        },
        "mouseout": function() {
            $.each(elements,
                function() {
                    $(this).find(config.OverlayElement).css({
                        'z-index': 2
                    });
                });
        }
    });
};

// Dynamic element height in addition of window height
NekroController.NekroDynamicSize = function(config) {
    var windowSize = NekroParams.GetScreenSize();
    var correctSliderSizeHeigth = windowSize.Height -
        $(".bottomFooter ").height() -
        $(".topMainElementsContainer").height();
    config.Element.css("height", correctSliderSizeHeigth);

    $(window).on("resize",
        function() {
            var winIndex = $(this);
            var correctWidth = winIndex.width() >= winIndex.innerWidth ? winIndex.width() : winIndex.innerWidth;
            var correct = winIndex.height() -
                $(".bottomFooter ").height() -
                $(".topMainElementsContainer").height();

            config.Element.css("width", correctWidth);
            config.Element.css("height",
                correct);
        });
};

NekroController.NekroAjaxAction = function(config) {
    $.ajax({
        url: config.Url,
        method: config.Method,
        data: config.Params != null ? config.Params : "",
        success: function (results) {
            config.SuccessHandler != null ? config.SuccessHandler(results) : location.href = "/";
        }
    });
};