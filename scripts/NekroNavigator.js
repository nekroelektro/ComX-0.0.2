function NekroNavigator(navigationPage) {
    var htmlString = '';
    var navigationArray;
    if (navigationPage == "Index") {
        navigationArray = ["Start", "Posty", "Pamiętnik", "Recenzje"]; //dodać newsy
    }else if (navigationPage == "Details") {
        navigationArray = ["Start", "Artykuł", "Komentarze"];
    }

    //Build navigator html based on navigationArray
    $.each(navigationArray,
        function (i, item) {
            var iconString = '';
            if (item == "Start") {
                iconString = "play-circle";
            }else if (item == "Newsy") {
                iconString = "globe";
            }else if (item == "Posty") {
                iconString = "th-large";
            }else if (item == "Pamiętnik") {
                iconString = "book";
            }else if (item == "Recenzje") {
                iconString = "cd";
            }else if (item == "Artykuł") {
                iconString = "align-left"
            }else if (item == "Komentarze") {
                iconString = "comment";
            }else if (item == "Detale") {
                iconString = "zoom-in";
            }

            var itemString =
                    '<div class="navigatorMenuItem">' +
                        '<span class="glyphicon glyphicon-' + iconString + ' navigatorIcon" aria-hidden="true"></span>' +
                         '<div class="navigatorMenuItemName">' +
                            item +
                        '</div>' +
                    '</div>';

            htmlString = htmlString + itemString;
        });
    $('.mainNavigatorContainerAllItems').hide().append(htmlString).fadeIn("fast");

    //Select first element on start
    $('.navigatorMenuItemName:contains("Start")').parent().addClass('activeNavigatorItem');

    // click on navigator item
    $(".navigatorMenuItem").click(function () {
        var searchedStringId = $(this).text();
        var element = $('#' + searchedStringId);
        $('html, body').animate({
            scrollTop: element.offset().top - 59
        }, 250, function () {
            $(this).addClass("activeNavigatorItem");          
        });
    });

    $('.mainNavigatorHide').click(function() {
        //$('.mainNavigatorContainer').hide('slide', { direction: 'left' }, 'fast');
        $('.mainNavigatorContainer').animate({ "left": -$('.mainNavigatorContainer').width() }, 'fast');
        $('.mainNavigatorContainerShow').show('slide', { direction: 'right' }, 'fast');
    });

    $('.mainNavigatorContainerShow').click(function () {
        $('.mainNavigatorContainerShow').hide('slide', { direction: 'left' }, 'fast');
        //$('.mainNavigatorContainer').show('slide', { direction: 'right' }, 'fast');
        $('.mainNavigatorContainer').animate({ "left": 0 }, 'fast');
    });
};