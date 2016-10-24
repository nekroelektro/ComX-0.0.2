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
});