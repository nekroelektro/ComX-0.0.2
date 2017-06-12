$(document).ready(function () {
    pageGrids.userGrid.onRowSelect(function (e) {
        var rowUserId = e.row.UserName;
        window.location.href = "/Account/UserPanel?userId=" + rowUserId;
    });
});