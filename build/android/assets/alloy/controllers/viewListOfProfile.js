function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewListOfProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewListOfProfile = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewListOfProfile"
    });
    $.__views.viewListOfProfile && $.addTopLevelView($.__views.viewListOfProfile);
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
        id: "activity",
        visible: "false"
    });
    $.__views.viewListOfProfile.add($.__views.activity);
    $.__views.messageTurn = Ti.UI.createView({
        top: "0dp",
        left: "0dp",
        height: "10%",
        borderColor: "#c3c3c3",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        borderWidth: 0,
        id: "messageTurn"
    });
    $.__views.viewListOfProfile.add($.__views.messageTurn);
    $.__views.description = Ti.UI.createLabel({
        font: {
            fontSize: "12dp"
        },
        height: "90%",
        left: "3%",
        top: "9%",
        width: "94%",
        color: "gray",
        text: "Live Shows will be available for broadcasting only 20 minutes before the scheduled start time!",
        id: "description"
    });
    $.__views.messageTurn.add($.__views.description);
    $.__views.container = Ti.UI.createView({
        top: "0dp",
        id: "container"
    });
    $.__views.viewListOfProfile.add($.__views.container);
    $.__views.table = Ti.UI.createTableView({
        top: "0dp",
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var data = require("dataExport");
    var timezoneBand = 0;
    var utm = "00:00,0";
    var actionBar = require("actionBarButtoms");
    actionBar.putActionBar($.viewListOfProfile, args.authorname + " - " + args.view, false, null, $.container, null, false);
    $.messageTurn.hide();
    $.messageTurn.visible = false;
    if ("Events" == args.view && Ti.App.Properties.getString("user_id") && args.author == Ti.App.Properties.getString("user_id")) {
        $.container.top = "11%";
        $.messageTurn.show();
        $.messageTurn.visible = true;
        timezoneBand = 1;
        utm = Ti.App.Properties.getString("timezone");
    }
    data.getListOfProfile($.activity, $.table, 0, 0, args.author, args.view, timezoneBand, utm);
    $.table.addEventListener("click", function(e) {
        if (e.source.link > 0) {
            var view = "viewCampaign";
            "Events" == args.view && (view = "viewEvent");
            "Videos" == args.view && (view = "viewVideo");
            var win = Alloy.createController(view, e.source.link).getView();
            win.fullscreen = false;
            win.open({
                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                activityExitAnimation: Ti.Android.R.anim.fade_out
            });
        }
    });
    $.table.footerView = Ti.UI.createView({
        height: 1,
        backgroundColor: "transparent"
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;