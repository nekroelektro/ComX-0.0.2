function ConfigurationUsers(config) {
    ConfigurationUsers.Control = config;
    ConfigurationUsers.Init();
}

ConfigurationUsers.Init = function () {
    $("." + ConfigurationUsers.Control.GridRow).click(function() {
        var userName = $(this).find('td[data-name="UserName"]').html();
        window.location.href = "/Account/UserPanel?userId=" + userName;
    });
};