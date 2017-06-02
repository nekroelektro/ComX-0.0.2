$(document).ready(function () {
    var config= {
        ElementClicked: $(".sideBarComponent"),
        ElementForToggle: '.sideBody',
        IsSticky: false
    }
    NekroSlidingBars(config);

    $(".sideRandomPosts").click();

    var navConfig = {
        NavigationItems : ["Start", "Posty", "Pamiętnik", "Recenzje"]
    }
    NekroController.NekroNavigator(navConfig);
});