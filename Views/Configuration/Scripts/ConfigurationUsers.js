$(function () {
    pageGrids.userGrid.onRowSelect(function (e) {
        var rowUserId = e.row.UserId;
        window.location.href = "/Account/UserPanel?userId=" + rowUserId;
    });
});