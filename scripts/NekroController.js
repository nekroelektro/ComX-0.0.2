function NekroController() { }

NekroController.NekroNavigator = function(config) {
    var htmlString = '';
    var navigationArray = config.NavigationItems;

    //Build navigator html based on navigationArray
    $.each(navigationArray,
        function (i, item) {
            var iconString = '';
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
                iconString = "align-left"
            } else if (item == "Komentarze") {
                iconString = "comment";
            } else if (item == "Detale") {
                iconString = "zoom-in";
            }

            var itemString =
                "<li><a href=#"+item+">" +
                    '<div class="sideTitle navigatorMenuClickItem">' +
                        '<p><span class="glyphicon glyphicon-' + iconString + ' navigatorIcon" aria-hidden="true"></span>' +
                        '<div class="navigatorMenuItemName">' +
                            item +
                        '</div></p>' +
                    '</div>' +
                "</a></li>";

            htmlString = htmlString + itemString;
        });
    htmlString = "<nav class='navbar'><ul class='nav nav-pills nav-stacked'>" + htmlString + "</ul></nav>";
    $('.mainNavigatorContainerAllItems').hide().append(htmlString).fadeIn("fast");

    //Select first element on start
    $('.navigatorMenuItemName:contains("Start")').parent().addClass('activeNavigatorItem');

    // click on navigator item
    $(".navigatorMenuClickItem").click(function () {
        var searchedStringId = $(this).text();
        var element = $('#' + searchedStringId);
        $('html, body').animate({
            scrollTop: element.offset().top - 58
        }, 250, function () {
            $(this).addClass("activeNavigatorItem");
        });
    });
}