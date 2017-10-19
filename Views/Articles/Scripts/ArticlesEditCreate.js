function ArticlesEditCreate(config) {
    ArticlesEditCreate.Control = config;
    ArticlesEditCreate.Init();

    ArticlesEditCreate.Form = '';
    ArticlesEditCreate.FormData = '';
};

ArticlesEditCreate.Init = function () {
    ArticlesEditCreate.EditorInit();

    ArticlesEditCreate.DeleteImageVisibilityHandler();

    $('#' + ArticlesEditCreate.Control.ClearUploadControlButton).click(function () {
        ArticlesEditCreate.ClearUpload();
    });

    $('#' + ArticlesEditCreate.Control.ClearImageControlButton).click(function() {
        ArticlesEditCreate.DeleteArticleImage($(this));
    });

    $('#' + ArticlesEditCreate.Control.SubmitArticleEditCreate).click(function() {
        ArticlesEditCreate.SubmitEdit();
    });

    $('#' + ArticlesEditCreate.Control.IsDiary).change(function () {
        ArticlesEditCreate.ModeSelectorHandler();
    });

    $('#' + ArticlesEditCreate.Control.ImgUp).change(function () {
        ArticlesEditCreate.DeleteImageVisibilityHandler();
    });

    setTimeout(function() {
            ArticlesEditCreate.ModeSelectorHandler();
        },
        1000);
};

ArticlesEditCreate.EditorInit = function () {
    var editorConfig = {
        Selector: '.' + ArticlesEditCreate.Control.ArticleEditor
    };
    NekroController.EditorInit(editorConfig);
};

ArticlesEditCreate.SubmitEdit = function() {
    if (ArticlesEditCreate.HandleSubmitEditErrors()) {
        ArticlesEditCreate.SubmitEditHandler();
        $.ajax({
                url: "/Articles/Edit/",
                type: "POST",
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false, //for file upload
                data: ArticlesEditCreate.FormData
            })
            .done(function (response) {
                window.location.href = response.Url;
            });
    } else {
        $("html, body").animate({ scrollTop: 0 }, "fast");
    }
};

ArticlesEditCreate.SubmitEditHandler = function() {
    // Serialize form data for injection to .NET
    ArticlesEditCreate.Form = $('.' + ArticlesEditCreate.Control.EditFormContainer);
    ArticlesEditCreate.FormData = new FormData(ArticlesEditCreate.Form[0]);

    // Get image from control
    var fileInput = document.getElementById(ArticlesEditCreate.Control.ImgUp);
    if (fileInput != null) {
        var file = fileInput.files[0];
        ArticlesEditCreate.FormData.set('File', file);
    }

    // Get changes in html editors
    ArticlesEditCreate.FormData.set('IndexDescription', tinymce.get('IndexDescription').getContent());
    ArticlesEditCreate.FormData.set('Prelude', tinymce.get('Prelude').getContent());
    ArticlesEditCreate.FormData.set('Body', tinymce.get('Body').getContent());

    // For hidden and disabled fields
    ArticlesEditCreate.FormData.set('Id', $('[name=Id]').val());
    ArticlesEditCreate.FormData.set('IsCreate', $('[name=IsCreate]').is(":checked"));
    ArticlesEditCreate.FormData.set('IsDiary', ArticlesEditCreate.Control.IsDiaryMode);
    ArticlesEditCreate.FormData.set('DateCreated', $('[name=DateCreated]').val());
    ArticlesEditCreate.FormData.set('DateEdited', $('[name=DateEdited]').val());
    ArticlesEditCreate.FormData.set('IsPublished', $('[name=IsPublished]').is(":checked"));
    ArticlesEditCreate.FormData.set('AlbumYear', $('[name=AlbumYear]').val());
    ArticlesEditCreate.FormData.set('ReleaseYear', $('[name=ReleaseYear]').val()); 
};

ArticlesEditCreate.HandleSubmitEditErrors = function () {
    var errorString = '';
    if (ArticlesEditCreate.Control.IsDiaryMode == 'True') {
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
        if ($('.' + ArticlesEditCreate.Control.EditErrorMessage).length > 0) {
            $('.' + ArticlesEditCreate.Control.EditErrorMessage).detach();
        }
        $('.' + ArticlesEditCreate.Control.EditErrorContainer).hide().append(errorString).fadeIn("fast");
        return false;
    } else {
        return true;
    }
};

ArticlesEditCreate.AppendUploadControlAfterDelete = function() {
    var uploadControl = '<div class="editUploadControl">' +
        '<input type="file" id="imgUp" name="upload" />' +
        '<button id="clearUploadControlButton" class="btn nekrobutton-red hidden">' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Usuń obrazek' +
        '</button>' +
        '</div>';
    $('.' + ArticlesEditCreate.Control.EditImage).append(uploadControl);
};

ArticlesEditCreate.DeleteArticleImage = function(control) {
    var articleIdentificator = $('.' + ArticlesEditCreate.Control.EditArtIdInput).val();
    var isDiary = control.val();

    $.ajax({
            url: "/Articles/DeleteImage/",
            type: "POST",
            data: { 'createMode': false, 'articleId': articleIdentificator, 'isDiary': isDiary }
        })
        .done(function (response) {
            $('.' + ArticlesEditCreate.Control.EditImageControl).hide();
            ArticlesEditCreate.AppendUploadControlAfterDelete();
        });
};

ArticlesEditCreate.ClearUpload = function() {
    $('#' + ArticlesEditCreate.Control.ImgUp).val('');
    ArticlesEditCreate.DeleteImageVisibilityHandler();
};

ArticlesEditCreate.DeleteImageVisibilityHandler = function() {
    if ($('#' + ArticlesEditCreate.Control.ImgUp).val() != "") {
        $('#' + ArticlesEditCreate.Control.ClearUploadControlButton).removeClass('notVisible');
    } else {
        $('#' + ArticlesEditCreate.Control.ClearUploadControlButton).addClass('notVisible');
    }
};

ArticlesEditCreate.ModeSelectorHandler = function () {
    if ($('#' + ArticlesEditCreate.Control.IsDiary).prop("checked") || ArticlesEditCreate.Control.IsDiaryMode == "True") {
        ArticlesEditCreate.Control.IsDiaryMode = "True";
        $('.' + ArticlesEditCreate.Control.DiaryCreateComponent).show();
        $('.' + ArticlesEditCreate.Control.ArticleCreateComponent).hide();
    } else {
        ArticlesEditCreate.Control.IsDiaryMode = "False";
        $('.' + ArticlesEditCreate.Control.DiaryCreateComponent).hide();
        $('.' + ArticlesEditCreate.Control.ArticleCreateComponent).show();
    }
};