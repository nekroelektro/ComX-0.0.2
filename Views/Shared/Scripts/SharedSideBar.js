$(document).ready(function () {
    $(".sideBar").sticky({ topSpacing: 58, zIndex: 4, widthFromWrapper: true });

    var config= {
        ElementClicked: $(".sideBarComponent"),
        ElementForToggle: '.sideBody',
        IsSticky: false
    }
    NekroSlidingBars(config);

    $(".sideRandomPosts").click();
});