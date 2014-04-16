function Controller() {
    function closeView() {
        if (args.vp) {
            args.vp.hide();
            args.vp.release();
            args.vp = null;
        }
        if (args.reset) {
            var win = Alloy.createController("feed", 1).getView();
            var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
            win.open({
                transition: t
            });
        }
        args.ventana.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "actionbarIos";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.Navigation = Ti.UI.createView({
        height: "8%",
        top: "0%",
        backgroundColor: "#f2f2f2",
        backgroundImage: "/light-diagonal-strips.png",
        backgroundRepeat: true,
        id: "Navigation"
    });
    $.__views.Navigation && $.addTopLevelView($.__views.Navigation);
    $.__views.actionIos = Ti.UI.createView({
        zIndex: 10,
        height: "100%",
        id: "actionIos"
    });
    $.__views.Navigation.add($.__views.actionIos);
    closeView ? $.__views.actionIos.addEventListener("click", closeView) : __defers["$.__views.actionIos!click!closeView"] = true;
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
    $.__views.__alloyId69 = Ti.UI.createView({
        height: "2%",
        backgroundColor: "#c6c6c6",
        width: "100%",
        bottom: "0%",
        id: "__alloyId69"
    });
    $.__views.Navigation.add($.__views.__alloyId69);
    $.__views.bottomLogin = Ti.UI.createView({
        top: "14%",
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
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var backArrow = Ti.UI.createLabel({
        color: "Gray",
        text: "◃"
    });
    $.current.text = args.title;
    $.backArrow.add(backArrow);
    "Login" == args.title && $.bottomLogin.hide();
    $.textBottom.text = "Login";
    Ti.App.Properties.getString("user_id") > 0 && ($.textBottom.text = "Logout");
    $.bottomLogin.addEventListener("click", function() {
        var actionBar = require("actionBarButtoms");
        actionBar.iosActionLogin(args.ventana, args.vp);
    });
    if ("Camera" == args.title) {
        $.iconSmall.width = "5%";
        $.bottomLogin.width = "15%";
        $.current.left = "12%";
    }
    __defers["$.__views.actionIos!click!closeView"] && $.__views.actionIos.addEventListener("click", closeView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;