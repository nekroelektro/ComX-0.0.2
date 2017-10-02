function ArticlesComments(config) {
    ArticlesComments.Control = config;
    ArticlesComments.Init();

    ArticlesComments.CommentId = "";
    ArticlesComments.ArticleId = "";
    ArticlesComments.IsDiary = false;
    ArticlesComments.IsResponse = false;
    ArticlesComments.CommentThreadId = "";
};

ArticlesComments.Init = function() {
    ArticlesComments.EditorNotFetch();

    ArticlesComments.CommentPopupsInit();

    $("." + ArticlesComments.Control.CommentThreadResponseAnchor).click(function() {
        ArticlesComments.CommentResponseHandler($(this));
    });

    $("." + ArticlesComments.Control.PopupCommentEdit).click(function() {
        ArticlesComments.EditCommentHandler($(this));
    });

    $("." + ArticlesComments.Control.AddCommentButton).click(function() {
        ArticlesComments.AddCommentHandler($(this));
    });

    $("." + ArticlesComments.Control.AddCommentResponseButton).click(function() {
        ArticlesComments.AddCommentHandler($(this));
    });

    $("." + ArticlesComments.Control.CommentDetailsProfileModalAnchor).click(function() {
        ArticlesComments.ProfileCardClick($(this));
    });

    $("." + ArticlesComments.Control.LoginComments).click(function() {
        ArticlesComments.LoginFromCommentsClick();
    });

    $("." + ArticlesComments.Control.PopupCommentDelete).click(function() {
        ArticlesComments.PopupCommentDeleteClick($(this));
    });

    $("." + ArticlesComments.Control.BtnConfirmCommentDeletion).click(function() {
        ArticlesComments.CommentDeleteConfirm();
    });

    $(document).on("click",
        ".btnCancelEdit",
        function (e) {
            ArticlesComments.CancelEdit(e);
        });

    $("." + ArticlesComments.Control.SubmitEditCommentForm).click(function () {
        ArticlesComments.SubmitCommentEdit();
    });
};

ArticlesComments.CommentResponseHandler = function(item) {
    ArticlesComments.IsResponse = true;
    ArticlesComments.CommentThreadId = item.data("id").toString();
    var name = item.data("name").toString();

    $("." + ArticlesComments.Control.AddCommentButton).hide();
    $("." + ArticlesComments.Control.CommentsEditButtons).hide();
    $("." + ArticlesComments.Control.CommentsResponseButtons).show();

    CKEDITOR.instances["commentEditor"].setData("@" + name + " ");
    $("html, body").animate({ scrollTop: $("#" + ArticlesComments.Control.DetailsCommentSection).offset().top - 60 },
        "slow");
};

ArticlesComments.AddCommentHandler = function(item) {
    var bodyText = CKEDITOR.instances["commentEditor"].getData();
    var articleIdentificator = $("." + ArticlesComments.Control.CommentAddFormArtId).val();
    var isDiary = item.val();
    if (bodyText != "") {
        var loginAjaxConfig = {
            Url: "/Articles/_Comments/",
            Method: "POST",
            Params: {
                'body': bodyText,
                'articleId': articleIdentificator,
                'isDiary': isDiary,
                'isResponse': ArticlesComments.IsResponse,
                'thread': ArticlesComments.CommentThreadId
            },
            SuccessHandler: ArticlesComments.HandleAddAfterEdit
        };
        NekroController.NekroAjaxAction(loginAjaxConfig);
    } else {
        ArticlesComments.HandleEmptyComment();
    }
};

ArticlesComments.EditCommentHandler = function(item) {
    ArticlesComments.CommentId = item.data("id").toString();
    ArticlesComments.ArticleId = item.data("art").toString();
    ArticlesComments.IsDiary = item.data("diary").toString();
    var body = item.data("body").toString();
    CKEDITOR.instances["commentEditor"].setData(body);
    $("html, body").animate({ scrollTop: $("#" + ArticlesComments.Control.DetailsCommentSection).offset().top - 60 },
        "slow");
    $("." + ArticlesComments.Control.CommentsEditButtons).show();
    $("." + ArticlesComments.Control.AddCommentButton).hide();
    $("." + ArticlesComments.Control.CommentsResponseButtons).hide();
};

