﻿function AccountMessages(config) {
    AccountMessages.Control = config;
    AccountMessages.Init();

    AccountMessages.UserTo = '';
    AccountMessages.IsNewThread = false;
    AccountMessages.ThreadId = '';
    AccountMessages.ResponseContent = '';
};
// POPRAWI KLIKNIECIE NA POST BO TERAZ ZWIJA LISTĘ WIADOMOŚCI
AccountMessages.Init = function () {
    $('.' + AccountMessages.Control.BtnSendMessageInThread, '.' + AccountMessages.Control.BtnSendMessageNewThread).click(function () {
        AccountMessages.SendMessageInterfaceHandler();
        AccountMessages.ThreadElementClickHandler(e, $(this)); // BE FOREWARNED!!!
    });

    //Commented because all this is triggered by same buttons as previous click event - this function moved to previous
    //$('.threadElementButtons button').click(function (e) {
    //    AccountMessages.ThreadElementClickHandler(e, $(this));
    //});

    $('.' + AccountMessages.Control.BtnConfirmSendMessage).click(function () {
        AccountMessages.SendMessage();
    });

    $('.' + AccountMessages.Control.BtnCancelSendMessage).click(function (e) {
        AccountMessages.HandleSendMessageSuccess(e);
    });

    $('.' + AccountMessages.Control.BtnMessageSendConfirmation).click(function () {
        AccountMessages.HandleSendMessageSuccess();
    });

    $('.' + AccountMessages.Control.ThreadElementNode).click(function () {
        AccountMessages.ReadThread($(this));
    });

    var config = {
        ElementClicked: $('.' + AccountMessages.Control.ThreadElementNode),
        ElementForToggle: "." + AccountMessages.Control.MessageElementContainer + ", ." + AccountMessages.Control.ThreadElementButtons,
        IsSticky: true,
        ElementToStick: $('.' + AccountMessages.Control.ThreadElementContainer)
    }
    NekroController.NekroSlidingBars(config);

    var mesSuccPopConfig = {
        Title: "STATUS PRYWATNEJ WIADOMOŚCI",
        ClickedElement: $('.' + AccountMessages.Control.MessageSuccessModalAnchor),
        ContainerElement: $('#' + AccountMessages.Control.MessageSuccessModal2),
        Modal: true,
        AutoOpen: false,
        Width: 500
    };
    NekroController.NekroPop(mesSuccPopConfig);
};

AccountMessages.SendMessageInterfaceHandler = function() {
    $('.' + AccountMessages.Control.SendMessageContainer).removeClass('hidden');
    $('.' + AccountMessages.Control.SendMessageContainer).hide().slideDown('slow');
    $("html, body").animate({ scrollTop: $('#' + AccountMessages.Control.MainMessagesContainer).offset().top - 60 }, 'slow'); 
};

AccountMessages.ThreadElementClickHandler = function(e, item) {
    e.stopPropagation();
    AccountMessages.UserTo = item.data('userto');
    AccountMessages.IsNewThread = item.data('isnew');
    AccountMessages.ThreadId = item.data('threadid');
    $('#' + AccountMessages.Control.EditPrivateMessageTitle).val("Re: " + item.data('title'));

    var editorInstanceEdit = CKEDITOR.instances[AccountMessages.Control.EditPrivateMessageContainer];
    if (editorInstanceEdit) {
        try {
            editorInstanceEdit.destroy(true);
        } catch (e) {
        }
    }
    CKEDITOR.replace(AccountMessages.Control.EditPrivateMessageContainer);
    $('#' + AccountMessages.Control.EditPrivateMessageTitle).focus();
};

AccountMessages.SendMessage = function() {
    var title = $('#' + AccountMessages.Control.EditPrivateMessageTitle).val();
    var body = CKEDITOR.instances[AccountMessages.Control.EditPrivateMessageContainer].getData();
    if (body != "" && title != "") {
        var sendMessageAjaxConfig = {
            Url: "/Account/SendMessage",
            Method: "POST",
            Params: {
                'receiver': AccountMessages.UserTo,
                'title': title,
                'body': body,
                'isNewThread': AccountMessages.IsNewThread,
                'threadId': AccountMessages.ThreadId,
                'userName': '',
                'isMessageView': true
            },
            SuccessHandler: AccountMessages.SendMessageResponse
        };
        NekroController.NekroAjaxAction(sendMessageAjaxConfig);
    } else {
        AccountMessages.SendMessageErrorHandler();
    }
};

AccountMessages.SendMessageErrorHandler = function() {
    if ($('.' + AccountMessages.Control.EditErrorMessage).length > 0) {
        $('.' + AccountMessages.Control.EditErrorMessage).detach();
    }
    $('.' + AccountMessages.Control.PopupSendMessageGet).append("<div class='editErrorContainer'>" +
        "<div class='editErrorMessage'>Musisz uzupełnić tytuł i treść wiadomości!</div> </div>").fadeIn("fast");
};

AccountMessages.SendMessageResponse = function(response) {
    var editorInstanceEdit = CKEDITOR.instances[AccountMessages.Control.EditPrivateMessageContainer];
    if (editorInstanceEdit) {
        try {
            // Chrome plugin error fix
            editorInstanceEdit.focusManager.blur(true);
            editorInstanceEdit.destroy(true);
        } catch (e) { }
    }
    AccountMessages.ResponseContent = response;
    AccountMessages.HandleSendMessageSuccess();
};

AccountMessages.HandleSendMessageSuccess = function() {
    $('.' + AccountMessages.Control.SendMessageContainer).addClass('hidden');
    $('.' + AccountMessages.Control.MessageSuccessModalAnchor).click();
};

AccountMessages.HandleSendMessageSuccess = function(e) {
    e.preventDefault();
    var editorInstanceEdit = CKEDITOR.instances[AccountMessages.Control.EditPrivateMessageContainer];
    if (editorInstanceEdit) {
        try {
            // Chrome plugin error fix
            editorInstanceEdit.focusManager.blur(true);
            editorInstanceEdit.destroy(true);
        } catch (e) { }
    }
    $('.' + AccountMessages.Control.SendMessageContainer).slideUp('slow', function () {
        $('.' + AccountMessages.Control.SendMessageContainer).addClass('hidden');
    });
};

AccountMessages.HandleSendMessageSuccess = function() {
    //refresh messages view only
    $('#' + AccountMessages.Control.MainMessagesContainer).empty();
    $('#' + AccountMessages.Control.MainMessagesContainer).html(AccountMessages.ResponseContent);
};

AccountMessages.ReadThread = function(item) {
    item.find('.' + AccountMessages.Control.ThreadElementNotificator).hide('slow');
    var thread = item.data('id');
    var sendMessageAjaxConfig = {
        Url: "/Account/MarkThreadMessagesAsReceived/",
        Method: "POST",
        Params: { 'threadId': thread },
        SuccessHandler: AccountMessages.ReadThreadHandler
    };
    NekroController.NekroAjaxAction(sendMessageAjaxConfig);
};

AccountMessages.ReadThreadHandler = function(response) {
    $('.' + AccountMessages.Control.TopLogoPanel).empty();
    $('.' + AccountMessages.Control.TopLogoPanel).html(response);
};