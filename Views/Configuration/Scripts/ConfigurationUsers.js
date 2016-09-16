$(function () {
    pageGrids.userGrid.onRowSelect(function (e) {
        var rowUserId = e.row.UserId;
        window.location.href = '@Url.Action("UserPanel", "Account")?userId=' + rowUserId;
    });
});