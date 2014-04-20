function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowEmpty";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowEmpty = Ti.UI.createTableViewRow({
        id: "rowEmpty"
    });
    $.__views.rowEmpty && $.addTopLevelView($.__views.rowEmpty);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: "14dp"
        },
        text: "No items found",
        id: "title"
    });
    $.__views.rowEmpty.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;