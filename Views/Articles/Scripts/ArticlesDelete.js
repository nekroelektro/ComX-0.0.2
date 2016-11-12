jQuery(document).ready(function ($) {
    var id;
    var isDiary;
    $('.btnDeleteDocument').click(function () {
        id = $(this).data('id').toString();
        isDiary = $(this).data('diary').toString();
    });
    $(document).on('click', '.btnDeleteDocument', function (e) {
        $.ajax({
            url: "/Articles/DeleteConfirmed/",
            type: "POST",
            data: { 'id': id, 'isDiary': isDiary },
            timeout: 3000
    });
    });
});