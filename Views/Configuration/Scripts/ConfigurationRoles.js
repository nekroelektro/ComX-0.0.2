$(function () {
    pageGrids.roleGrid.onRowSelect(function (e) {
        var rowRoleId = e.row.Id;
        window.location.href = '@Url.Action("RolesDetails", "Configuration")?roleId=' + rowRoleId;
    });
});