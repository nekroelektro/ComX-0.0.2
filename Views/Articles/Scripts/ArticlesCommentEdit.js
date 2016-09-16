jQuery(document).ready(function ($) {
    var preludeValue = $('#Body').attr('value');
    var decodedPrelude = $('<textarea/>').html(preludeValue).text();
    $('.comEditorTextArea').trumbowyg();
    $('.comEditorTextArea').trumbowyg('html', decodedPrelude);
});