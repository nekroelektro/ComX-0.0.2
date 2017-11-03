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