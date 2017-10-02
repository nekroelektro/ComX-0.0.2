function ArticlesCategories(config) {
    ArticlesCategories.Control = config;
    ArticlesCategories.Init();
};

ArticlesCategories.Init = function () {
    NekroController.NekroSub(false);

    $("." + ArticlesCategories.Control.NavigationBackButton).click(function () {
        ArticlesCategories.BackFromCategory();
    });
};

ArticlesCategories.BackFromCategory = function() {
    var categoryBackAjaxConfig = {
        Url: "/Articles/Index/",
        Method: "GET",
        SuccessHandler: ArticlesCategories.SuccessBackHandler
    };
    NekroController.NekroAjaxAction(categoryBackAjaxConfig);
};

ArticlesCategories.SuccessBackHandler = function(result) {
    $("." + ArticlesCategories.Control.MainContainer).html(result);
    $("html, body").animate({ scrollTop: $("." + ArticlesCategories.Control.MainContainer).offset().top - 60 }, 'slow');
}