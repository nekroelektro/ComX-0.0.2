function NekroEnterClick(config) {
    $(config.Scope).keypress(function(e) {
        if (e.which == 13) {
            console.log("Weszło! Clicknie zara");
            $(config.ElementToClick).click();
            return false; //<---- Add this line
        }
    });
};