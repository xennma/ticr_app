function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tileCampaigns";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        left: "3%",
        width: "94%",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.tile = Ti.UI.createView({
        width: "100%",
        left: 0,
        top: "2%",
        height: "96%",
        backgroundColor: "white",
        borderRadius: 4,
        borderWidth: .5,
        borderColor: "#c3c3c3",
        id: "tile"
    });
    $.__views.container.add($.__views.tile);
    $.__views.videocover = Ti.UI.createView({
        width: "100%",
        height: "67%",
        top: 0,
        borderRadius: 4,
        left: 0,
        zIndex: 1,
        id: "videocover"
    });
    $.__views.tile.add($.__views.videocover);
    $.__views.cover = Ti.UI.createImageView({
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        id: "cover"
    });
    $.__views.videocover.add($.__views.cover);
    $.__views.videoinfo = Ti.UI.createView({
        width: "100%",
        height: "34%",
        top: "66%",
        left: 0,
        backgroundColor: "white",
        zIndex: 10,
        id: "videoinfo"
    });
    $.__views.tile.add($.__views.videoinfo);
    $.__views.header = Ti.UI.createView({
        top: "2%",
        height: "30%",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        id: "header"
    });
    $.__views.videoinfo.add($.__views.header);
    $.__views.title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "3%",
            font: {
                fontSize: "16dp"
            }
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "title"
        });
        return o;
    }());
    $.__views.header.add($.__views.title);
    $.__views.data = Ti.UI.createView({
        top: "32%",
        width: "94%",
        left: "3%",
        height: "27%",
        id: "data"
    });
    $.__views.videoinfo.add($.__views.data);
    $.__views.about = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "11dp"
            },
            color: "gray",
            width: "100%",
            top: "2%",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "23dp"
            }
        });
        _.extend(o, {
            id: "about"
        });
        return o;
    }());
    $.__views.data.add($.__views.about);
    $.__views.progressBar = Ti.UI.createView({
        width: "90%",
        left: "5%",
        top: "59%",
        height: "8%",
        id: "progressBar"
    });
    $.__views.videoinfo.add($.__views.progressBar);
    $.__views.campaignBar = Ti.UI.createView({
        top: "0%",
        height: "100%",
        width: "100%",
        left: "0%",
        backgroundColor: "#f2f2f2",
        borderWidth: 1,
        borderColor: "#c3c3c3",
        borderRadius: 4,
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "campaignBar"
    });
    $.__views.progressBar.add($.__views.campaignBar);
    $.__views.porcentaje = Ti.UI.createView({
        top: "0%",
        height: "100%",
        left: "0%",
        backgroundColor: "#745DA8",
        zIndex: 10,
        borderRadius: 4,
        backgroundImage: "/bar-stripes.png",
        backgroundRepeat: true,
        width: "90%",
        id: "porcentaje"
    });
    $.__views.progressBar.add($.__views.porcentaje);
    $.__views.progressInfo = Ti.UI.createView({
        top: "64%",
        height: "33%",
        width: "90%",
        font: {
            fontSize: "11dp"
        },
        id: "progressInfo"
    });
    $.__views.videoinfo.add($.__views.progressInfo);
    $.__views.accomplished = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "10%",
            height: "100%",
            width: "30%",
            color: "gray",
            font: {
                fontSize: "11dp"
            },
            textAlign: "left",
            left: "3%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "23dp"
            }
        });
        _.extend(o, {
            id: "accomplished"
        });
        return o;
    }());
    $.__views.progressInfo.add($.__views.accomplished);
    $.__views.percentage = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "10%",
            height: "100%",
            width: "33%",
            color: "gray",
            font: {
                fontSize: "11dp"
            },
            textAlign: "center",
            left: "33%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "23dp"
            }
        });
        _.extend(o, {
            id: "percentage"
        });
        return o;
    }());
    $.__views.progressInfo.add($.__views.percentage);
    $.__views.days = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: "10%",
            height: "100%",
            width: "32%",
            color: "gray",
            font: {
                fontSize: "11dp"
            },
            textAlign: "right",
            left: "66%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "23dp"
            }
        });
        _.extend(o, {
            id: "days"
        });
        return o;
    }());
    $.__views.progressInfo.add($.__views.days);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.link = args.link;
    var name1 = args.name || "";
    name1.length > Alloy.Globals.TITLE_LIST && (name1 = name1.substring(0, Alloy.Globals.TITLE_LIST - 2) + "...");
    $.title.text = name1;
    Ti.Platform.displayCaps.platformHeight;
    Ti.Platform.displayCaps.platformWidth;
    var height = 360;
    var osname = Ti.Platform.osname;
    "ipad" === osname && (height = 800);
    $.container.height = height + "dp";
    $.container.top = height * args.row + "dp";
    var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_EVENT_DEFAULT;
    if (null != args.image) {
        imageLink = args.image;
        "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
    }
    $.cover.image = imageLink;
    $.cover.touchEnabled = false;
    $.porcentaje.width = args.percent + "%";
    var textInfo = args.shortdesc;
    textInfo.length > Alloy.Globals.ABOUT && (textInfo = textInfo.substring(0, Alloy.Globals.ABOUT - 2) + "...");
    $.about.text = textInfo;
    $.accomplished.text = "$" + args.received + " Pledged";
    $.days.text = args.days + " Days to go";
    $.percentage.text = args.percent + " % Funded";
    var shadowTop = "0%";
    "android" == Ti.Platform && (shadowTop = "7dp");
    var theImageShadow = Ti.UI.createImageView({
        image: "/videoCover.png",
        top: shadowTop,
        left: 0,
        touchEnabled: false,
        width: "100%",
        height: "100%",
        zIndex: 5
    });
    $.videocover.add(theImageShadow);
    $.videocover.addEventListener("click", function() {
        var win = Alloy.createController("viewCampaign", args.link).getView();
        if ("android" == Ti.Platform.osname) {
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        } else {
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;