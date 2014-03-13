function Controller() {
    function getName(name) {
        var names = name.split("_");
        name = names[0] + "_" + Alloy.Globals.RESOLUCION_VIDEO;
        null != names[1] && (name = name + "_" + names[1]);
        return name;
    }
    function getPathVideo(type, path) {
        var url = "";
        var urlEnd = "";
        $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
        $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
        if ("android" == Ti.Platform.osname) {
            $.vp.mediaControlMode = Titanium.Media.VIDEO_CONTROL_DEFAULT;
            url = Alloy.Globals.URL_LIVE;
        } else {
            $.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
            url = Alloy.Globals.URL_LIVE_IOS;
        }
        urlEnd = Alloy.Globals.URL_VIDEO_END;
        var name = getName(path);
        url = "vod" == type ? Alloy.Globals.URL_VOD + name + Alloy.Globals.URL_VOD_END + urlEnd : url + name + Alloy.Globals.URL_VIDEO_END;
        return url;
    }
    function getUrlYoutube(video_id, vp) {
        vdldr = Ti.Network.createHTTPClient();
        vdldr.onload = function() {
            x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
            y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
            vp.url = y;
        };
        if ("android" != Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
        }
        vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
        if ("android" == Ti.Platform.osname) {
            vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
            vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; U; Android 2.2.1; en-gb; GT-I9003 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1");
        }
        vdldr.send();
    }
    function openWindows(arg) {
        var win = Alloy.createController("viewListOfProfile", arg).getView();
        win.fullscreen = false;
        if ("android" == Ti.Platform.osname) win.open({
            activityEnterAnimation: Ti.Android.R.anim.fade_in,
            activityExitAnimation: Ti.Android.R.anim.fade_out
        }); else {
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewProfile = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewProfile"
    });
    $.__views.viewProfile && $.addTopLevelView($.__views.viewProfile);
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
    $.__views.viewProfile.add($.__views.activity);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.viewProfile.add($.__views.container);
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "25dp",
        autoplay: true,
        backgroundColor: "black",
        height: "55%",
        width: "95%",
        zIndex: 10,
        id: "vp"
    });
    $.__views.container.add($.__views.vp);
    $.__views.cover = Ti.UI.createImageView({
        top: "25dp",
        height: "55%",
        width: "95%",
        zIndex: 20,
        id: "cover"
    });
    $.__views.container.add($.__views.cover);
    $.__views.data = Ti.UI.createView({
        top: "61%",
        height: "21%",
        id: "data"
    });
    $.__views.container.add($.__views.data);
    $.__views.author = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "16dp",
                fontWeight: "bold"
            },
            height: "auto",
            left: "5dp",
            top: "5dp",
            color: "#717777"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "author"
        });
        return o;
    }());
    $.__views.data.add($.__views.author);
    $.__views.views = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "14dp"
            },
            height: "auto",
            left: "5dp",
            top: "45dp",
            color: "#717777"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            },
            top: "105dp"
        });
        _.extend(o, {
            id: "views"
        });
        return o;
    }());
    $.__views.data.add($.__views.views);
    $.__views.videos = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "14dp"
            },
            height: "auto",
            left: "5dp",
            top: "65dp",
            color: "#717777"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            },
            top: "135dp"
        });
        _.extend(o, {
            id: "videos"
        });
        return o;
    }());
    $.__views.data.add($.__views.videos);
    $.__views.links = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "83%",
            left: "0dp",
            height: "30dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: "50dp"
        });
        _.extend(o, {
            id: "links"
        });
        return o;
    }());
    $.__views.container.add($.__views.links);
    $.__views.event = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "0",
            left: "0dp",
            width: "32%",
            height: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: "45dp"
        });
        _.extend(o, {
            id: "event"
        });
        return o;
    }());
    $.__views.links.add($.__views.event);
    $.__views.labelLink = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "13dp",
                fontWeight: "bold"
            },
            height: "90%",
            bottom: "8%",
            width: "98%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Upcoming",
            id: "labelLink"
        });
        return o;
    }());
    $.__views.event.add($.__views.labelLink);
    $.__views.video = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "0",
            left: "33%",
            width: "32%",
            height: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: "45dp"
        });
        _.extend(o, {
            id: "video"
        });
        return o;
    }());
    $.__views.links.add($.__views.video);
    $.__views.labelLink = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "13dp",
                fontWeight: "bold"
            },
            height: "90%",
            bottom: "8%",
            width: "98%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Videos",
            id: "labelLink"
        });
        return o;
    }());
    $.__views.video.add($.__views.labelLink);
    $.__views.campaign = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            top: "0",
            left: "66%",
            width: "32%",
            height: "25dp"
        });
        Alloy.isTablet && _.extend(o, {
            height: "45dp"
        });
        _.extend(o, {
            id: "campaign"
        });
        return o;
    }());
    $.__views.links.add($.__views.campaign);
    $.__views.labelLink = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "13dp",
                fontWeight: "bold"
            },
            height: "90%",
            bottom: "8%",
            width: "98%",
            borderRadius: 4,
            backgroundColor: "#745DA8",
            color: "white",
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "25dp"
            }
        });
        _.extend(o, {
            text: "Campaigns",
            id: "labelLink"
        });
        return o;
    }());
    $.__views.campaign.add($.__views.labelLink);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    id = args.video;
    author = args.author;
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.viewProfile, "Artists", false, $.vp, $.container, null, false);
    Ti.Gesture.addEventListener("orientationchange", function() {
        var orientation = Ti.Gesture.orientation;
        if (0 != orientation && null != $.vp) {
            (3 === orientation || 4 === orientation) && ($.vp.fullscreen = true);
            (1 === orientation || 2 === orientation) && ($.vp.fullscreen = false);
        }
    });
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_PROFILE;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var json = this.responseText;
        var responses = JSON.parse(json);
        var url = "";
        if ("vod" == responses.type || "live" == responses.type) {
            url = getPathVideo(responses.type, responses.path);
            $.vp.url = url;
        } else if ("" == responses.type || null == responses.type) {
            var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_USER_DEFAULT;
            if (responses.avatar.length > 0) {
                imageLink = responses.avatar;
                "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
            }
            $.cover.image = imageLink;
        } else url = getUrlYoutube(responses.video_id, $.vp);
        $.author.text = responses.name;
        $.videos.text = responses.num_videos + " videos published.";
        $.views.text = responses.view + " profile views";
        $.activity.hide();
        $.event.addEventListener("click", function() {
            var args = {
                author: author,
                authorname: responses.name,
                view: "Events"
            };
            $.vp.pause();
            openWindows(args);
        });
        $.video.addEventListener("click", function() {
            var args = {
                author: author,
                authorname: responses.name,
                view: "Videos"
            };
            $.vp.pause();
            openWindows(args);
        });
        $.campaign.addEventListener("click", function() {
            var args = {
                author: author,
                authorname: responses.name,
                view: "Campaigns"
            };
            $.vp.pause();
            openWindows(args);
        });
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        item_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString(),
        author: author
    };
    client.send(params);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;