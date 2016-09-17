$(function () {
    pageGrids.articleGrid.onRowSelect(function (e) {
        var rowArticleId = e.row.Name;
        var name = rowArticleId.replace(" ", "+");
        window.location.href = "/Articles/Details/" + name;
    });
});