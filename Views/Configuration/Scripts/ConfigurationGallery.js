$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none'
    });

    var idList = [];
    $(document).on('click', '.btnConfirmDeletion', function (e) {
        $('.galleryCheck:checkbox:checked').each(function () {
            var item = $(this).attr("id");
            idList.push(item);
        });

        console.log(idList);
        $.ajax({
            url: "/Configuration/GalleryDeleteImages/",
            type: "POST",
            data: { 'imagesList': idList },
            success: function(data) {
                window.location.href = "/Configuration/Gallery";
            }
        });
    });
});