$(function () {
    pageGrids.articleGrid.onRowSelect(function (e) {
        var rowArticleId = e.row.Name;
        var name = rowArticleId.replace(" ", "+");
        window.location.href = "/Articles/Details/" + name;
    });
    pageGrids.diariesGrid.onRowSelect(function (e) {
        console.log(e);
        var rowDiaryId = e.row.Name;
        var name = rowDiaryId.replace(" ", "+");
        console.log(name);
        window.location.href = "/Articles/DetailDiaryHelper/" + name;
    });
});