$(document).ready(function () {
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

    if ($('[name=IsDiary]').is(":checked")) {
        $('.diaryCreateComponent').show();
        $('.articleCreateComponent').hide();
    } else {
        $('.diaryCreateComponent').hide();
        $('.articleCreateComponent').show();
    }

    // Create/Edit handling
    var form;
    var formData;
    var handleSubmitEdit = function () {
        // Serialize form data for injection to .NET
        form = $('.EditFormContainer');
        formData = new FormData(form[0]);

        // Get image from control
        var fileInput = document.getElementById('imgUp');
        if (fileInput != null) {
            var file = fileInput.files[0];
            formData.set('File', file);
        }

        // Get changes in html editors
        formData.set('IndexDescription', tinymce.get('IndexDescription').getContent());
        formData.set('Prelude', tinymce.get('Prelude').getContent());
        formData.set('Body', tinymce.get('Body').getContent());

        // For hidden and disabled fields
        formData.set('Id', $('[name=Id]').val());
        formData.set('IsCreate', $('[name=IsCreate]').is(":checked"));
        formData.set('IsDiary', $('[name=IsDiary]').is(":checked"));
        formData.set('DateCreated', $('[name=DateCreated]').val());
        formData.set('DateEdited', $('[name=DateEdited]').val());
        formData.set('IsPublished', $('[name=IsPublished]').is(":checked"));
        formData.set('AlbumYear', $('[name=AlbumYear]').val());
        formData.set('ReleaseYear', $('[name=ReleaseYear]').val());
    }

    var handleSubmitEditErrors = function () {
        var errorString = '';
        if ($('[name=IsDiary]').is(":checked")) {
            if ($('[name=Name]').val() == '' ||
                tinymce.get('Body').getContent() == '' ||
                $('[name=Label]').val() == '' ||
                $('[name=Genre]').val() == '' ||
                $('[name=AlbumYear]').val() == '' ||
                $('[name=ReleaseYear]').val() == '' ||
                $('[name=CatalogueNumber]').val() == '') {
                errorString = "<div class='editErrorMessage'><h3>Musisz uzupełnić wszystkie wymagane pola!</h3></div>";
            }
        } else {
            if ($('[name=Name]').val() == '' ||
                tinymce.get('IndexDescription').getContent() == '' ||
                tinymce.get('Prelude').getContent() == '' ||
                tinymce.get('Body').getContent() == '') {
                errorString = "<div class='editErrorMessage'><h3>Musisz uzupełnić wszystkie wymagane pola!</h3></div>";
            }
        }
        if (errorString != '') {
            if ($('.editErrorMessage').length > 0) {
                $('.editErrorMessage').detach();
            }
            $('.editErrorContainer').hide().append(errorString).fadeIn("fast");
            return false;
        } else {
            return true;
        }
    }

    var appendUploadControlAfterDelete = function() {
        var uploadControl = '<div class="editUploadControl">' +
            '<input type="file" id="imgUp" name="upload" />' +
            '<button id="clearUploadControlButton" class="btn nekrobutton-red hidden">' +
            '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Usuń obrazek' +
            '</button>' +
            '</div>';
        $('.editImage').append(uploadControl);
    }

    if ($('#imgUp').val() != "") {
        $('#clearUploadControlButton').show();
    }

    $('#imgUp').change(function () {
        if ($('#imgUp').val() != "") {
            $('#clearUploadControlButton').removeClass('hidden');
        }
    });

    $('#clearUploadControlButton').click(function() {
        $('#imgUp').val('');
        $('#clearUploadControlButton').addClass('hidden');
    });

    $('#clearImageControlButton').click(function() {
        var articleIdentificator = $('.editArtIdInput').val();
        var isDiary = $(this).val();

        $.ajax({
                url: "/Articles/DeleteImage/",
                type: "POST",
                data: { 'createMode' : false, 'articleId': articleIdentificator, 'isDiary': isDiary }
            })
            .done(function (response) {
                $('.editImageControl').hide();
                //$('.editUploadControl').show();
                appendUploadControlAfterDelete();
                //window.location.href = response.Url;
            });
    });

    $('#submitArticleEditCreate').click(function () {
        if (handleSubmitEditErrors()) {
            handleSubmitEdit();
            $.ajax({
                    url: "/Articles/Edit/",
                    type: "POST",
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false, //for file upload
                    data: formData
                })
                .done(function(response) {
                    window.location.href = response.Url;
                });
        } else {
            $("html, body").animate({ scrollTop: 0 }, "fast");
        }
    });
});