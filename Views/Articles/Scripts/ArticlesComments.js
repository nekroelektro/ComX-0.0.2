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

        //For editing single comment
        $('.popupCommentEdit').magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true
        });
        $('.popupCommentEdit').click(function () {
            comIdentificator = $(this).data('id').toString();
            artIdentificator = $(this).data('art').toString();
            $('.dupa').html(data)('@Html.Action("CommentEdit", "Articles")/id=' + comIdentificator + 'artId=' + artIdentificator);
            var partialEdit = $(this).data('content');
            console.log(partialEdit);

            var url = partialEdit;

            $.ajax({
                url: url,
                method: 'GET',
                success: function(data) {
                    $('.dupa').html(data);
                }
            });
            $.ajax({
                url: url,
                data: {}, //parameters go here in object literal form
                type: 'GET',
                datatype: 'json',
                success: function (data) {
                    $('.dupa').html(data);
                },
                error: function () { alert('something bad happened'); }
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