function Controller() {
    function getUrlYoutube(video_id, vp) {
        vdldr = Ti.Network.createHTTPClient();
        vdldr.onload = function() {
            x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
            y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
            vp.url = y;
        };
        vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
        vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
        vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
        vdldr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewVideo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewVideo = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewVideo"
    });
    $.__views.viewVideo && $.addTopLevelView($.__views.viewVideo);
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
    $.__views.viewVideo.add($.__views.activity);
    $.__views.scroll = Ti.UI.createScrollView({
        id: "scroll",
        width: "100%",
        height: "100%",
        scrollType: "vertical"
    });
    $.__views.viewVideo.add($.__views.scroll);
    $.__views.container = Ti.UI.createView({
        top: "0%",
        id: "container"
    });
    $.__views.scroll.add($.__views.container);
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "3%",
        autoplay: true,
        backgroundColor: "black",
        height: "65%",
        width: "94%",
        left: "3%",
        id: "vp"
    });
    $.__views.container.add($.__views.vp);
    $.__views.reportView = Ti.UI.createView({
        top: "68%",
        left: "3%",
        width: "94%",
        height: "7%",
        id: "reportView"
    });
    $.__views.container.add($.__views.reportView);
    $.__views.reportButtom = Ti.UI.createView({
        height: "90%",
        width: "25%",
        borderRadius: 4,
        top: "10%",
        right: "0%",
        backgroundColor: "#e4473e",
        id: "reportButtom"
    });
    $.__views.reportView.add($.__views.reportButtom);
    $.__views.report = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontWeight: "bold"
        },
        color: "white",
        textAlign: "center",
        text: "Report",
        id: "report"
    });
    $.__views.reportButtom.add($.__views.report);
    $.__views.data = Ti.UI.createView({
        top: "73%",
        height: "20%",
        width: "94%",
        left: "3%",
        id: "data"
    });
    $.__views.container.add($.__views.data);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "50%",
        left: "0%",
        top: "2%",
        color: "#717777",
        id: "title"
    });
    $.__views.data.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "13dp"
        },
        height: "46%",
        left: "0%",
        bottom: "2%",
        color: "#717777",
        width: "70%",
        id: "author"
    });
    $.__views.data.add($.__views.author);
    $.__views.views = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontWeight: "bold"
        },
        height: "30%",
        right: "0%",
        bottom: "8%",
        width: "28%",
        borderRadius: 4,
        backgroundColor: "#745DA8",
        color: "white",
        textAlign: "center",
        id: "views"
    });
    $.__views.data.add($.__views.views);
    $.__views.other = Ti.UI.createView({
        top: "93%",
        left: "0%",
        backgroundColor: "#f2f2f2",
        height: "7%",
        id: "other"
    });
    $.__views.container.add($.__views.other);
    $.__views.otherEvents = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "100%",
        left: "3%",
        width: "94%",
        top: "0%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Other videos from this Artist:",
        id: "otherEvents"
    });
    $.__views.other.add($.__views.otherEvents);
    $.__views.viewTable = Ti.UI.createView({
        left: "0%",
        id: "viewTable"
    });
    $.__views.scroll.add($.__views.viewTable);
    $.__views.table = Ti.UI.createTableView({
        top: "0",
        id: "table"
    });
    $.__views.viewTable.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    var pageHome = 0;
    var user_id = 0;
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.viewVideo, "Live Shows", false, $.vp, $.scroll, null, false);
    Ti.Gesture.addEventListener("orientationchange", function() {
        var orientation = Ti.Gesture.orientation;
        if (0 != orientation && null != $.vp) {
            (3 === orientation || 4 === orientation) && ($.vp.fullscreen = true);
            (1 === orientation || 2 === orientation) && ($.vp.fullscreen = false);
        }
    });
    var data = require("dataExport");
    var categoryId = 0;
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_VIDEO;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var height = Ti.Platform.displayCaps.platformHeight - 140;
        $.container.height = height;
        $.viewTable.top = height + 1;
        var json = this.responseText;
        var responses = JSON.parse(json);
        var url = "";
        if ("vod" == responses.type || "live" == responses.type) {
            $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
            $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
            $.vp.mediaControlMode = Titanium.Media.VIDEO_CONTROL_DEFAULT;
            $.vp.url = responses.path;
        } else url = getUrlYoutube(responses.video_id, $.vp);
        $.author.text = responses.name;
        $.title.text = responses.title;
        $.views.text = responses.views;
        data.getListItems($.activity, $.table, 0, 0, categoryId, responses.creator, responses.id, "Videos", true);
        $.activity.hide();
        user_id = responses.creator;
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        item_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    $.table.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            $.viewVideo.close();
            var win = Alloy.createController("viewVideo", e.source.link).getView();
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        } else {
            var index = $.table.getIndexByName("rowMore");
            if (index > 0) {
                pageHome += 1;
                var offset = pageHome * Alloy.Globals.LIMIT;
                data.getListItems($.activity, $.table, offset, pageHome, categoryId, user_id, id, "Videos", true);
                $.viewTable.height = $.viewTable.height + Alloy.Globals.LIMIT * (19 * Ti.Platform.displayCaps.platformHeight / 100);
            }
        }
    });
    setTimeout(function() {
        $.viewTable.height = Alloy.Globals.LIMIT * (19 * Ti.Platform.displayCaps.platformHeight / 100);
        $.table.top = 0;
        $.table.scrollable = false;
        $.scroll.scrollTo(0, 0);
    }, 3e3);
    $.table.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    $.reportButtom.addEventListener("click", function() {
        var win = Alloy.createController("modalReport", id).getView();
        win.open({
            modal: true,
            navBarHidden: true,
            modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
            modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;