jQuery(document).ready(function ($) {
    var config = {
        ElementClicked: $(".threadElementNode"),
        ElementForToggle: '.messageElementContainer, .threadElementButtons',
        IsSticky: true,
        ElementToStick: $('.threadElementContainer')
    }
    NekroSlidingBars(config);

    var mesSuccPopConfig = {
        Title: "STATUS PRYWATNEJ WIADOMOŚCI",
        ClickedElement: $(".messageSuccessModalAnchor"),
        ContainerElement: $('#messageSuccessModal2'),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(mesSuccPopConfig);

    //Message sending handling
    var userTo;
    var isNewThread;
    var threadId;
    $('.btnSendMessageInThread, .btnSendMessageNewThread').click(function () {
        $('.sendMessageContainer').removeClass('hidden');
        $('.sendMessageContainer').hide().slideDown('slow');
        $("html, body").animate({ scrollTop: $('#mainMessagesContainer').offset().top - 60 }, 'slow');
    });

    $('.threadElementButtons button').click(function(e) {
        e.stopPropagation();
        userTo = $(this).data('userto');
        isNewThread = $(this).data('isnew');
        threadId = $(this).data('threadid');
        $('[name=editPrivateMessageTitle]').val("Re: " + $(this).data('title'));

        var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
        if (editorInstanceEdit) {
            try {
                editorInstanceEdit.destroy(true);
            } catch (e) {
            }
        }
        CKEDITOR.replace('editPrivateMessageContainer');
        $('#editPrivateMessageTitle').focus();
    });

    var redirectContent;
    $('.btnConfirmSendMessage').click(function () {
        var title = $('[name=editPrivateMessageTitle]').val();
        var body = CKEDITOR.instances['editPrivateMessageContainer'].getData();
        if (body != "" && title != "") {
            $.ajax({
                url: "/Account/SendMessage/",
                type: "POST",
                data: {
                    'receiver': userTo,
                    'title': title,
                    'body': body,
                    'isNewThread': isNewThread,
                    'threadId': threadId,
                    'userName': '',
                    'isMessageView': true
                }
            })
                .done(function (response) {
                    var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
                    if (editorInstanceEdit) {
                        try {
                            // Chrome plugin error fix
                            editorInstanceEdit.focusManager.blur(true);
                            editorInstanceEdit.destroy(true);
                        } catch (e) { }
                    }
                    redirectContent = response;
                    handleSendMessageSuccess();
                });
        } else {
            if ($('.editErrorMessage').length > 0) {
                $('.editErrorMessage').detach();
            }
            $('.popupSendMessageGet').append("<div class='editErrorContainer'>" +
                "<div class='editErrorMessage'>Musisz uzupełnić tytuł i treść wiadomości!</div> </div>").fadeIn("fast");
        }
    });

    function handleSendMessageSuccess() {
        $('.sendMessageContainer').addClass('hidden');
        $('.messageSuccessModalAnchor').click();
    }

    $(document).on('click', '.btnCancelSendMessage', function (e) {
        e.preventDefault();
        var editorInstanceEdit = CKEDITOR.instances['editPrivateMessageContainer'];
        if (editorInstanceEdit) {
            try {
                // Chrome plugin error fix
                editorInstanceEdit.focusManager.blur(true);
                editorInstanceEdit.destroy(true);
            } catch (e) { }
        }
        $('.sendMessageContainer').slideUp('slow', function () {
            $('.sendMessageContainer').addClass('hidden');  
        });
    });

    $('.btnMessageSendConfirmation').click(function () {
        //refresh messages view only
        $("#mainMessagesContainer").empty();
        $("#mainMessagesContainer").html(redirectContent);
    });

    $(".threadElementNode").click(function () {
        $(this).find('.threadElementNotificator').hide('slow');
        var thread = $(this).data('id');
        $.ajax({
            url: "/Account/MarkThreadMessagesAsReceived/",
            type: "POST",
            data: {
                'threadId': thread
            }
        })
        .done(function (response) {
            // this needs to change, create methodd where there will be returned number of not rceived messsages and inject it into notificator
            $(".topLogoPanel").empty();
            $(".topLogoPanel").html(response);
        });
    });
});