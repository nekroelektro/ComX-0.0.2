jQuery(document).ready(function ($) {
    var body = $('#bodyCommentEditContainer').val();
    var editorInstance = CKEDITOR.instances['editCommentWindowContainer'];
    if (editorInstance) {
        editorInstance.destroy(true);
    }
    CKEDITOR.replace('editCommentWindowContainer');
    CKEDITOR.instances['editCommentWindowContainer'].setData(body);

    $('.submitEditCommentForm').click(function () {
        body = CKEDITOR.instances['editCommentWindowContainer'].getData();
        console.log(body);
        var articleIdentificator = $(this).data('id').toString();
        var isDiary = $(this).data('diary').toString();
        if (body != "") {
            $.ajax({
                url: "/Articles/CommentEdit/",
                type: "POST",
                data: { 'bodyText': body, 'id': articleIdentificator, 'isDiary': isDiary }
            })
                .success(function (response) {
                    e.preventDefault();
                    $.magnificPopup.close();
                    window.location.href = response.redirect;
                });
        } else {
            //handleEmptyComment();
        }
    });
});