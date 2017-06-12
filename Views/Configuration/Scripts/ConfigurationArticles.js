$(document).ready(function () {
    // Handling article grid buttons
    $('.configurationArticlesGoButtonContainer').on("click",
        function() {
            pageGrids.articleGrid.onRowSelect(function (e) {
                var rowArticleId = e.row.Name;
                var name = rowArticleId.replace(" ", "+");
                window.location.href = "/Articles/Details/" + name;
            });
        });
    $('.configurationArticlesEditButtonContainer').on("click",
        function() {
            pageGrids.articleGrid.onRowSelect(function (e) {
                var rowArticleId = e.row.Id;
                var name = rowArticleId.replace(" ", "+");
                window.location.href = "/Articles/Edit?createMode=false&id=" + rowArticleId + "&isDiary=false";
            });
        });

    // Handling diaries grid buttons
    $('.configurationDiariesGoButtonContainer').on("click",
        function () {
            pageGrids.diariesGrid.onRowSelect(function (e) {
                var rowArticleId = e.row.Name;
                var name = rowArticleId.replace(" ", "+");
                window.location.href = "/Articles/Details/" + name + "?isDiary=true";
            });
        });
    $('.configurationDiariesEditButtonContainer').on("click",
        function () {
            pageGrids.diariesGrid.onRowSelect(function (e) {
                var rowArticleId = e.row.Id;
                var name = rowArticleId.replace(" ", "+");
                window.location.href = "/Articles/Edit?createMode=false&id=" + rowArticleId + "&isDiary=true";
            });
        });
});