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
        width: config.Width != null ? config.Width : 500
});

    if (config.ClickedElement != null) {
        config.ClickedElement.click(function() {
            config.ContainerElement.dialog("open");
        });
    }

    $(".shutNekroPop").click(function () {
        if (config.ClearBeforeClose != null && config.ClearBeforeClose == true) {
            NekroHelper.ClearAllInputs(config.ContainerElement);
        }
        config.ContainerElement.find('.editErrorContainer').detach();
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
NekroController.NekroDynamicSize = function (config) {
    config.GotNav != null ? config.GotNav : false;
    $(window).on("load resize",
        function() {
            resizeElements();
        });
    $(document).ready(function() {
        resizeElements();
    });

    function resizeElements() {
        var winIndex = $(this);
        var correctWidth = winIndex.width() >= winIndex.innerWidth ? winIndex.width() : winIndex.innerWidth;
        var correctHeight = winIndex.height() -
            $(".bottomFooter ").height() -
            $(".topMainElementsContainer").height();
        if (config.GotNav) correctHeight = (correctHeight - $('.page_navigation').height()) - 20;
        if (config.ExtraHeightToRemove != null)
            correctHeight = correctHeight - config.ExtraHeightToRemove;

        config.Element.css("width", correctWidth);
        config.Element.css("height",
            correctHeight);

        if (config.RowElement != null) {
            config.RowElement.css("height", correctHeight / config.RowCount);
        }
    };
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

NekroController.NekroLazy = function (config) {
    var lazyElements = [];
    registerListener('load', getLazyList);
    registerListener('load', loadLazyList);
    registerListener('scroll', loadLazyList);
    registerListener('resize', loadLazyList);
    registerListener('click', loadLazyList);

    function getLazyList() {
        lazyElements = config.Container.find('.nekroLazy');
    }

    function loadLazyList() {
        if (lazyElements.length > 0) {
            setTimeout(function() {
                    for (var i = 0; i < lazyElements.length; i++) {
                        var img = lazyElements[i];
                        if (img.offsetParent != null && isVisibleOnScreen(img)) {
                            if (img.getAttribute('data-src')) {
                                img.src = img.getAttribute('data-src');
                                img.removeAttribute('data-src');
                            }
                        }
                    }
                    cleanLazyList();
                },
                500);
        }
    }

    function cleanLazyList() {
        lazyElements = Array.prototype.filter.call(lazyElements, function (l) { return l.getAttribute('data-src'); });
    }

    function isVisibleOnScreen(item) {
        var rect = item.getBoundingClientRect();

        return (
            rect.bottom >= 0 &&
                rect.right >= 0 &&
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function registerListener(event, func) {
        if (window.addEventListener) {
            window.addEventListener(event, func);
        } else {
            window.attachEvent('on' + event, func);
        }
    }
};

NekroController.NekroSlidingBars = function (config) {
    config.ElementClicked.on('click',
        function (e) {
            if ($(config.ElementExcluded).find($(e.target)).length > 0 || $(e.target).is($(config.ElementExcluded))) {
                return;
            }
            var activeItem = $('.activeSlideItem');
            if (activeItem.length > 0) {
                if (activeItem.is($(this))) {
                    $(this).find(config.ElementForToggle).slideUp('slow');
                    activeItem.removeClass('activeSlideItem',
                        function() {
                            if (config.IsSticky) {
                                $(this).find(config.ElementToStick).unstick();
                            }
                        });
                } else {
                    activeItem.find(config.ElementForToggle).slideUp('slow');
                    activeItem.removeClass('activeSlideItem',
                        function() {
                            if (config.IsSticky) {
                                $(this).find(config.ElementToStick).unstick();
                            }
                        });

                    $(this).find(config.ElementForToggle).slideDown('slow');
                    $(this).addClass('activeSlideItem',
                        function() {
                            if (config.IsSticky) {
                                $("html, body").animate({ scrollTop: $(this).offset().top - 58 }, 'slow');
                                $(this).find(config.ElementToStick)
                                    .sticky({ topSpacing: 58, zIndex: 4, widthFromWrapper: true });
                                onStickEvents(activeItem, $(this).find(config.ElementToStick));
                            }
                        });
                }
            } else {
                $(this).find(config.ElementForToggle).slideDown('slow');
                $(this).addClass('activeSlideItem',
                    function() {
                        if (config.IsSticky) {
                            $("html, body").animate({ scrollTop: $(this).offset().top - 58 }, 'slow');
                            $(this).find(config.ElementToStick)
                                .sticky({ topSpacing: 58, zIndex: 4, widthFromWrapper: true });
                            onStickEvents(activeItem, $(this).find(config.ElementToStick));
                        }
                    });
            }
        });

    function onStickEvents(activeItem, element) {
        element.on("sticky-start",
            function() {
                activeItem.find('#sticky-wrapper').css('width', element.width() + 30);
            });
        element.on("sticky-end",
            function() {
                activeItem.find('#sticky-wrapper').css('width', element.width() - 30);
            });
    }
};

NekroController.NekroProfileCard = function(config) {
    // if there is any card open - dispose it
    if ($('.commentProfileCard').length > 0) {
        var currentCard = $('.commentProfileCard');
        // if same element is clicked
        if (currentCard.parent().is(config.Element)) {
            currentCard.slideUp('slow', function () {
                currentCard.detach();
            });
            return;
        }
        currentCard.slideUp('slow', function () {
            currentCard.detach();
        });
    }

    // construct card and append it to html
    var cardConstructor = "<div class='commentProfileCard'>" +
        "<div class='commentProfileCardImage'>" + "<img src='" + config.Image + "'>" + "</div>" +
        "<div class='commentProfileCardInfo'>Pokaż profil " + config.User + "</div>" +
        "</div>";
    config.Element.append(cardConstructor);
    $('.commentProfileCard').hide().slideDown('slow');

    $('.commentProfileCard').click(function () {
        window.location.href = "/Account/UserPanel?userId=" + config.User;
    });
};

NekroController.NekroSub = function(isNavigation) {
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
                $('#nekroPanel').click();
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
                            $(this).hide().appendTo("#content");
                        }
                    } else {
                        $(this).hide().appendTo("#content");
                    }
                });
                // paging of existed posts
                $("#pagerCategories").pajinate({
                    items_per_page: 6
                });
                makeSubActive(currentlyActiveSubInCategories);
                $("#pagerCategories").css('min-width',
                    $(window).height() - $(".bottomFooter ").height() - $(".topMainElementsContainer").height())
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

NekroController.EditorInit = function(config) {
    window.tinymce.init({
        selector: config.Selector,
        theme: 'modern',
        plugins: [
            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
        ],
        toolbar1:
            'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
        image_advtab: true,
        height: config.CustomHeight != null ? config.CustomHeight : 350
    });
};