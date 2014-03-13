function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "rowMore";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.rowMore = Ti.UI.createTableViewRow({
        id: "rowMore",
        name: "rowMore"
    });
    $.__views.rowMore && $.addTopLevelView($.__views.rowMore);
    $.__views.buttonMore = Ti.UI.createView({
        height: "40dp",
        left: "33%",
        width: "34%",
        id: "buttonMore"
    });
    $.__views.rowMore.add($.__views.buttonMore);
    $.__views.title = Ti.UI.createLabel({
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
        textAlign: "center",
        text: "Load More",
        id: "title"
    });
    $.__views.buttonMore.add($.__views.title);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;