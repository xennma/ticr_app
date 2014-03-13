function Controller() {
    function isIOS7Plus() {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0], 10);
        if (major >= 7) {
            $.feedWin.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
            return true;
        }
        return false;
    }
    function resetInitPage(catId, title) {
        categoryId = catId;
        $.current.text = title;
        live.setData([]);
        campaigns.removeAllChildren();
        upcomming.setData([]);
        artists.removeAllChildren();
        data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
        $.scrollableView.scrollToView(1);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "feed";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.feedWin = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        height: "100%",
        top: "0%",
        width: "100%",
        id: "feedWin"
    });
    $.__views.feedWin && $.addTopLevelView($.__views.feedWin);
    $.__views.Navigation = Ti.UI.createView({
        height: "8%",
        top: "0%",
        backgroundColor: "#f2f2f2",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.feedWin.add($.__views.Navigation);
    $.__views.actionIos = Ti.UI.createView({
        zIndex: 10,
        height: "100%",
        id: "actionIos"
    });
    $.__views.Navigation.add($.__views.actionIos);
    $.__views.backArrow = Ti.UI.createLabel({
        left: "0%",
        width: "5%",
        font: {
            fontSize: "20dp"
        },
        color: "gray",
        id: "backArrow"
    });
    $.__views.actionIos.add($.__views.backArrow);
    $.__views.iconSmall = Ti.UI.createView({
        left: "5%",
        width: "12%",
        height: "90%",
        top: "5%",
        id: "iconSmall"
    });
    $.__views.actionIos.add($.__views.iconSmall);
    $.__views.image = Ti.UI.createImageView({
        id: "image",
        image: "/Icon-Small.png"
    });
    $.__views.iconSmall.add($.__views.image);
    $.__views.current = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            left: "19%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "30dp"
            }
        });
        _.extend(o, {
            id: "current"
        });
        return o;
    }());
    $.__views.Navigation.add($.__views.current);
    $.__views.__alloyId70 = Ti.UI.createView({
        height: "2%",
        backgroundColor: "#c6c6c6",
        width: "100%",
        bottom: "0%",
        id: "__alloyId70"
    });
    $.__views.Navigation.add($.__views.__alloyId70);
    $.__views.bottomLogin = Ti.UI.createView({
        top: "10%",
        right: "5dp",
        width: "20%",
        height: "80%",
        zIndex: 100,
        id: "bottomLogin"
    });
    $.__views.Navigation.add($.__views.bottomLogin);
    $.__views.textBottom = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
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
            textAlign: "center"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "Login",
            id: "textBottom"
        });
        return o;
    }());
    $.__views.bottomLogin.add($.__views.textBottom);
    $.__views.topNav = Ti.UI.createScrollView({
        height: "11%",
        top: "8%",
        width: "100%",
        left: "0%",
        id: "topNav",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false",
        scrollType: "horizontal"
    });
    $.__views.feedWin.add($.__views.topNav);
    $.__views.NavContainer = Ti.UI.createView({
        width: 500,
        height: "86%",
        top: "0%",
        id: "NavContainer"
    });
    $.__views.topNav.add($.__views.NavContainer);
    $.__views.categories = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "0%",
        id: "categories"
    });
    $.__views.NavContainer.add($.__views.categories);
    $.__views.__alloyId71 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "center",
            color: "#3b3b3b",
            font: {
                fontSize: 14,
                fontFamily: "Helvetica Neue"
            },
            bottom: "20%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            text: "Categories",
            id: "__alloyId71"
        });
        return o;
    }());
    $.__views.categories.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId72"
    });
    $.__views.categories.add($.__views.__alloyId72);
    $.__views.videos = Ti.UI.createView({
        height: "100%",
        bottom: "0%",
        width: "20%",
        left: "20%",
        id: "videos"
    });
    $.__views.NavContainer.add($.__views.videos);
    $.__views.__alloyId73 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "center",
            color: "#3b3b3b",
            font: {
                fontSize: 14,
                fontFamily: "Helvetica Neue"
            },
            bottom: "20%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            text: "Live Shows",
            id: "__alloyId73"
        });
        return o;
    }());
    $.__views.videos.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId74"
    });
    $.__views.videos.add($.__views.__alloyId74);
    $.__views.campaigns = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "40%",
        id: "campaigns"
    });
    $.__views.NavContainer.add($.__views.campaigns);
    $.__views.__alloyId75 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "center",
            color: "#3b3b3b",
            font: {
                fontSize: 14,
                fontFamily: "Helvetica Neue"
            },
            bottom: "20%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            text: "Campaigns",
            id: "__alloyId75"
        });
        return o;
    }());
    $.__views.campaigns.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId76"
    });
    $.__views.campaigns.add($.__views.__alloyId76);
    $.__views.upcoming = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "60%",
        id: "upcoming"
    });
    $.__views.NavContainer.add($.__views.upcoming);
    $.__views.__alloyId77 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "center",
            color: "#3b3b3b",
            font: {
                fontSize: 14,
                fontFamily: "Helvetica Neue"
            },
            bottom: "20%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            text: "Upcoming",
            id: "__alloyId77"
        });
        return o;
    }());
    $.__views.upcoming.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        width: 1,
        backgroundColor: "#dfdfdf",
        right: 0,
        top: "12%",
        height: "76%",
        id: "__alloyId78"
    });
    $.__views.upcoming.add($.__views.__alloyId78);
    $.__views.artists = Ti.UI.createView({
        height: "100%",
        width: "20%",
        bottom: "0%",
        left: "80%",
        id: "artists"
    });
    $.__views.NavContainer.add($.__views.artists);
    $.__views.__alloyId79 = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            textAlign: "center",
            color: "#3b3b3b",
            font: {
                fontSize: 14,
                fontFamily: "Helvetica Neue"
            },
            bottom: "20%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            text: "Artists",
            id: "__alloyId79"
        });
        return o;
    }());
    $.__views.artists.add($.__views.__alloyId79);
    $.__views.menuBar = Ti.UI.createScrollView({
        height: "12%",
        bottom: "2%",
        id: "menuBar",
        showVerticalScrollIndicator: "false",
        showHorizontalScrollIndicator: "false",
        scrollType: "horizontal"
    });
    $.__views.topNav.add($.__views.menuBar);
    $.__views.barContainer = Ti.UI.createView({
        width: "100%",
        height: "100%",
        bottom: "0%",
        left: "0%",
        id: "barContainer"
    });
    $.__views.menuBar.add($.__views.barContainer);
    $.__views.barra = Ti.UI.createView({
        height: "100%",
        width: "20%",
        backgroundColor: "#e4473e",
        bottom: "0%",
        left: "0%",
        id: "barra"
    });
    $.__views.barContainer.add($.__views.barra);
    $.__views.__alloyId80 = Ti.UI.createView({
        height: "2%",
        backgroundColor: "#e4473e",
        width: "100%",
        bottom: "0%",
        id: "__alloyId80"
    });
    $.__views.topNav.add($.__views.__alloyId80);
    var __alloyId81 = [];
    $.__views.categoriesScreen = Ti.UI.createView({
        id: "categoriesScreen"
    });
    __alloyId81.push($.__views.categoriesScreen);
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
    $.__views.categoriesScreen.add($.__views.activity);
    $.__views.videosScreen = Ti.UI.createView({
        id: "videosScreen"
    });
    __alloyId81.push($.__views.videosScreen);
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
    $.__views.videosScreen.add($.__views.activity);
    $.__views.campaignsScreen = Ti.UI.createView({
        backgroundColor: "#f2f2f2",
        id: "campaignsScreen"
    });
    __alloyId81.push($.__views.campaignsScreen);
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
    $.__views.campaignsScreen.add($.__views.activity);
    $.__views.upcomingScreen = Ti.UI.createView({
        id: "upcomingScreen"
    });
    __alloyId81.push($.__views.upcomingScreen);
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
    $.__views.upcomingScreen.add($.__views.activity);
    $.__views.artistsScreen = Ti.UI.createView({
        id: "artistsScreen"
    });
    __alloyId81.push($.__views.artistsScreen);
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
    $.__views.artistsScreen.add($.__views.activity);
    $.__views.scrollableView = Ti.UI.createScrollableView({
        height: "81%",
        top: "19%",
        views: __alloyId81,
        id: "scrollableView"
    });
    $.__views.feedWin.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var activeTab = arguments[0] || {};
    var categoryId = 0;
    var data = require("dataExport");
    var categories = Ti.UI.createTableView();
    var live = Ti.UI.createTableView();
    var campaigns = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        left: 0
    });
    var upcomming = Ti.UI.createTableView();
    var artists = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        contentWidth: "auto",
        contentHeight: "auto",
        top: 0,
        left: 0,
        backgroundColor: "#f2f2f2"
    });
    var backArrow = Ti.UI.createLabel({
        color: "Gray",
        text: "◃"
    });
    var iOS7 = isIOS7Plus();
    var theTop = iOS7 ? 20 : 0;
    $.feedWin.top = theTop;
    $.current.text = "LiveOnStage";
    $.backArrow.add(backArrow);
    $.actionIos.addEventListener("click", function() {
        $.feedWin.close();
    });
    1 == activeTab && data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
    if (2 == activeTab) {
        campaigns.removeAllChildren();
        data.getCampaigns($.activity, campaigns, 0, 0, categoryId);
    }
    3 == activeTab && data.getListItems($.activity, upcomming, 0, 0, categoryId, 0, 0, "Events");
    if (4 == activeTab) {
        artists.removeAllChildren();
        data.getArtists($.activity, artists, 0, 0, categoryId);
    }
    $.videosScreen.add(live);
    $.categoriesScreen.add(categories);
    $.campaignsScreen.add(campaigns);
    $.upcomingScreen.add(upcomming);
    $.artistsScreen.add(artists);
    $.feedWin.open();
    $.scrollableView.currentPage = activeTab;
    var osname = Ti.Platform.osname, height = Ti.Platform.displayCaps.platformHeight, width = Ti.Platform.displayCaps.platformWidth;
    scrollunit = width / 5;
    var isTablet = "ipad" === osname || "android" === osname && (width > 899 || height > 899);
    if (isTablet) {
        $.NavContainer.width = width;
        $.barContainer.width = "100%";
        $.topNav.setScrollingEnabled = false;
    } else $.topNav.scrollTo(60, 0);
    var cualquiera = $.NavContainer.width - width;
    scrollunit += cualquiera / 5;
    $.menuBar.scrollTo(-scrollunit * activeTab, 0);
    var topScroll = 0;
    if (!isTablet) {
        1 == activeTab && (topScroll = 60);
        2 == activeTab && (topScroll = 160);
        (3 == activeTab || 4 == activeTab) && (topScroll = 180);
        $.topNav.scrollTo(topScroll, 0);
    }
    $.categories.addEventListener("click", function() {
        $.scrollableView.scrollToView(0);
    });
    $.videos.addEventListener("click", function() {
        $.scrollableView.scrollToView(1);
    });
    $.campaigns.addEventListener("click", function() {
        $.scrollableView.scrollToView(2);
    });
    $.upcoming.addEventListener("click", function() {
        $.scrollableView.scrollToView(3);
    });
    $.artists.addEventListener("click", function() {
        $.scrollableView.scrollToView(4);
    });
    $.scrollableView.addEventListener("scroll", function() {
        var topScroll = 0;
        if (!isTablet) {
            1 == $.scrollableView.currentPage && (topScroll = 60);
            2 == $.scrollableView.currentPage && (topScroll = 160);
            3 == $.scrollableView.currentPage && (topScroll = 180);
            4 != $.scrollableView.currentPage && $.topNav.scrollTo(topScroll, 0);
        }
        $.menuBar.scrollTo(-scrollunit * $.scrollableView.currentPage, 0);
    });
    $.scrollableView.addEventListener("scrollend", function() {
        0 == $.scrollableView.currentPage && 0 == categories.data.length && data.getCategories($.activity, categories);
        1 == $.scrollableView.currentPage && 0 == live.data.length && data.getListItems($.activity, live, 0, 0, categoryId, 0, 0, "Videos");
        2 == $.scrollableView.currentPage && 0 == campaigns.children.length && data.getCampaigns($.activity, campaigns, 0, 0, categoryId);
        3 == $.scrollableView.currentPage && 0 == upcomming.data.length && data.getListItems($.activity, upcomming, 0, 0, categoryId, 0, 0, "Events");
        4 == $.scrollableView.currentPage && 0 == artists.children.length && data.getArtists($.activity, artists, 0, 0, categoryId);
    });
    categories.addEventListener("click", function(e) {
        var title = "Live On Stage";
        e.source.link > 0 && (title = e.source.text);
        resetInitPage(e.source.link, title);
    });
    live.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewVideo", e.source.link).getView();
            win.open();
        }
    });
    upcomming.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var win = Alloy.createController("viewEvent", e.source.link).getView();
            win.open();
        }
    });
    upcomming.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    live.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    $.textBottom.text = "Login";
    Ti.App.Properties.getString("user_id") > 0 && ($.textBottom.text = "Logout");
    $.bottomLogin.addEventListener("click", function() {
        var actionBar = require("actionBarButtoms");
        actionBar.iosActionLogin($.feedWin, null);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;