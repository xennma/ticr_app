function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "viewMore";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        backgroundColor: "#f2f2f2",
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.buttonMore = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {
            height: "40dp",
            left: "33%",
            width: "34%"
        });
        Alloy.isTablet && _.extend(o, {
            height: "70dp"
        });
        _.extend(o, {
            id: "buttonMore"
        });
        return o;
    }());
    $.__views.container.add($.__views.buttonMore);
    $.__views.text = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "12dp",
                fontWeight: "bold"
            },
            top: "5%",
            height: "90%",
            width: "90%",
            borderRadius: 5,
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
            id: "text"
        });
        return o;
    }());
    $.__views.buttonMore.add($.__views.text);
    $.__views.message = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            font: {
                fontSize: "14dp"
            },
            color: "#000000"
        });
        Alloy.isTablet && _.extend(o, {
            font: {
                fontSize: "26dp"
            }
        });
        _.extend(o, {
            id: "message"
        });
        return o;
    }());
    $.__views.container.add($.__views.message);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var height = 360;
    $.container.height = "45dp";
    $.container.top = height * args.row + "dp";
    if (1 == args.item) {
        $.text.text = args.text;
        $.message.hide();
    } else {
        $.message.text = args.text;
        $.buttonMore.hide();
        $.text.hide();
        $.text.backgroundColor = "#f2f2f2";
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;