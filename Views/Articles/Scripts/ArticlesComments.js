jQuery(document).ready(function ($) {
        var comIdentificator;
        var artIdentificator;
        var diary;
        var handleEmptyComment = function () {
            $('.popupCommentEmpty').click();
        }
        var handleAddAfterEdit = function (container) {
            $("#detailsCommentSection").empty();
            $("#detailsCommentSection").html(container);
        }

    //Hack for not fetching editor config if user not logged
        if (!$('#editComment-modal').is(":visible") && $('.logoUserPanel ').is(":visible")) {
        //var editorInstance = CKEDITOR.instances['commentEditor'];
        //if (editorInstance) {
        //    editorInstance.destroy(true);
        //}
            CKEDITOR.replace('commentEditor');
        }

    //For deleting single comment
        $('.popupCommentDelete').magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true
        });
        $('.popupCommentDelete').click(function () {
            comIdentificator = $(this).data('id').toString();
            artIdentificator = $(this).data('art').toString();
            diary = $(this).data('diary').toString();
        });
    //Adding new comment
        $('.addCommentButton').click(function () {
                var bodyText = CKEDITOR.instances['commentEditor'].getData();
                var articleIdentificator = $('.commentAddFormArtId').val();
                var isDiary = $(this).val();
                if (bodyText != "") {
                    $.ajax({
                            url: "/Articles/_Comments/",
                            type: "POST",
                            data: { 'body': bodyText, 'articleId': articleIdentificator, 'isDiary': isDiary }
                        })
                        .done(function (partialViewResult) {
                            handleAddAfterEdit(partialViewResult);
                        });
                } else {
                    handleEmptyComment();
                }
        });
        $('.popupCommentEmpty').magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true
        });
    //Deleting the comment       
        $('.btnConfirmDeletion').click(function () {
            if (comIdentificator != null && artIdentificator != null && diary != null) {
                $.ajax({
                        url: "/Articles/DeleteComment/",
                        type: "POST",
                        data: { 'commentId': comIdentificator, 'articleId': artIdentificator, 'isDiary': diary }
                    })
                    .done(function(partialViewResult) {
                        $.magnificPopup.close();
                        handleAddAfterEdit(partialViewResult);
                    });
            }
        });

        $(document).on('click', '.btnCancelDeletion', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });
        
        $(document).on('click', '.btnCancelEdit', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        });      

        //For editing single comment
        $('.popupCommentEdit').magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true
        });
        $('.popupCommentEdit').click(function () {
            comIdentificator = $(this).data('id').toString();
            artIdentificator = $(this).data('art').toString();
            var diary = $(this).data('diary').toString();
            var body = $(this).data('body').toString();
            if ($('#editComment-modal').is(":visible")) {
                //var editorInstanceEdit = CKEDITOR.instances['editCommentWindowContainer'];
                //if (editorInstanceEdit) {
                //    editorInstanceEdit.destroy(true);
                //}
                CKEDITOR.replace('editCommentWindowContainer');
                CKEDITOR.instances['editCommentWindowContainer'].setData(body);
            }
            $('.submitEditCommentForm').click(function () {
                body = CKEDITOR.instances['editCommentWindowContainer'].getData();
                if (body != "") {
                $.ajax({
                    url: "/Articles/CommentEdit/",
                    type: "POST",
                    data: { 'bodyText': body, 'commentId': comIdentificator,'articleId' : artIdentificator, 'isDiary': diary }
                })
                    .success(function (response) {
                        var editorInstanceEdit = CKEDITOR.instances['editCommentWindowContainer'];
                        editorInstanceEdit.destroy(true);
                        $.magnificPopup.close();
                        handleAddAfterEdit(response);
                    });
            } else {
                handleEmptyComment();
            }
        });
    });       
});