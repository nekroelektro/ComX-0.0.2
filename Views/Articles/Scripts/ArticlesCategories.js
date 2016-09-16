$(document).ready(function () {
    $(function () {
        pageGrids.categoryArticleGrid.onRowSelect(function (e) {
            var rowArticleId = e.row.Id;
            window.location.href = '@Url.Action("Details", "Articles")/' + rowArticleId;
        });
    });

    // PACKERY
    var $grid = $('.grid').packery({
        // options
        itemSelector: '.singleIndexArticle',
        gutter: 13,
        percentPosition: true,
        transitionDuration: '0.1s'
    });


    $grid.imagesLoaded().progress(function () {
        $grid.packery();
    });


    $('#pager').pajinate({
        num_page_links_to_display: 3,
        items_per_page: 10
    });

    $(".page_navigation a").click(function () {
        $grid.packery();
    });

    $('.miniaturesView').click(function () {
        $('#pager').show();
        $('.articlesIndexContainer').hide();
    });

    $('.listView').click(function () {
        $('#pager').hide();
        $('.articlesIndexContainer').show();
    });
});