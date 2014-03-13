function Controller() {
    function getUrlYoutube(video_id, vp) {
        vdldr = Ti.Network.createHTTPClient();
        vdldr.onload = function() {
            x = decodeURIComponent(decodeURIComponent(decodeURIComponent(decodeURIComponent(this.responseText.substring(4, this.responseText.length)))));
            y = JSON.parse(x).content.video["fmt_stream_map"][0].url;
            vp.url = y;
        };
        vdldr.setRequestHeader("Referer", "http://www.youtube.com/watch?v=" + video_id);
        vdldr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14");
        vdldr.open("GET", "http://m.youtube.com/watch?ajax=1&feature=related&layout=mobile&tsp=1&&v=" + video_id);
        vdldr.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewCampaign";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewCampaign = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewCampaign"
    });
    $.__views.viewCampaign && $.addTopLevelView($.__views.viewCampaign);
    $.__views.scroll = Ti.UI.createScrollView({
        top: "0",
        id: "scroll",
        width: "100%",
        scrollType: "vertical"
    });
    $.__views.viewCampaign.add($.__views.scroll);
    $.__views.viewScroll = Ti.UI.createView({
        height: Ti.Platform.displayCaps.platformHeight + 60,
        id: "viewScroll",
        top: "0"
    });
    $.__views.scroll.add($.__views.viewScroll);
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
    $.__views.viewScroll.add($.__views.activity);
    $.__views.fixed = Ti.UI.createView({
        top: "0%",
        id: "fixed"
    });
    $.__views.viewScroll.add($.__views.fixed);
    $.__views.vp = Ti.Media.createVideoPlayer({
        top: "2%",
        autoplay: true,
        backgroundColor: "black",
        height: "50%",
        width: "95%",
        zIndex: 10,
        id: "vp"
    });
    $.__views.fixed.add($.__views.vp);
    $.__views.cover = Ti.UI.createImageView({
        height: "50%",
        width: "95%",
        zIndex: 20,
        top: "2%",
        id: "cover"
    });
    $.__views.fixed.add($.__views.cover);
    $.__views.data = Ti.UI.createView({
        top: "52%",
        height: "48%",
        id: "data"
    });
    $.__views.fixed.add($.__views.data);
    $.__views.meta = Ti.UI.createView({
        top: "0%",
        left: "3%",
        width: "94%",
        height: "26%",
        id: "meta"
    });
    $.__views.data.add($.__views.meta);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        height: "auto",
        top: "0%",
        color: "#717777",
        left: "0%",
        id: "title"
    });
    $.__views.meta.add($.__views.title);
    $.__views.author = Ti.UI.createLabel({
        font: {
            fontSize: "13dp"
        },
        height: "auto",
        bottom: "3%",
        color: "#717777",
        width: "65%",
        left: "0%",
        id: "author"
    });
    $.__views.meta.add($.__views.author);
    $.__views.categoryName = Ti.UI.createLabel({
        font: {
            fontSize: "13dp",
            fontWeight: "bold"
        },
        height: "40%",
        width: "30%",
        borderRadius: 4,
        right: "0%",
        bottom: "3%",
        backgroundColor: "#e4473e",
        color: "white",
        textAlign: "center",
        id: "categoryName"
    });
    $.__views.meta.add($.__views.categoryName);
    $.__views.content = Ti.UI.createView({
        top: "28%",
        height: "44%",
        backgroundColor: "#f0f0f0",
        id: "content"
    });
    $.__views.data.add($.__views.content);
    $.__views.titleDescription = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        left: "3%",
        top: "3%",
        height: "20%",
        width: "94%",
        text: "Description:",
        id: "titleDescription"
    });
    $.__views.content.add($.__views.titleDescription);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        height: "60%",
        width: "94%",
        top: "20%",
        left: "3%",
        textAlign: "justify",
        id: "description"
    });
    $.__views.content.add($.__views.description);
    $.__views.readmore = Ti.UI.createLabel({
        font: {
            fontSize: "12dp",
            fontWeight: "bold"
        },
        left: "3%",
        width: "94%",
        bottom: "0%",
        textAlign: "right",
        color: "#745DA8",
        text: "Read more",
        id: "readmore"
    });
    $.__views.content.add($.__views.readmore);
    $.__views.campaignInfo = Ti.UI.createView({
        top: "72%",
        height: "28%",
        width: "94%",
        left: "3%",
        id: "campaignInfo"
    });
    $.__views.data.add($.__views.campaignInfo);
    $.__views.progressBar = Ti.UI.createView({
        width: "94%",
        left: "3%",
        top: "15%",
        height: "15%",
        id: "progressBar"
    });
    $.__views.campaignInfo.add($.__views.progressBar);
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
        top: "20%",
        height: "75%",
        width: "92%",
        left: "4%",
        id: "progressInfo"
    });
    $.__views.campaignInfo.add($.__views.progressInfo);
    $.__views.accomplished = Ti.UI.createLabel({
        height: "50%",
        width: "25%",
        color: "gray",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "0%",
        id: "accomplished"
    });
    $.__views.progressInfo.add($.__views.accomplished);
    $.__views.percentage = Ti.UI.createLabel({
        height: "50%",
        width: "25%",
        color: "gray",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "25%",
        id: "percentage"
    });
    $.__views.progressInfo.add($.__views.percentage);
    $.__views.days = Ti.UI.createLabel({
        height: "50%",
        width: "25%",
        color: "gray",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "50%",
        id: "days"
    });
    $.__views.progressInfo.add($.__views.days);
    $.__views.total = Ti.UI.createLabel({
        height: "50%",
        width: "25%",
        color: "gray",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "75%",
        id: "total"
    });
    $.__views.progressInfo.add($.__views.total);
    $.__views.textAccomplished = Ti.UI.createLabel({
        top: "50%",
        height: "50%",
        width: "25%",
        color: "black",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "0%",
        text: "Pledged",
        id: "textAccomplished"
    });
    $.__views.progressInfo.add($.__views.textAccomplished);
    $.__views.textPercentage = Ti.UI.createLabel({
        top: "50%",
        height: "50%",
        width: "25%",
        color: "black",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "25%",
        text: "Funded",
        id: "textPercentage"
    });
    $.__views.progressInfo.add($.__views.textPercentage);
    $.__views.textDays = Ti.UI.createLabel({
        top: "50%",
        height: "50%",
        width: "25%",
        color: "black",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "50%",
        text: "Days to Go",
        id: "textDays"
    });
    $.__views.progressInfo.add($.__views.textDays);
    $.__views.textTotal = Ti.UI.createLabel({
        top: "50%",
        height: "50%",
        width: "25%",
        color: "black",
        font: {
            fontSize: "12dp"
        },
        textAlign: "center",
        left: "75%",
        text: "Total",
        id: "textTotal"
    });
    $.__views.progressInfo.add($.__views.textTotal);
    $.__views.bottomBorder = Ti.UI.createView({
        height: "2dp",
        bottom: "0%",
        backgroundColor: "#c6c6c6",
        width: "100%",
        id: "bottomBorder"
    });
    $.__views.fixed.add($.__views.bottomBorder);
    $.__views.givebacks = Ti.UI.createView({
        left: "0%",
        width: "100%",
        backgroundColor: "#f3f3f3",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "givebacks"
    });
    $.__views.scroll.add($.__views.givebacks);
    $.__views.givebacksTitle = Ti.UI.createLabel({
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        height: "20dp",
        left: "3%",
        width: "94%",
        top: "1%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        text: "Givebacks:",
        id: "givebacksTitle"
    });
    $.__views.givebacks.add($.__views.givebacksTitle);
    $.__views.perks = Ti.UI.createView({
        top: "25dp",
        left: "3%",
        width: "94%",
        id: "perks"
    });
    $.__views.givebacks.add($.__views.perks);
    $.__views.donate = Ti.UI.createView({
        bottom: "0dp",
        height: "40dp",
        id: "donate"
    });
    $.__views.viewCampaign.add($.__views.donate);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var id = arguments[0] || {};
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.viewCampaign, "Campaigns", false, $.vp, $.scroll, null, false);
    Ti.Gesture.addEventListener("orientationchange", function() {
        var orientation = Ti.Gesture.orientation;
        if (0 != orientation && null != $.vp) {
            (3 === orientation || 4 === orientation) && ($.vp.fullscreen = true);
            (1 === orientation || 2 === orientation) && ($.vp.fullscreen = false);
        }
    });
    var client = Ti.Network.createHTTPClient();
    var url = Alloy.Globals.DOMAIN + Alloy.Globals.URL_CAMPAIGN;
    client.open("POST", url);
    client.ondatastream = function() {
        $.activity.show();
    };
    client.onload = function() {
        var fixed = Ti.Platform.displayCaps.platformHeight - 50;
        $.fixed.height = fixed;
        $.givebacks.top = fixed + 1;
        var json = this.responseText;
        var responses = JSON.parse(json);
        var url = "";
        if (null != responses.campaign[0].type) if ("vod" == responses.campaign[0].type || "live" == responses.campaign[0].type) {
            $.vp.sourceType = Titanium.Media.VIDEO_SOURCE_TYPE_STREAMING;
            $.vp.scalingMode = Titanium.Media.VIDEO_SCALING_ASPECT_FIT;
            $.vp.mediaControlStyle = Titanium.Media.VIDEO_CONTROL_DEFAULT;
            $.vp.url = responses.campaign[0].path;
        } else url = getUrlYoutube(responses.campaign[0].video_id, $.vp); else {
            var imageLink = Alloy.Globals.DOMAIN + Alloy.Globals.IMAGE_USER_DEFAULT;
            if (responses.campaign[0].image.length > 0) {
                imageLink = responses.campaign[0].image;
                "http" != imageLink.substring(0, 4) && (imageLink = Alloy.Globals.DOMAIN + imageLink);
            }
            $.cover.image = imageLink;
        }
        $.author.text = responses.campaign[0].name;
        $.title.text = responses.campaign[0].title;
        var text = responses.campaign[0].long_description;
        text.length > Alloy.Globals.DESCRIPTION_SIZE && (text = text.substring(0, Alloy.Globals.DESCRIPTION_SIZE - 2) + "...");
        $.description.text = text;
        $.categoryName.text = responses.campaign[0].category_name;
        $.accomplished.text = "$" + responses.campaign[0].received;
        $.percentage.text = responses.campaign[0].percent + "%";
        $.porcentaje.width = responses.campaign[0].percent + "%";
        $.days.text = responses.campaign[0].days;
        $.total.text = "$" + responses.campaign[0].goal_amount;
        var band = true;
        for (var i = 0; responses.givebacks.length > i; i++) {
            var moreperks = 80 * i;
            var row = Ti.UI.createView({
                height: "75dp",
                top: moreperks + "dp",
                backgroundColor: "#e5f8e9",
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#c6c6c6"
            });
            var insideLabel1 = Ti.UI.createLabel({
                text: responses.givebacks[i].amount + " USD",
                left: "5%",
                height: "25%",
                top: "10%",
                font: {
                    fontSize: "14dp",
                    fontWeight: "bold"
                },
                width: "90%"
            });
            var insideLabel2 = Ti.UI.createLabel({
                text: responses.givebacks[i].description,
                left: "5%",
                height: "65%",
                top: "35%",
                font: {
                    fontSize: "12dp",
                    fontWeight: "bold"
                },
                width: "70%",
                color: "gray"
            });
            var osname = "mobileweb";
            if ("ipad" === osname) {
                insideLabel1.font = {
                    fontSize: "26dp"
                };
                insideLabel2.font = {
                    fontSize: "24dp"
                };
            }
            row.add(insideLabel1);
            row.add(insideLabel2);
            $.perks.add(row);
            $.givebacks.height = 120 + moreperks + "dp";
            band = false;
        }
        if (band) {
            var row = Ti.UI.createView({
                height: "40dp"
            });
            var insideLabel = Ti.UI.createLabel({
                text: "There are no giveback available yet"
            });
            row.add(insideLabel);
            $.perks.add(row);
        }
        $.activity.hide();
    };
    client.onerror = function(e) {
        alert("Transmission error: " + e.error);
    };
    var params = {
        item_id: id,
        tc: Alloy.Globals.USER_MOBILE.toString()
    };
    client.send(params);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;