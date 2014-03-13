function Controller() {
    function isIOS7Plus() {
        return false;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "black",
        title: Alloy.Globals.NAME_PAGE,
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.Navigation = Ti.UI.createView({
        id: "Navigation"
    });
    $.__views.index.add($.__views.Navigation);
    $.__views.logo = Ti.UI.createImageView({
        id: "logo",
        image: "/images/logo-liveon.png"
    });
    $.__views.Navigation.add($.__views.logo);
    $.__views.__alloyId1 = Ti.UI.createView({
        id: "__alloyId1"
    });
    $.__views.Navigation.add($.__views.__alloyId1);
    $.__views.banner = Ti.UI.createView({
        id: "banner"
    });
    $.__views.index.add($.__views.banner);
    $.__views.overlay = Ti.UI.createView({
        id: "overlay"
    });
    $.__views.banner.add($.__views.overlay);
    $.__views.gradient = Ti.UI.createView({
        id: "gradient"
    });
    $.__views.overlay.add($.__views.gradient);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        text: "Promoting your music with live video",
        id: "__alloyId2"
    });
    $.__views.banner.add($.__views.__alloyId2);
    $.__views.buttoncontainer = Ti.UI.createView({
        id: "buttoncontainer"
    });
    $.__views.index.add($.__views.buttoncontainer);
    $.__views.__alloyId3 = Ti.UI.createView({
        id: "__alloyId3"
    });
    $.__views.buttoncontainer.add($.__views.__alloyId3);
    $.__views.topButtons = Ti.UI.createView({
        id: "topButtons"
    });
    $.__views.buttoncontainer.add($.__views.topButtons);
    $.__views.liveShows = Ti.UI.createView({
        id: "liveShows"
    });
    $.__views.topButtons.add($.__views.liveShows);
    $.__views.__alloyId4 = Ti.UI.createView({
        id: "__alloyId4"
    });
    $.__views.liveShows.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createImageView({
        image: "/images/artists.png",
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        text: "Browse",
        id: "__alloyId6"
    });
    $.__views.__alloyId4.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        text: "Find live shows, campaigns, artists and more",
        id: "__alloyId7"
    });
    $.__views.liveShows.add($.__views.__alloyId7);
    $.__views.bottomButtons = Ti.UI.createView({
        id: "bottomButtons"
    });
    $.__views.buttoncontainer.add($.__views.bottomButtons);
    $.__views.upcomingEvents = Ti.UI.createView({
        id: "upcomingEvents"
    });
    $.__views.bottomButtons.add($.__views.upcomingEvents);
    $.__views.__alloyId8 = Ti.UI.createView({
        id: "__alloyId8"
    });
    $.__views.upcomingEvents.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createImageView({
        image: "/images/bolt.png",
        id: "__alloyId9"
    });
    $.__views.__alloyId8.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createLabel({
        text: "Go Live!",
        id: "__alloyId10"
    });
    $.__views.__alloyId8.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createLabel({
        text: "Already have a live show scheduled? Broadcast using this device!",
        id: "__alloyId11"
    });
    $.__views.upcomingEvents.add($.__views.__alloyId11);
    exports.destroy = function() {};
    _.extend($, $.__views);
    (Ti.Platform.displayCaps.platformWidth - 30) / 2;
    (Ti.Platform.displayCaps.platformWidth - 30) / 4;
    Ti.App.Properties.setString("user_id", null);
    Ti.App.Properties.setString("username", null);
    Ti.App.Properties.setString("timezone", null);
    Ti.App.Properties.setString("name", null);
    $.index.exitOnClose = true;
    $.index.addEventListener("open", function() {
        var matrix = Ti.UI.create2DMatrix();
        matrix = matrix.scale(1.1, 1);
        var a = Ti.UI.createAnimation({
            transform: matrix,
            duration: 350,
            autoreverse: true,
            repeat: 0,
            delay: 450,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
        });
        var b = Ti.UI.createAnimation({
            transform: matrix,
            duration: 350,
            autoreverse: true,
            repeat: 0,
            delay: 450,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN
        });
        $.topButtons.animate(a);
        $.bottomButtons.animate(b);
        $.banner.animate({
            left: "0%",
            top: "8%",
            duration: 300,
            delay: 100,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
        var top = "62%";
        var top1 = "0%";
        $.Navigation.animate({
            left: 0,
            top: top1,
            duration: 250,
            delay: 750,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
        $.buttoncontainer.animate({
            left: 0,
            top: top,
            duration: 500,
            curve: Titanium.UI.ANIMATION_CURVE_EASE_IN,
            opacity: 1
        });
    });
    var iOS7 = isIOS7Plus();
    var theTop = iOS7 ? 20 : 0;
    $.index.top = theTop;
    var actionBar;
    $.index.addEventListener("open", function() {
        if ($.index.activity) {
            actionBar = $.index.activity.actionBar;
            actionBar && actionBar.hide();
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    $.liveShows.addEventListener("click", function() {
        var win = Alloy.createController("feed", 1).getView();
        win.open();
    });
    $.upcomingEvents.addEventListener("click", function() {
        if (Ti.App.Properties.getString("user_id") > 0) {
            var dialog = Ti.UI.createAlertDialog({
                buttonNames: [ "Go to My Events", "Go Live Now" ],
                message: "What do you want to do?",
                title: "Go Live!"
            });
            dialog.show();
            dialog.addEventListener("click", function(e) {
                if (1 == e.index) {
                    var win = Alloy.createController("modalViewVideoLive").getView();
                    win.open({
                        modal: true,
                        navBarHidden: true,
                        modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
                        modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN
                    });
                } else if (0 == e.index) {
                    var args = {
                        author: Ti.App.Properties.getString("user_id"),
                        authorname: Ti.App.Properties.getString("name"),
                        view: "Events"
                    };
                    var win = Alloy.createController("viewListEventsToLive", args).getView();
                    win.fullscreen = false;
                    var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
                    win.open({
                        transition: t
                    });
                }
            });
        } else {
            var win = Alloy.createController("login").getView();
            win.fullscreen = false;
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
        }
    });
    $.overlay.setBackgroundGradient({
        type: "linear",
        startPoint: {
            x: "50%",
            y: "0%"
        },
        endPoint: {
            x: "50%",
            y: "100%"
        },
        colors: [ {
            color: "#282139",
            offset: .25
        }, {
            color: "#534377",
            offset: .45
        }, {
            color: "#745DA8",
            offset: .6
        } ]
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;