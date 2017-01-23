jQuery(document).ready(function ($) {
        var comIdentificator;
        var artIdentificator;
    var diary;
        $('.articleEditorTextArea').trumbowyg();

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
        $(document).on('click', '.btnConfirmDeletion', function (e) {
            $.ajax({
                url: "/Articles/DeleteComment/",
                type: "POST",
                data: { 'commentId': comIdentificator, 'articleId': artIdentificator, 'isDiary' : diary }
            })
                .done(function (partialViewResult) {
                    $.magnificPopup.close();
                    $("#detailsCommentSection").html(partialViewResult);
                });
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

            $.ajax({
                url: "/Articles/CommentEdit?id=" + comIdentificator + '&artId=' + artIdentificator,
                method: 'GET',
                success: function (data) {
                    $('.editCommentContentInModal').html(data);
                }
            });

        $(document).on('click', '.submitEditCommentForm', function (e) {
            e.preventDefault();
            $(".test-modal-edit > form").submit();
            $.magnificPopup.close();
            location.reload();
        });

        //Helper for adding new comment
        $('.addCommentButton').click(function () {
            var articleIdentificator = $('.commentAddFormArtId').val();
            $("form").submit();
            window.location.href = '@Url.Action("Details", "Articles")/' + articleIdentificator;
        });
        });
});