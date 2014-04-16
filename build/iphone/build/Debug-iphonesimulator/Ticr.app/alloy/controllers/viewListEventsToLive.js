function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewListEventsToLive";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.viewListEventsToLive = Ti.UI.createWindow({
        backgroundColor: "#fff",
        title: Alloy.Globals.NAME_PAGE,
        id: "viewListEventsToLive"
    });
    $.__views.viewListEventsToLive && $.addTopLevelView($.__views.viewListEventsToLive);
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
    $.__views.viewListEventsToLive.add($.__views.activity);
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
    $.__views.viewListEventsToLive.add($.__views.messageTurn);
    $.__views.description = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp"
            },
            height: "90%",
            left: "3%",
            top: "9%",
            width: "94%",
            color: "gray"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {
            text: "Live Shows will be available for broadcasting only 20 minutes before the scheduled start time!",
            id: "description"
        });
        return o;
    }());
    $.__views.messageTurn.add($.__views.description);
    $.__views.container = Ti.UI.createView({
        top: "0dp",
        id: "container"
    });
    $.__views.viewListEventsToLive.add($.__views.container);
    $.__views.table = Ti.UI.createTableView({
        top: "0dp",
        id: "table"
    });
    $.__views.container.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;