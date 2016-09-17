$(function () {
    pageGrids.roleGrid.onRowSelect(function (e) {
        var rowRoleId = e.row.Id;
        window.location.href = "/Configuration/RolesDetails?roleId=" + rowRoleId;
    });
});