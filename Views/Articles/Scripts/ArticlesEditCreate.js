$(document).ready(function () {
    window.tinymce.init({
        selector: '.articleEditor',
        plugins: 'advlist autolink link image lists charmap print preview'
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