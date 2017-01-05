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

    if ($('#IsDiaryEdit').attr('checked')) {
        console.log("a");
        $('.diaryCreateComponent').show();
        $('.articleCreateComponent').hide();
    } else {
        console.log("ab");
        $('.diaryCreateComponent').hide();
        $('.articleCreateComponent').show();
    }
});