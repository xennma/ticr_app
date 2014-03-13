function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modalViewVideoLive";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.modal = Ti.UI.createWindow({
        backgroundColor: "#50000000",
        title: Alloy.Globals.NAME_PAGE,
        id: "modal",
        modal: "true"
    });
    $.__views.modal && $.addTopLevelView($.__views.modal);
    $.__views.contentModal = Ti.UI.createView({
        backgroundColor: "transparent",
        height: "40%",
        width: "80%",
        id: "contentModal"
    });
    $.__views.modal.add($.__views.contentModal);
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        borderRadius: 5,
        borderColor: "#78797A",
        borderWidth: 3,
        id: "container"
    });
    $.__views.contentModal.add($.__views.container);
    $.__views.videoName = Ti.UI.createTextField({
        hintText: "Name Your Broadcast",
        top: "10%",
        width: "90%",
        color: "#336699",
        borderColor: "#c1c1c1",
        paddingLeft: 5,
        font: {
            fontSize: "14dp"
        },
        height: "18%",
        id: "videoName"
    });
    $.__views.container.add($.__views.videoName);
    $.__views.description = Ti.UI.createTextArea({
        top: "35%",
        width: "90%",
        height: "35%",
        color: "#c1c1c1",
        borderColor: "#c1c1c1",
        paddingLeft: 5,
        borderStyle: "Ti.UI.INPUT_BORDERSTYLE_ROUNDED",
        font: {
            fontSize: "14dp"
        },
        id: "description",
        textAlign: "left",
        value: "Description"
    });
    $.__views.container.add($.__views.description);
    $.__views.bottomModal = Ti.UI.createView({
        bottom: "5%",
        left: "5%",
        width: "40%",
        height: "20%",
        id: "bottomModal"
    });
    $.__views.container.add($.__views.bottomModal);
    $.__views.textBottom = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        height: "90%",
        bottom: "8%",
        width: "98%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        text: "Go Live!",
        id: "textBottom"
    });
    $.__views.bottomModal.add($.__views.textBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.bottomModal.addEventListener("click", function() {
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        var band = 0;
        "" != $.description.value ? filter.test($.description.value) ? band += 1 : alert("Please enter a valid video description") : alert("Video description is required");
        "" != $.videoName.value ? filter.test($.videoName.value) ? band += 1 : alert("Please enter a valid video name") : alert("Video name is required");
        if (2 == band) {
            var args = {
                event_id: 0,
                live_video: 1,
                title: $.videoName.value,
                description: $.description.value
            };
            var win = Alloy.createController("camera", args).getView();
            win.orientationModes = [ Titanium.UI.LANDSCAPE_RIGHT ];
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
            $.modal.close();
        }
    });
    $.description._hintText = $.description.value;
    $.description.addEventListener("focus", function(e) {
        if (e.source.value == e.source._hintText) {
            e.source.value = "";
            e.source.color = "#336699";
        }
    });
    $.description.addEventListener("blur", function(e) {
        if ("" == e.source.value) {
            e.source.color = "#c1c1c1";
            e.source.value = e.source._hintText;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;