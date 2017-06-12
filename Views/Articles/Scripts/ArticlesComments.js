jQuery(document).ready(function($) {
    var comIdentificator;
    var artIdentificator;
    var diary;
    var isResponse = false;
    var commentThread = "";
    var handleEmptyComment = function() {
        $(".popupCommentEmpty").click();
    };
    var handleAddAfterEdit = function(container) {
        $("#detailsCommentSection").empty();
        $("#detailsCommentSection").html(container);
    };

    //Hack for not fetching editor config if user not logged
    if ($("#commentEditor").is(":visible")) {
        setTimeout(function() {
                CKEDITOR.replace("commentEditor");
                //    // sticky comment input
                //    $(".newComment").sticky({ topSpacing: 60, zIndex: 4, widthFromWrapper: true });
                //    $(".newComment").on("sticky-start",
                //        function (e) {
                //            $(".commentInputBlock").css({ "width": "100%", "-webkit-box-shadow": "0 4px 4px -2px #000000", "-moz-box-shadow": "0 4px 4px -2px #000000", "box-shadow": "0 4px 4px -2px #000000" });
                //            $(".commentaryHello").slideUp("slow");
                //            $("#commentsMade").css('padding-top', $('.commentaryHello').height());
                //        });
                //    $(".newComment").on("sticky-end",
                //        function () {
                //            $(".commentInputBlock").css("width", "90%");
                //            $(".commentaryHeader").show();
                //            $("#commentsMade").css('padding-top', 0);
                //        });
            },
            300);
    }

    // HANDLING PROFILE CARD
    $(".commentDetailsProfileModalAnchor").click(function() {
        var config = {
            Element: $(this).parent(),
            Image: $(this).closest(".singleCommentSection").find(".commentFooter img").attr("src"),
            User: $(this).text().replace(/\s/g, "")
        };
        NekroProfileCard(config);
    });

    //For deleting single comment
    var deletePopConfig = {
        Title: "USUWANIE KOMENTARZA",
        ClickedElement: $(".popupCommentDelete"),
        ContainerElement: $('#test-modal'),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(deletePopConfig);

    $(".popupCommentDelete").click(function() {
        comIdentificator = $(this).data("id").toString();
        artIdentificator = $(this).data("art").toString();
        diary = $(this).data("diary").toString();
    });

    //Adding new comment
    $(".commentThreadResponseAnchor").click(function() {
        isResponse = true;
        commentThread = $(this).data("id").toString();
        var name = $(this).data("name").toString();

        $(".addCommentButton, .commentsEditButtons").hide();
        $(".commentsResponseButtons").show();
            
        CKEDITOR.instances["commentEditor"].setData("@" + name + " ");
        $("html, body").animate({ scrollTop: $("#detailsCommentSection").offset().top - 60 }, "slow");
    });
    $(".addCommentButton, .addCommentResponseButton").click(function () {
        var bodyText = CKEDITOR.instances["commentEditor"].getData();
        var articleIdentificator = $(".commentAddFormArtId").val();
        var isDiary = $(this).val();
        if (bodyText != "") {
            $.ajax({
                    url: "/Articles/_Comments/",
                    type: "POST",
                    data: { 'body': bodyText, 'articleId': articleIdentificator, 'isDiary': isDiary, 'isResponse' : isResponse, 'thread' : commentThread }
                })
                .done(function(partialViewResult) {
                    handleAddAfterEdit(partialViewResult);
                });
        } else {
            handleEmptyComment();
        }
    });

    var emotyPopConfig = {
        Title: "PUSTY KOMENTARZ",
        ClickedElement: $(".popupCommentEmpty"),
        ContainerElement: $('#emptyComment-modal'),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(emotyPopConfig);

    //Deleting the comment       
    $(".btnConfirmCommentDeletion").click(function() {
        if (comIdentificator != null && artIdentificator != null && diary != null) {
            $.ajax({
                    url: "/Articles/DeleteComment/",
                    type: "POST",
                    data: { 'commentId': comIdentificator, 'articleId': artIdentificator, 'isDiary': diary }
                })
                .done(function(partialViewResult) {
                    $('.shutNekroPop').click();
                    handleAddAfterEdit(partialViewResult);
                });
        }
    });


    // HANDLING EDIT COMMENT
    $(document).on("click",
        ".btnCancelEdit",
        function(e) {
            e.preventDefault();
            CKEDITOR.instances["commentEditor"].setData("");
            isResponse = false;
            $(".commentsEditButtons, .commentsResponseButtons").hide();
            $(".addCommentButton").show();
        });

    $(".popupCommentEdit").click(function() {
        comIdentificator = $(this).data("id").toString();
        artIdentificator = $(this).data("art").toString();
        var diary = $(this).data("diary").toString();
        var body = $(this).data("body").toString();
        CKEDITOR.instances["commentEditor"].setData(body);
        $("html, body").animate({ scrollTop: $("#detailsCommentSection").offset().top - 60 }, "slow");
        $(".commentsEditButtons").show();
        $(".addCommentButton, .commentsResponseButtons").hide();


        $(".submitEditCommentForm").click(function() {
            body = CKEDITOR.instances["commentEditor"].getData();
            if (body != "") {
                $.ajax({
                        url: "/Articles/CommentEdit/",
                        type: "POST",
                        data: {
                            'bodyText': body,
                            'commentId': comIdentificator,
                            'articleId': artIdentificator,
                            'isDiary': diary
                        }
                    })
                    .done(function(response) {
                        var editorInstanceEdit = CKEDITOR.instances["commentEditor"];
                        if (editorInstanceEdit) {
                            try {
                                // Chrome plugin error fix
                                editorInstanceEdit.focusManager.blur(true);
                                editorInstanceEdit.destroy(true);
                            } catch (e) {
                            }
                        }
                        handleAddAfterEdit(response);
                    });
            } else {
                handleEmptyComment();
            }
        });
    });

    $('.loginComments').on("click",
        function() {
            $('.sideLoginAnchor').click();
        });
});