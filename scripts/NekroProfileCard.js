function NekroProfileCard(config) {
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

    $('.commentProfileCard').click(function() {
        window.location.href = "/Account/UserPanel?userId=" + config.User;
    });
};