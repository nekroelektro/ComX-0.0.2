function NekroParams() { }

NekroParams.GetScreenSize = function () {
    var windowSize = {
        Width: NekroParams.GetScreenWidth(),
        Height: NekroParams.GetScreenHeight()
    }
    return windowSize;
}

NekroParams.GetScreenHeight = function() {
    return $(window).height();
}

NekroParams.GetScreenWidth = function () {
    return $(window).width();
}

NekroParams.CheckEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}