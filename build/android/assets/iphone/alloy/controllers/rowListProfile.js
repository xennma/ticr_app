function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowListProfile";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowListProfile = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {
            height: "50dp",
            touchEnabled: true,
            hasChild: false
        });
        Alloy.isTablet && _.extend(o, {
            height: "70dp"
        });
        _.extend(o, {
            id: "rowListProfile"
        });
        return o;
    }());
    $.__views.rowListProfile && $.addTopLevelView($.__views.rowListProfile);
    $.__views.title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            left: "10dp",
            height: "50dp",
            color: "black",
            font: {
                fontSize: "14dp"
            },
            width: "80%"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "24dp"
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            id: "title"
        });
        return o;
    }());
    $.__views.rowListProfile.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var text = args.name || "";
    text.length > Alloy.Globals.TITLE_SIZE && (text = text.substring(0, Alloy.Globals.TITLE_SIZE - 2) + "...");
    $.title.text = text;
    $.title.link = args.link;
    $.rowListProfile.backgroundColor = args.isOdd ? "#f2f2f2" : "#ffffff";
    $.rowListProfile.link = args.link;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;