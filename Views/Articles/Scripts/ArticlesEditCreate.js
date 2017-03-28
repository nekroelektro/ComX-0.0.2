$(document).ready(function () {
    //$('#clearUploadControlButton').hide();

    window.tinymce.init({
        selector: '.articleEditor',
        theme: 'modern',
        plugins: [
          'advlist autolink lists link image charmap print preview hr anchor pagebreak',
          'searchreplace wordcount visualblocks visualchars code fullscreen',
          'insertdatetime media nonbreaking save table contextmenu directionality',
          'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'print preview media | forecolor backcolor emoticons | codesample',
        image_advtab: true,
        height: 350
    });

    $('#IsDiary').change(function () {
        if ($(this).prop("checked")) {
            $('.diaryCreateComponent').show();
            $('.articleCreateComponent').hide();
        } else {
            $('.diaryCreateComponent').hide();
            $('.articleCreateComponent').show();
        }
    });

    if ($('#IsDiaryEdit').attr('checked')) {
        $('.diaryCreateComponent').show();
        $('.articleCreateComponent').hide();
    } else {
        $('.diaryCreateComponent').hide();
        $('.articleCreateComponent').show();
    }

    // Create/Edit handling
    var name,
        description,
        prelude,
        body,
        category,
        subCategory,
        series,
        label,
        genre,
        albumYear,
        releaseYear,
        catalog,
        isPublished,
        isDiary,
        createMode;

    if ($('#imgUp').val() != "") {
        $('#clearUploadControlButton').show();
    }

    $('#imgUp').change(function() {
        if ($('#imgUp').val() != "") {
            $('#clearUploadControlButton').removeClass('hidden');
        }
    });

    var handleSubmitEdit = function () {
        // przypisz wartości z kontrolek do variablesów
    }

    $('#clearUploadControlButton').click(function() {
        $('#imgUp').val('');
        $('#clearUploadControlButton').addClass('hidden');
    });

    $('#submitArticleEditCreate').click(function () {
        handleSubmitEdit();
            $.ajax({
                url: "/Articles/CommentEdit/",
                type: "POST",
                data: { 'bodyText': body, 'commentId': comIdentificator, 'articleId': artIdentificator, 'isDiary': diary }
            })
                .success(function (response) {
                    handleAddAfterEdit(response);
        });
    });
});