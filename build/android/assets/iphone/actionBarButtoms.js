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
    }
    currentWin.close();
    win.fullscreen = false;
    if ("android" == Ti.Platform.osname) win.open({
        activityEnterAnimation: Ti.Android.R.anim.fade_in,
        activityExitAnimation: Ti.Android.R.anim.fade_out
    }); else {
        var t = Ti.UI.iPhone.AnimationStyle.CURL_UP;
        win.open({
            transition: t
        });
    }
}

exports.putActionBar = function(currentWindow, title, isFeed, vp, container, activity, reset) {
    function isIOS7Plus() {
        var version = Titanium.Platform.version.split(".");
        var major = parseInt(version[0], 10);
        if (major >= 7) {
            currentWindow.statusBarStyle = Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT;
            return true;
        }
        return false;
    }
    var buttomText = "Login";
    Ti.App.Properties.getString("user_id") > 0 && (buttomText = "Logout");
    if ("android" == Ti.Platform.osname) {
        var actionBar;
        currentWindow.addEventListener("open", function() {
            if (currentWindow.activity) {
                actionBar = currentWindow.activity.actionBar;
                if (actionBar) {
                    actionBar.backgroundImage = "/bg.png";
                    actionBar.title = title;
                    actionBar.displayHomeAsUp = true;
                    actionBar.onHomeIconItemSelected = function() {
                        if (vp) {
                            vp.hide();
                            vp.release();
                            vp = null;
                        }
                        currentWindow.close();
                        if (reset) {
                            var win = Alloy.createController("feed", 1).getView();
                            win.fullscreen = false;
                            win.open({
                                activityEnterAnimation: Ti.Android.R.anim.fade_in,
                                activityExitAnimation: Ti.Android.R.anim.fade_out
                            });
                        }
                    };
                    "Login" != title && (currentWindow.activity.onCreateOptionsMenu = function(e) {
                        var menu = e.menu;
                        var menuItem = menu.add({
                            title: buttomText,
                            showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
                        });
                        menuItem.addEventListener("click", function() {
                            acctionLogin(currentWindow, vp);
                        });
                    });
                }
            } else Ti.API.error("Can't access action bar on a lightweight window.");
        });
    } else {
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
    }
};

exports.iosActionLogin = function(currentWin, vp) {
    acctionLogin(currentWin, vp);
};