ArticlesComments.SubmitCommentEdit = function() {
    var body = CKEDITOR.instances["commentEditor"].getData();
    if (body != "") {
        var loginAjaxConfigEdit = {
            Url: "/Articles/CommentEdit/",
            Method: "POST",
            Params: {
                'bodyText': body,
                'commentId': ArticlesComments.CommentId,
                'articleId': ArticlesComments.ArticleId,
                'isDiary': ArticlesComments.IsDiary
            },
            SuccessHandler: ArticlesComments.EditConfirmHelper
        };
        NekroController.NekroAjaxAction(loginAjaxConfigEdit);
    } else {
        ArticlesComments.HandleEmptyComment();
    }
};

ArticlesComments.CancelEdit = function(e) {
    e.preventDefault();
    CKEDITOR.instances["commentEditor"].setData("");
    ArticlesComments.IsResponse = false;
    $("." + ArticlesComments.Control.CommentsEditButtons).hide();
    $("." + ArticlesComments.Control.CommentsResponseButtons).hide();
    $("." + ArticlesComments.Control.AddCommentButton).show();
}

ArticlesComments.EditConfirmHelper = function(result) {
    var editorInstanceEdit = CKEDITOR.instances["commentEditor"];
    if (editorInstanceEdit) {
        try {
            // Chrome plugin error fix
            editorInstanceEdit.focusManager.blur(true);
            editorInstanceEdit.destroy(true);
        } catch (e) {
        }
    }
    ArticlesComments.HandleAddAfterEdit(result);
};

ArticlesComments.CommentPopupsInit = function() {
    //For deleting single comment
    var deletePopConfig = {
        Title: "USUWANIE KOMENTARZA",
        ClickedElement: $("." + ArticlesComments.Control.PopupCommentDelete),
        ContainerElement: $("#test-modal"),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(deletePopConfig);

    // for empty comment
    var emptyPopConfig = {
        Title: "PUSTY KOMENTARZ",
        ClickedElement: $("." + ArticlesComments.Control.PopupCommentEmpty),
        ContainerElement: $("#" + ArticlesComments.Control.EmptyCommentModal),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(emptyPopConfig);
};

ArticlesComments.ProfileCardClick = function(item) {
    var config = {
        Element: item.parent(),
        Image: item.closest("." + ArticlesComments.Control.SingleCommentSection).find(".commentFooter img")
            .attr("src"),
        User: item.text().replace(/\s/g, "")
    };
    NekroController.NekroProfileCard(config);
};

ArticlesComments.LoginFromCommentsClick = function() {
    $("." + ArticlesComments.Control.SideLoginAnchor).click();
};

ArticlesComments.PopupCommentDeleteClick = function(item) {
    ArticlesComments.CommentId = item.data("id").toString();
    ArticlesComments.ArticleId = item.data("art").toString();
    ArticlesComments.IsDiary = item.data("diary").toString();
};

ArticlesComments.CommentDeleteConfirm = function() {
    if (ArticlesComments.CommentId != null && ArticlesComments.ArticleId != null && ArticlesComments.IsDiary != null) {
        var loginAjaxConfigDel = {
            Url: "/Articles/DeleteComment/",
            Method: "POST",
            Params: {
                'commentId': ArticlesComments.CommentId,
                'articleId': ArticlesComments.ArticleId,
                'isDiary': ArticlesComments.IsDiary
            },
            SuccessHandler: ArticlesComments.CommentDeleteHelper
        };
        NekroController.NekroAjaxAction(loginAjaxConfigDel);
    }
};

ArticlesComments.CommentDeleteHelper = function(partialViewResult) {
    $(".shutNekroPop").click();
    ArticlesComments.HandleAddAfterEdit(partialViewResult);
};

ArticlesComments.HandleAddAfterEdit = function(container) {
    $("#" + ArticlesComments.Control.DetailsCommentSection).empty();
    $("#" + ArticlesComments.Control.DetailsCommentSection).html(container);
};

ArticlesComments.HandleEmptyComment = function() {
    $("." + ArticlesComments.Control.PopupCommentEmpty).click();
};

ArticlesComments.EditorNotFetch = function() {
    //Hack for not fetching editor config if user not logged
    if ($("#" + ArticlesComments.Control.CommentEditor).is(":visible")) {
        setTimeout(function() {
                CKEDITOR.replace("commentEditor");
            },
            300);
    }
};