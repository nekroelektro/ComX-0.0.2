function ArticlesIndex(config) {
    ArticlesIndex.Control = config;
    ArticlesIndex.Init();
};

ArticlesIndex.Init = function () {
    $('#' + ArticlesIndex.Control.Pager).pajinate({
        items_per_page: 6,
        show_first_last: false
    });

    $('#' + ArticlesIndex.Control.IndexSeeDiaryCategory).click(function () {
        window.location.href = "/Articles/Diary";
    });

    $('.' + ArticlesIndex.Control.PageNavAnchor).click(function () {
        ArticlesIndex.NavigationClickHandler();
    });

    var postsBlackConfig = {
        Container: $('.' + ArticlesIndex.Control.ArticlesIndexTable),
        Element: $('.' + ArticlesIndex.Control.ArticlesIndexSingleImage),
        OverlayElement: $('.' + ArticlesIndex.Control.ImageOverlayColorIndex)
    }
    NekroController.NekroBlackened(postsBlackConfig);

    var reviewsBlackConfig = {
        Container: $('.' + ArticlesIndex.Control.IndexReviewsContainer),
        Element: $('.' + ArticlesIndex.Control.IndexSingleReview),
        OverlayElement: $('.' + ArticlesIndex.Control.ImageOverlayColorIndex)
    }
    NekroController.NekroBlackened(reviewsBlackConfig);

    ArticlesIndex.DynamicsInit();

    ArticlesIndex.SlickInit();

    $('.' + ArticlesIndex.Control.IndexSingleReviewAnchor)
        .mouseover(function () {
            $(this).find("#" + ArticlesIndex.Control.ReviewIndexImage).addClass('transition-overflow');
        })
        .mouseleave(function () {
            $(this).find("#" + ArticlesIndex.Control.ReviewIndexImage).removeClass('transition-overflow');
        });
};

ArticlesIndex.NavigationClickHandler = function () {
    $('html, body').animate({
        scrollTop: $('#' + ArticlesIndex.Control.Pager).offset().top - 59
    }, 600);
};

ArticlesIndex.DynamicsInit = function() {
    setTimeout(function () {
            var heightPostsConfig = {
                Element: $('#' + ArticlesIndex.Control.Posty),
                RowElement: $('.' + ArticlesIndex.Control.IndexSingleArticleContainer),
                RowCount: 2,
                ExtraHeightToRemove: $('.' + ArticlesIndex.Control.ArticlesIndexHeader).height(),
                GotNav: true
            }
            NekroController.NekroDynamicSize(heightPostsConfig);

            var heightDiaryConfig = {
                Element: $('#' + ArticlesIndex.Control.Pamiętnik),
                RowElement: $('.' + ArticlesIndex.Control.IndexSingleArticleContainerDiary),
                RowCount: 7,
                ExtraHeightToRemove: $('.' + ArticlesIndex.Control.ArticlesIndexHeader).height() - 5,
                GotNav: true
            }
            NekroController.NekroDynamicSize(heightDiaryConfig);

            var heightReviewsConfig = {
                Element: $('#' + ArticlesIndex.Control.Recenzje),
                RowElement: $('.' + ArticlesIndex.Control.IndexSingleReview),
                RowCount: 2,
                ExtraHeightToRemove: $('.' + ArticlesIndex.Control.ArticlesIndexHeader).height() - 5,
                GotNav: true
            }
            NekroController.NekroDynamicSize(heightReviewsConfig);
        },
        500);
};

ArticlesIndex.SlickInit = function() {
    $('.' + ArticlesIndex.Control.IndexDiaryPreviewWindow).slick({
        slidesToShow: 1,
        arrows: false,
        fade: true,
        asNavFor: '.' + ArticlesIndex.Control.IndexDiaryList,
        slide: '.' + ArticlesIndex.Control.BannerPanelImageContainerIndexDiary
    });

    $('.' + ArticlesIndex.Control.IndexDiaryList).slick({
        slidesToShow: 7,
        slide: '.' + ArticlesIndex.Control.IndexSingleArticleContainerDiary,
        asNavFor: '.' + ArticlesIndex.Control.IndexDiaryPreviewWindow,
        arrows: false,
        focusOnSelect: true
    });
};