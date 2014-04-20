function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modalReport";
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
    $.__views.activity = Ti.UI.createActivityIndicator({
        color: "#6cb1d5",
        font: {
            fontFamily: "Helvetica Neue",
            fontSize: "20dp",
            fontWeight: "bold"
        },
        message: "Loading...",
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE,
        zIndex: 100,
        id: "activity"
    });
    $.__views.modal.add($.__views.activity);
    $.__views.contentModal = Ti.UI.createView({
        backgroundColor: "transparent",
        height: "60%",
        width: "90%",
        id: "contentModal"
    });
    $.__views.modal.add($.__views.contentModal);
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        borderRadius: 5,
        borderColor: "#78797A",
        borderWidth: 1,
        id: "container"
    });
    $.__views.contentModal.add($.__views.container);
    $.__views.reportTitle = Ti.UI.createView({
        top: "0%",
        width: "100%",
        height: "18%",
        id: "reportTitle"
    });
    $.__views.container.add($.__views.reportTitle);
    $.__views.title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            color: "#299ac6",
            font: {
                fontSize: "18dp"
            },
            left: "5%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "Report this",
            id: "title"
        });
        return o;
    }());
    $.__views.reportTitle.add($.__views.title);
    $.__views.border = Ti.UI.createView({
        bottom: "0%",
        borderColor: "#299ac6",
        borderWidth: 1,
        id: "border"
    });
    $.__views.reportTitle.add($.__views.border);
    $.__views.pickReport = Ti.UI.createPicker({
        top: "25%",
        width: "90%",
        id: "pickReport"
    });
    $.__views.container.add($.__views.pickReport);
    var __alloyId66 = [];
    $.__views.__alloyId67 = Ti.UI.createPickerRow({
        value: "0",
        title: "Select a predefined report",
        id: "__alloyId67"
    });
    __alloyId66.push($.__views.__alloyId67);
    $.__views.__alloyId68 = Ti.UI.createPickerRow({
        value: "Spamming / Advertisement Profanity / Inappropriate content. Abusive.",
        title: "Spamming / Advertisement Profanity / Inappropriate content. Abusive.",
        id: "__alloyId68"
    });
    __alloyId66.push($.__views.__alloyId68);
    $.__views.pickReport.add(__alloyId66);
    $.__views.description = Ti.UI.createTextArea({
        top: "45%",
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
    $.__views.reportFoot = Ti.UI.createView({
        bottom: "0%",
        width: "100%",
        height: "15%",
        borderColor: "#c1c1c1",
        borderWidth: 1,
        id: "reportFoot"
    });
    $.__views.container.add($.__views.reportFoot);
    $.__views.bottomModal = Ti.UI.createView({
        bottom: "5%",
        left: "20%",
        width: "29%",
        height: "100%",
        id: "bottomModal"
    });
    $.__views.reportFoot.add($.__views.bottomModal);
    $.__views.textBottom = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp",
                fontWeight: "bold"
            },
            height: "75%",
            bottom: "8%",
            width: "80%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "Send",
            id: "textBottom"
        });
        return o;
    }());
    $.__views.bottomModal.add($.__views.textBottom);
    $.__views.bottomModalCancel = Ti.UI.createView({
        bottom: "5%",
        right: "20%",
        width: "29%",
        height: "100%",
        id: "bottomModalCancel"
    });
    $.__views.reportFoot.add($.__views.bottomModalCancel);
    $.__views.textBottom = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp",
                fontWeight: "bold"
            },
            height: "75%",
            bottom: "8%",
            width: "80%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "Cancel",
            id: "textBottom"
        });
        return o;
    }());
    $.__views.bottomModalCancel.add($.__views.textBottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var video_id = arguments[0] || {};
    $.bottomModal.addEventListener("click", function() {
        var filter = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\_\-\.\@\/]+$/;
        var band = 0;
        "" != $.description.value ? filter.test($.description.value) ? band += 1 : alert("Please enter a valid video description") : alert("Video description is required");
        "0" == $.pickReport.getSelectedRow(0).value ? alert("Please select the type of report") : band += 1;
        if (2 == band) {
            var client1 = Ti.Network.createHTTPClient();
            var url1 = Alloy.Globals.DOMAIN + Alloy.Globals.URL_REPORT_VIDEO;
            client1.open("POST", url1);
            client1.ondatastream = function() {
                $.activity.show();
            };
            client1.onload = function() {
                var json = this.responseText;
                JSON.parse(json);
                alert("Thank you for submitting a report. An administrator will review this report shortly.");
            };
            var user_id = 0;
            Ti.App.Properties.getString("user_id") && (user_id = Ti.App.Properties.getString("user_id").toString());
            client1.onerror = function(e) {
                alert("Transmission error: " + e.error);
            };
            var params = {
                user_id: user_id,
                tc: Alloy.Globals.USER_MOBILE.toString(),
                video_id: video_id,
                message: $.description.value
            };
            client1.send(params);
            $.modal.close();
        }
    });
    $.bottomModalCancel.addEventListener("click", function() {
        $.modal.close();
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
    $.pickReport.addEventListener("change", function(e) {
        $.description.value = "0" != e.source.getSelectedRow(0).value ? e.source.getSelectedRow(0).value : "";
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;