$(function () {
    pageGrids.categoryGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = "/Configuration/CategoriesDetails?categoryId=" + rowCategoryId;
    });
    pageGrids.subCategoryGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = "/Configuration/SubCategoriesDetails?categoryId=" + rowCategoryId;
    });
    pageGrids.seriesGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = "/Configuration/SeriesDetails?categoryId=" + rowCategoryId;
    });
});