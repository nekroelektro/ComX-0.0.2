function NekroHelper() {}

NekroHelper.ShowStatusMessagePopup = function(container, isSuccess) {
    var successString =
        isSuccess == true
            ? '<h2 style="color:#2B823C; text-align: center">Operacja zakończona sukcesem!<h2>'
            : '<h2 style="color:red; text-align: center">Operacja się nie powiodła, zawiadom admina!<h2>';
    if (container.find("statusMessagePopup").length < 1) {
        var messageBody = '<div id="statusMessagePopup" className="white-popup">' +
            successString +
            "<hr />" +
            "</div>";
        container.append(messageBody);
    }

    var config = {
        Title: "STATUS OPERACJI",
        ContainerElement: $("#statusMessagePopup"),
        Modal: true,
        AutoOpen: false
    };
    NekroController.NekroPop(config);

    $("#statusMessagePopup").dialog("open");
    setTimeout(function() {
            $("#statusMessagePopup").dialog("close");
            $("#statusMessagePopup").detach();
        },
        2000);
};

NekroHelper.CloseCurrentPopup = function() {
    $(".shutNekroPop").click();
};

NekroHelper.ClearAllInputs = function(container) {
    var inputs = container.find("input");
    $.each(inputs,
        function() {
            $(this).val("");
        });
};