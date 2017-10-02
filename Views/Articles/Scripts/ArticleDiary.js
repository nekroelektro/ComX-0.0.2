function ArticleDiary(config) {
    ArticleDiary.Control = config;
    ArticleDiary.Init();
};

ArticleDiary.Init = function () {
    $('#' + ArticleDiary.Control.DiaryList).pajinate({
        items_per_page: 10,
        show_first_last: false
    });

    $("." + ArticleDiary.Control.NavigationBackButton).click(function () {
        ArticleDiary.BackFromCategory();
    });
};

ArticleDiary.BackFromCategory = function () {
    var categoryBackAjaxConfig = {
        Url: "/Articles/Index/",
        Method: "GET",
        SuccessHandler: ArticleDiary.SuccessBackHandler
    };
    NekroController.NekroAjaxAction(categoryBackAjaxConfig);
};

ArticleDiary.SuccessBackHandler = function (result) {
    $("." + ArticleDiary.Control.MainContainer).html(result);
    $("html, body").animate({ scrollTop: $("." + ArticleDiary.Control.MainContainer).offset().top - 60 }, 'slow');
}