$(function () {
    pageGrids.categoryGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = '@Url.Action("CategoriesDetails", "Configuration")?categoryId=' + rowCategoryId;
    });
    pageGrids.subCategoryGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = '@Url.Action("SubCategoriesDetails", "Configuration")?categoryId=' + rowCategoryId;
    });
    pageGrids.seriesGrid.onRowSelect(function (e) {
        var rowCategoryId = e.row.Id;
        window.location.href = '@Url.Action("SeriesDetails", "Configuration")?categoryId=' + rowCategoryId;
    });
});