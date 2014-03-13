function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowCategories";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowCategories = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {
            height: "55dp",
            touchEnabled: true,
            hasChild: false
        });
        Alloy.isTablet && _.extend(o, {
            height: "70dp"
        });
        _.extend(o, {
            id: "rowCategories"
        });
        return o;
    }());
    $.__views.rowCategories && $.addTopLevelView($.__views.rowCategories);
    $.__views.title = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            left: "60dp",
            height: "55dp",
            width: "230dp",
            color: "black",
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
            left: "100dp"
        });
        _.extend(o, {
            id: "title"
        });
        return o;
    }());
    $.__views.rowCategories.add($.__views.title);
    $.__views.imageCat = Ti.UI.createImageView(function() {
        var o = {};
        _.extend(o, {
            left: "5%",
            height: "35dp",
            width: "35dp",
            top: "18%"
        });
        Alloy.isTablet && _.extend(o, {
            height: "50dp",
            width: "50dp"
        });
        _.extend(o, {
            id: "imageCat"
        });
        return o;
    }());
    $.__views.rowCategories.add($.__views.imageCat);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.title.text = args.name || "";
    $.title.link = args.link;
    $.rowCategories.backgroundColor = args.isOdd ? "#f2f2f2" : "#ffffff";
    var name = args.name || "";
    name = name.toLowerCase();
    $.imageCat.image = "/images/categories/" + name + ".jpg";
    $.imageCat.link = args.link;
    $.imageCat.text = args.name || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;