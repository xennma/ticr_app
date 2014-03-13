function acctionLogin(currentWin, vp) {
    if (Ti.App.Properties.getString("user_id") > 0) {
        Ti.App.Properties.setString("user_id", null);
        Ti.App.Properties.setString("username", null);
        Ti.App.Properties.setString("timezone", null);
        Ti.App.Properties.setString("name", null);
        var win = Alloy.createController("feed", 1).getView();
    } else {
        var win = Alloy.createController("login").getView();
        if (vp) {
            vp.hide();
            vp.release();
            vp = null;
        }
        currentWin.close();
    }
    win.fullscreen = false;
    var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
    win.open({
        transition: t
    });
}

exports.putActionBar = function(currentWindow, title, isFeed, vp, container, activity, reset) {
    function isIOS7Plus() {
        return false;
    }
    var buttomText = "Login";
    Ti.App.Properties.getString("user_id") > 0 && (buttomText = "Logout");
    var iOS7 = isIOS7Plus();
    var theTop = iOS7 ? 20 : 0;
    currentWindow.top = theTop;
    container.top = "9%";
    container.height = "91%";
    var args = {
        ventana: currentWindow,
        vp: vp,
        title: title,
        reset: reset
    };
    var win = Alloy.createController("actionbarIos", args).getView();
    currentWindow.add(win);
};

exports.iosActionLogin = function(currentWin, vp) {
    acctionLogin(currentWin, vp);
};